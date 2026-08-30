import pool from "../config/db.js";

export const getIssueComments = async (req, res) => {
	// console.log(req.params);
	const { id } = req.params;
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
		console.error(error);
		res.status(500).json({
			error: "Failed to retrieve comments",
		});
	}
};

export const createComment =  async (req, res) => {
	const { id } = req.params;
	const { user_id, content } = req.body;

	if (!user_id || !content) {
		return res.status(400)({
			error: "All fields are required",
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

		const userResult = await pool.query(
			`
            SELECT id
            FROM users
            WHERE id = $1
            `,
			[user_id],
		);

		if (userResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid user",
			});
		}
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
			[id, user_id, content],
		);

		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to create comment",
		});
	}
};

export const updateComment = async (req, res) => {
	const { id } = req.params;
	const { content } = req.body;

	if (!content) {
		return res.status(400).json({
			error: "Comment update required",
		});
	}

	try {
		const commentResult = await pool.query(
			`
                    SELECT id 
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

		const result = await pool.query(
			`
                UPDATE comments
                SET content = $1, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING *;
        `,
			[content, id],
		);

		res.status(200).json({
			message: "Comment updated successfully",
			comment: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to update comment",
		});
	}
};

export const deleteComment = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query(
			`
                DELETE
                FROM comments
                WHERE comments.id = $1
                RETURNING *;
            
            `,
			[id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Comment not found",
			});
		}

		res.status(200).json({
			message: "Comment deleted successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to delete comment",
		});
	}
};