import pool from "../config/db.js";
import { isNonEmptyString, isValidId } from "../utils/validation.js";

export const getIssueComments = async (req, res, next) => {
	// console.log(req.params);
	const { id } = req.params;
	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid issue ID",
		});
	}
	try {
		const result = await pool.query(
			`
                        SELECT 
                            comments.id,
                            comments.content,
                            comments.created_at,
                            comments.updated_at,
                            users.name AS user_name
                        FROM comments
                        
                        JOIN users
                            ON comments.user_id = users.id
                        WHERE comments.issue_id = $1
                        ORDER by comments.created_at DESC;
                `,
			[id],
		);

		res.json(result.rows);
	} catch (error) {
		next(error);
	}
};

export const createComment =  async (req, res, next) => {
	const { id } = req.params;
	const { content } = req.body;
    const user_id = req.user.id;

    if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid issue ID",
		});
	}

	if (!isNonEmptyString(content)) {
		return res.status(400).json({
			error: "Comment content is required",
		});
	}

	if (content.trim().length > 1000) {
		return res.status(400).json({
			error: "Comment must not exceed 1000 characters",
		});
	}

	try {
		// const issueResult = await pool.query(
		// 	`
        //     SELECT id
        //     FROM issues
        //     WHERE id = $1
        //     `,
		// 	[user_id],
		// );

		// if (issueResult.rowCount === 0) {
		// 	return res.status(404).json({
		// 		error: "Issue not found",
		// 	});
		// }


		const result = await pool.query(
			`
                INSERT INTO comments (
                    issue_id,
                    user_id,
                    content
                )
                VALUES (
                    $1,
                    $2,
                    $3
                )
                RETURNING *;
            
            `,
			[id, user_id, content.trim()],
		);

		res.status(201).json({
			message: "Comment created successfully",
			comment: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

export const updateComment = async (req, res, next) => {
	const { id } = req.params;
	const { content } = req.body;

    if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid comment ID",
		});
	}

	if (!isNonEmptyString(content)) {
		return res.status(400).json({
			error: "Comment content is required",
		});
	}

	if (content.trim().length > 1000) {
		return res.status(400).json({
			error: "Comment must not exceed 1000 characters",
		});
	}

	try {
		const commentResult = await pool.query(
			`
                    SELECT id, user_id 
                    FROM comments
                    WHERE id = $1
            `,
			[id],
		);

		if (commentResult.rowCount === 0) {
			return res.status(404).json({
				error: "Comment not found",
			});
		}

		const comment = commentResult.rows[0];

		if ((req.user.role_id === 3 || req.user.role_id === 2) && comment.user_id !== req.user.id) {
			return res.status(403).json({
				error: "You are not allowed to modify this comment",
			});
		}


		const result = await pool.query(
			`
                UPDATE comments
                SET content = $1, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING *;
        `,
			[content.trim(), id],
		);

		res.status(200).json({
			message: "Comment updated successfully",
			comment: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

export const deleteComment = async (req, res, next) => {
	const { id } = req.params;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid comment ID",
		});
	}

	// if (req.user.role_id !== 1) {
	// 	return res.status(403).json({
	// 		error: "You are not allowed to delete issues",
	// 	});
	// }

	try {
		const commentResult = await pool.query(
					`
				SELECT id, user_id
				FROM comments
				WHERE id = $1
			`,
			[id],
		);

		if (commentResult.rowCount === 0) {
			return res.status(404).json({
				error: "Comment not found",
			});
		}

		const comment = commentResult.rows[0];

			
		if (req.user.role_id !== 1 && comment.user_id !== req.user.id) {
			return res.status(403).json({
				error: "You are not allowed to delete this comment",
			});
		}

		const result = await pool.query(
			`
                DELETE
                FROM comments
                WHERE id = $1
            
            `,
			[id],
		);

		// if (result.rowCount === 0) {
		// 	return res.status(404).json({
		// 		error: "Comment not found",
		// 	});
		// }

		res.status(200).json({
			message: "Comment deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};