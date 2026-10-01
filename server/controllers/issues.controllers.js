import pool from "../config/db.js";
import { isNonEmptyString, isValidId } from "../utils/validation.js";

export const getIssues = async (req, res, next) => {
	try {
		let query = `
            SELECT 
                issues.id,
                issues.title,
                issues.description,
                issues.location,
                issues.reported_at,

                issues.category_id,
                issues.priority_level_id,
                issues.status_id,
                issues.assigned_to,

                categories.category_name AS category,
                priority_levels.priority_name AS priority,
                statuses.status_name AS status,
                users.name AS reported_by,
                assigned_user.name AS assigned_to_name

            FROM issues

            JOIN categories
                ON issues.category_id = categories.id

            JOIN statuses
                ON issues.status_id = statuses.id

            JOIN priority_levels
                ON issues.priority_level_id = priority_levels.id

            JOIN users
                ON issues.reported_by = users.id

            LEFT JOIN users AS assigned_user
                ON issues.assigned_to = assigned_user.id
        `;

		const params = [];

		if (req.user.role_id === 3) {
			query += `
                WHERE issues.reported_by = $1
            `;
			params.push(req.user.id);
		}

		query += `
            ORDER BY issues.reported_at DESC
        `;

		const result = await pool.query(query, params);

		res.json(result.rows);
	} catch (error) {
		next(error);
	}
};

export const getUserIssues = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const result = await pool.query(`
			SELECT 
				issues.id,
				issues.title,
				issues.description,
				issues.location,
				issues.reported_at,

				issues.category_id,
				issues.priority_level_id,
				issues.status_id,

				categories.category_name AS category,
				priority_levels.priority_name AS priority,
				statuses.status_name AS status,
				users.name AS reported_by
			FROM issues
			JOIN categories
				ON issues.category_id = categories.id
			JOIN statuses
				ON issues.status_id = statuses.id
			JOIN priority_levels
				ON issues.priority_level_id = priority_levels.id
			JOIN users
				ON issues.reported_by = users.id
			WHERE users.id = $1	
			ORDER by reported_at DESC

			`, [userId]);

		res.json(result.rows);

	} catch (error) {
		//     console.error(error);
		//     res.status(500).json({
		//         error: "Failed to retrieve issues",
		//     });
		// }
		next(error);
	}
};

export const getIssueById = async (req, res, next) => {
	const { id } = req.params;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid issue ID",
		});
	}
    
    // console.log(req.params.id);

    try {
        const id = req.params.id;
        const result = await pool.query(
			`
			SELECT 
				i.id,
				i.title,
				i.description,
				i.location,
				i.reported_at,
				i.updated_at,
				i.reported_by,
    			i.assigned_to,

				reporter.name AS reported_by_name,
				reporter.profile_color AS reporter_profile_color,
				updater.name AS updated_by,

				c.category_name AS category,
				p.priority_name AS priority,
				s.status_name AS status

			FROM issues i

			LEFT JOIN users reporter
				ON i.reported_by = reporter.id

			LEFT JOIN users updater
				ON i.updated_by = updater.id

			LEFT JOIN categories c
				ON i.category_id = c.id

			LEFT JOIN priority_levels p
				ON i.priority_level_id = p.id

			LEFT JOIN statuses s
				ON i.status_id = s.id

			WHERE i.id = $1;

        `,
			[id],
		);

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Issue not found",
            });
        }

		const issue = result.rows[0];

		if (req.user.role_id === 3 && issue.reported_by !== req.user.id) {
			return res.status(403).json({
				error: "You do not have permission to view this issue",
			});
		}

        res.json({
			message: "Issue fetched successfully!",
			issue,
		});
		
    } catch (error) {
        next(error);
    }

};


export const createIssue =  async (req, res, next) => {
	// console.log(req.body);
    const userId = req.user.id;

    const reported_by = req.user.id;

	const {
		title,
		description,
		category_id,
		location,
		priority_level_id,
	} = req.body;

	if (
		!isNonEmptyString(title) ||
		!isNonEmptyString(description) ||
		!isNonEmptyString(location)
	) {
		return res.status(400).json({
			error: "Title, description, and location are required",
		});
	}

	if (
		!isValidId(category_id) ||
		!isValidId(priority_level_id)
	) {
		return res.status(400).json({
			error: "Invalid category, priority, or status ID",
		});
	}

	let client;
	let transactionStarted = false;

	try {
		const cleanTitle = title.trim();
		const cleanDescription = description.trim();
		const cleanLocation = location.trim();
		const categoryResult = await pool.query(`
				SELECT id
				FROM categories
				WHERE id = $1
					AND is_active = true
			`,
			[category_id],
		);

		const priorityResult = await pool.query(`
				SELECT id
				FROM priority_levels
				WHERE id = $1
					AND is_active = true
			`,
			[priority_level_id],
		);

		// const statusResult = await pool.query(
		// 	`SELECT id FROM statuses WHERE id = $1`,
		// 	[status_id],
		// );

		const userResult = await pool.query(
			`SELECT id FROM users WHERE id = $1 AND is_active = true
		`,
			[userId],
		);

		if (categoryResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid category",
			});
		}
		if (priorityResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid priority",
			});
		}
		// if (statusResult.rowCount === 0) {
		// 	return res.status(400).json({
		// 		error: "Invalid status",
		// 	});
		// }
		if (userResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid user",
			});
		}

		client = await pool.connect();

		await client.query("BEGIN");
		transactionStarted = true;

		// Prevent simultaneous requests from selecting
		// the same coordinator in the rotation.
		await client.query(`
			SELECT pg_advisory_xact_lock(1, 100)
		`);

		// Get all active coordinators in rotation order.
		const coordinatorsResult = await client.query(`
			SELECT id
			FROM users
			WHERE role_id = 2
			AND is_active = true
			ORDER BY id ASC
		`);

		const coordinators = coordinatorsResult.rows;

		let assignedTo = null;

		if (coordinators.length > 0) {
			// Find the coordinator assigned to the most
			// recently created issue.
			const lastAssignmentResult = await client.query(`
				SELECT assigned_to
				FROM issues
				WHERE assigned_to IS NOT NULL
				ORDER BY id DESC
				LIMIT 1
			`);

			const lastAssignedId = lastAssignmentResult.rows[0]?.assigned_to;

			if (lastAssignedId == null) {
				// First assignment: start at the beginning.
				assignedTo = coordinators[0].id;
			} else {
				// Find the next active coordinator whose ID
				// is greater than the previous assignment.
				const nextCoordinator = coordinators.find(
					(coordinator) => coordinator.id > lastAssignedId,
				);

				// If there isn't one, wrap around.
				assignedTo = nextCoordinator
					? nextCoordinator.id
					: coordinators[0].id;
			}
		}

		const result = await client.query(
			`
				INSERT INTO issues (
					title,
					description,
					category_id,
					reported_by,
					updated_by,
					location,
					priority_level_id,
					assigned_to
				)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
				RETURNING *;
			`,
			[
				cleanTitle,
				cleanDescription,
				category_id,
				userId,
				userId,
				cleanLocation,
				priority_level_id,
				assignedTo,
			],
		);

		const newIssue = result.rows[0];

		await client.query(
			`
				INSERT INTO notifications (
					user_id,
					issue_id,
					type,
					message
				)
				SELECT
					id,
					$1,
					CASE
						WHEN id = $2 THEN 'issue_assigned'
						ELSE 'new_issue'
					END,
					CASE
						WHEN id = $2
							THEN $3
						ELSE $4
					END
				FROM users
				WHERE role_id = 2
				AND is_active = true
			`,
			[
				newIssue.id,
				assignedTo,
				`A new issue has been assigned to you: ${cleanTitle}`,
				`A new issue has been reported: ${cleanTitle}`,
			],
		);


		await client.query(
			`
				INSERT INTO notifications (
					user_id,
					issue_id,
					type,
					message
				)
				SELECT
					id,
					$1,
					'new_issue',
					$2
				FROM users
				WHERE role_id = 1
				AND is_active = true
			`,
			[newIssue.id, `A new issue has been reported: ${cleanTitle}`],
		);

		await client.query("COMMIT");
		transactionStarted = false;

		res.status(201).json({
			message: "Issue created successfully!",
			issue: result.rows[0],
		});
	} catch (error) {
		if (client && transactionStarted) {
			try {
				await client.query("ROLLBACK");
			} catch (rollbackError) {
				console.error("Rollback failed:", rollbackError);
			}
		}

		next(error);
	} finally {
		if (client) {
			client.release();
		}
	}
}

export const updateIssue = async (req, res, next) => {
    const { id } = req.params;
	const { status_name } = req.body;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid issue ID",
		});
	}

	if (!status_name || typeof status_name !== "string") {
		return res.status(400).json({
			error: "Invalid status name",
		});
	}



	try {

		const issueResult = await pool.query(`
			SELECT
				id,
				title,
				reported_by,
				status_id
			FROM issues
			WHERE id = $1
			`, [id],
		);


		if (issueResult.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

		const issue = issueResult.rows[0];
		if (
			(req.user.role_id !== 1 &&
			req.user.role_id !== 2)
		) {
			return res.status(403).json({
				error: "You do not have permission to update this issue",
			});
		}

		const statusResult = await pool.query(
			`
            SELECT id
            FROM statuses
            WHERE status_name = $1
            `,
			[status_name],
		);
		

		if (statusResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid status",
			});
		}
		const status_id = statusResult.rows[0].id;
		const statusChanged = issue.status_id !== status_id;

		const result = await pool.query(`
            UPDATE issues
            SET status_id = $1,
                updated_at = CURRENT_TIMESTAMP,
				updated_by = $2,
				resolved_at = CASE
					WHEN $4 = 'Resolved' THEN CURRENT_TIMESTAMP
					ELSE NULL
				END
            WHERE id = $3
            RETURNING *;
        `,
			[status_id, req.user.id, id, status_name],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

		if (statusChanged) {
			const notificationType =
				status_name === "Resolved"
					? "issue_resolved"
					: "issue_status_updated";

			const notificationMessage =
				status_name === "Resolved"
					? `Your report "${issue.title}" has been marked as Resolved.`
					: `Your report "${issue.title}" is now ${status_name}.`;

			await pool.query(`
				INSERT INTO notifications (
					user_id,
					issue_id,
					type,
					message
				)
				VALUES ($1, $2, $3, $4)
				`,
				[issue.reported_by, id, notificationType, notificationMessage],
			);
		}

		res.status(200).json({
			message: "Issue updated successfully",
			issue: result.rows[0],
		});
	} catch (error) {
		next(error);
	} 
};


export const updateIssuePriority = async (req, res, next) => {
	const { id } = req.params;
	const { priority_name } = req.body;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid issue ID",
		});
	}

	if (!priority_name || typeof priority_name !== "string") {
		return res.status(400).json({
			error: "Invalid priority name",
		});
	}

	try {
		const issueResult = await pool.query(
			`
            SELECT id
            FROM issues
            WHERE id = $1
            `,
			[id],
		);

		if (issueResult.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

		const issue = issueResult.rows[0];
		if (req.user.role_id !== 1 && req.user.role_id !== 2) {
			return res.status(403).json({
				error: "You do not have permission to update this issue",
			});
		}

		const priorityResult = await pool.query(
			`
            SELECT id
            FROM priority_levels
            WHERE priority_name = $1
            `,
			[priority_name],
		);

		if (priorityResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid priority",
			});
		}
		const priority_level_id = priorityResult.rows[0].id;

		const result = await pool.query(
			`
            UPDATE issues
            SET priority_level_id = $1,
                updated_at = CURRENT_TIMESTAMP,
                updated_by = $2
            WHERE id = $3
            RETURNING *;
        `,
			[priority_level_id, req.user.id, id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

		res.status(200).json({
			message: "Issue priority updated successfully",
			issue: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};


export const deleteIssue = async (req, res, next) => {
	const { id } = req.params;
	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid issue ID",
		});
	}

	try {
		const issueResult = await pool.query(
			`
			SELECT
				issues.id,
				issues.reported_by,
				statuses.status_name AS status
			FROM issues
			JOIN statuses
				ON issues.status_id = statuses.id
			WHERE issues.id = $1;
			`,
			[id],
		);

		if (issueResult.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

		const issue = issueResult.rows[0];

		if (req.user.role_id === 1) {
			// Admin can delete any issue.
		} else if (req.user.role_id === 3) {
			if (issue.reported_by !== req.user.id) {
				return res.status(403).json({
					error: "You can only delete your own reports",
				});
			}

			if (issue.status !== "Pending") {
				return res.status(403).json({
					error: "Only pending issues can be deleted",
				});
			}
		} else {
			return res.status(403).json({
				error: "You do not have permission to delete this issue",
			});
		}

		const result = await pool.query(
			`
			DELETE FROM issues
			WHERE id = $1
			RETURNING *;
			`,
			[id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

		res.status(200).json({
			message: "Issue deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};