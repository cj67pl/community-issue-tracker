import pool from "../config/db.js";
import { isNonEmptyString, isValidId } from "../utils/validation.js";


export const getIssues = async (req, res, next) => {

    try {

		
        const result = await pool.query(`SELECT 
                                    issues.id,
                                    issues.title,
                                    issues.description,
                                    issues.location,
                                    issues.reported_at,
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
								ORDER by reported_at DESC
                                
                                `);

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
                                    issues.id,
                                    issues.title,
                                    issues.description,
                                    issues.location,
                                    issues.reported_at,
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
                                WHERE issues.id = $1

        `,
            [id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                error: "Issue not found",
            });
        }

        res.json({
			message: "Issue fetched successfully!",
			issue: result.rows[0]});
    } catch (error) {
        next(error);
    }

};

export const createIssue =  async (req, res, next) => {
	// console.log(req.body);
    // const userId = req.user.id;

    const reported_by = req.user.id;

	const {
		title,
		description,
		category_id,
		location,
		priority_level_id,
		status_id,
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
		!isValidId(priority_level_id) ||
		!isValidId(status_id)
	) {
		return res.status(400).json({
			error: "Invalid category, priority, or status ID",
		});
	}

	try {

		const cleanTitle = title.trim();
		const cleanDescription = description.trim();
		const cleanLocation = location.trim();
		const categoryResult = await pool.query(
			`SELECT id FROM categories WHERE id = $1`,
			[category_id],
		);

		const priorityResult = await pool.query(
			`SELECT id FROM priority_levels WHERE id = $1`,
			[priority_level_id],
		);

		const statusResult = await pool.query(
			`SELECT id FROM statuses WHERE id = $1`,
			[status_id],
		);

		const userResult = await pool.query(
			`SELECT id FROM users WHERE id = $1 AND is_active = true
		`,
			[reported_by],
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
		if (statusResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid status",
			});
		}
		if (userResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid user",
			});
		}

		const result = await pool.query(
			`
                    INSERT INTO issues (
                        title,
                        description,
                        category_id,
                        reported_by,
                        location,
                        priority_level_id,
                        status_id
                    )
                    VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7
                    )
                    RETURNING *;
            
            
            `,
			[
				cleanTitle,
				cleanDescription,
				category_id,
				reported_by,
				cleanLocation,
				priority_level_id,
				status_id,
			],
		);
		res.status(201).json({
			message: "Issue created successfully!",
			issue: result.rows[0]});
	} catch (error) {
		next(error);
	}
};

export const updateIssue = async (req, res, next) => {
	const { id } = req.params;
	const { status_id } = req.body;

    if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid issue ID",
		});
	}

	if (!isValidId(status_id)) {
		return res.status(400).json({
			error: "Invalid status ID",
		});
	}

	try {
		const issueResult = await pool.query(
			`
		SELECT id, reported_by
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
		if (
			(req.user.role_id !== 1 &&
			req.user.role_id !== 2 && 
			issue.reported_by !== req.user.id)
		) {
			return res.status(403).json({
				error: "You do not have permission to update this issue",
			});
		}

		const statusResult = await pool.query(
			`SELECT id FROM statuses WHERE id = $1`,
			[status_id],
		);

		if (statusResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid status",
			});
		}
		const result = await pool.query(
			`
            UPDATE issues
            SET status_id = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *;
        `,
			[status_id, id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Issue not found",
			});
		}

		res.status(200).json({
			message: "Issue updated successfully",
			issue: result.rows[0],
		});
	} catch (error) {
		next(error);
	} 
};


export const deleteIssue =  async (req, res, next) => {
	const { id } = req.params;
    if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid issue ID",
		});
	}

	try {
		const result = await pool.query(
			`
            DELETE FROM issues
            WHERE id = $1
            Returning *;    
        `,
			[id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: " Issue not found",
			});
		}

		res.status(200).json({
			message: "Issue deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};