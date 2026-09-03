import pool from "../config/db.js";

export const getIssueFilterOptions = async (req, res, next) => {
	try {
		const categories = await pool.query(`
            SELECT id, category_name AS name
            FROM categories
            ORDER BY category_name ASC
        `);

		const priorities = await pool.query(`
            SELECT id, priority_name AS name
            FROM priority_levels
            ORDER BY id ASC
        `);

		const statuses = await pool.query(`
            SELECT id, status_name AS name
            FROM statuses
            ORDER BY id ASC
        `);

		res.status(200).json({
			categories: categories.rows,
			priorities: priorities.rows,
			statuses: statuses.rows,
		});
	} catch (error) {
		next(error);
	}
};
