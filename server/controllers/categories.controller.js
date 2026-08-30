import pool from "../config/db.js";

export const getCategories = async (req, res) => {
	try {
		const result = await pool.query(`
            SELECT
                id,
                category_name,
                description,
                is_active,
                created_at,
                updated_at
            FROM categories
            WHERE is_active = true
            ORDER BY category_name;
        `);

		res.json(result.rows);
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to retrieve categories",
		});
	}
};

export const createCategory = async (req, res) => {
	const { category_name, description } = req.body;

	if (!category_name) {
		return res.status(400).json({
			error: "Category name is required",
		});
	}

	try {
		const existingCategory = await pool.query(
			`
            SELECT id
            FROM categories
            WHERE LOWER(category_name) = LOWER($1)
            `,
			[category_name],
		);

		if (existingCategory.rowCount > 0) {
			return res.status(409).json({
				error: "Category already exists",
			});
		}

		const result = await pool.query(
			`
            INSERT INTO categories (
                category_name,
                description
            )
            VALUES ($1, $2)
            RETURNING *;
            `,
			[category_name, description || null],
		);

		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to create category",
		});
	}
};

export const updateCategory = async (req, res) => {
	const { id } = req.params;
	const { category_name, description } = req.body;

	if (!category_name) {
		return res.status(400).json({
			error: "Category name is required",
		});
	}

	try {
		const categoryResult = await pool.query(
			`
            SELECT id
            FROM categories
            WHERE id = $1
            `,
			[id],
		);

		if (categoryResult.rowCount === 0) {
			return res.status(404).json({
				error: "Category not found",
			});
		}

		const duplicateResult = await pool.query(
			`
            SELECT id
            FROM categories
            WHERE LOWER(category_name) = LOWER($1)
            AND id != $2
            `,
			[category_name, id],
		);

		if (duplicateResult.rowCount > 0) {
			return res.status(409).json({
				error: "Category name already exists",
			});
		}

		const result = await pool.query(
			`
            UPDATE categories
            SET
                category_name = $1,
                description = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *;
            `,
			[category_name, description || null, id],
		);

		res.status(200).json({
			message: "Category updated successfully",
			category: result.rows[0],
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to update category",
		});
	}
};

export const deactivateCategory = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query(
			`
            UPDATE categories
            SET
                is_active = false,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            AND is_active = true
            RETURNING *;
            `,
			[id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Category not found or already inactive",
			});
		}

		res.status(200).json({
			message: "Category deactivated successfully",
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to deactivate category",
		});
	}
};
