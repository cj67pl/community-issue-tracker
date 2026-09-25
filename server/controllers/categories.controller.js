import pool from "../config/db.js";
import { isNonEmptyString, isValidId } from "../utils/validation.js";

export const getCategories = async (req, res, next) => {
	try {
		const result = await pool.query(`
            SELECT
                categories.id,
                categories.category_name AS name,
                categories.description,
                categories.is_active,
                CASE
                    WHEN categories.is_active = true
                    THEN 'Active'
                    ELSE 'Inactive'
                END AS status,
                COUNT(issues.id)::int AS "issueCount",
                categories.created_at,
                categories.updated_at
            FROM categories
            LEFT JOIN issues
                ON issues.category_id = categories.id
            GROUP BY
                categories.id,
                categories.category_name,
                categories.description,
                categories.is_active,
                categories.created_at,
                categories.updated_at
            ORDER BY categories.category_name;
        `);

		res.json(result.rows);
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to retrieve categories",
		});
	}
};

export const createCategory = async (req, res, next) => {
	const { category_name, description } = req.body;

	if (!isNonEmptyString(category_name)) {
		return res.status(400).json({
			error: "Category name is required",
		});
	}

	try {
		const cleanName = category_name.trim();
		const cleanDescription = description?.trim() || null;

		const existingCategory = await pool.query(
			`
                SELECT id
                FROM categories
                WHERE LOWER(category_name) = LOWER($1)
            `,
			[cleanName],
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
                RETURNING
                    id,
                    category_name,
                    description,
                    is_active,
                    created_at,
                    updated_at;
            `,
			[cleanName, cleanDescription],
		);

		const category = result.rows[0];

		res.status(201).json({
			message: "Category created successfully",
			category: {
				id: category.id,
				name: category.category_name,
				description: category.description,
				is_active: category.is_active,
				status: category.is_active ? "Active" : "Inactive",
				issueCount: 0,
				created_at: category.created_at,
				updated_at: category.updated_at,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const updateCategory = async (req, res, next) => {
	const { id } = req.params;
	const { category_name, description } = req.body;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid category ID",
		});
	}

	if (!isNonEmptyString(category_name)) {
		return res.status(400).json({
			error: "Category name is required",
		});
	}

	try {
		const cleanName = category_name.trim();
		const cleanDescription = description?.trim() || null;

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
			[cleanName, id],
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
                AND is_active = true
                RETURNING
                    id,
                    category_name,
                    description,
                    is_active,
                    created_at,
                    updated_at;
            `,
			[cleanName, cleanDescription, id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Category not found or inactive",
			});
		}

		const category = result.rows[0];

		res.status(200).json({
			message: "Category updated successfully",
			category: {
				id: category.id,
				name: category.category_name,
				description: category.description,
				is_active: category.is_active,
				status: category.is_active ? "Active" : "Inactive",
				updated_at: category.updated_at,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const updateCategoryStatus = async (req, res, next) => {
	const { id } = req.params;
	const { is_active } = req.body;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid category ID",
		});
	}

	if (typeof is_active !== "boolean") {
		return res.status(400).json({
			error: "is_active must be a boolean",
		});
	}

	try {
		const result = await pool.query(
			`
                UPDATE categories
                SET
                    is_active = $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING
                    id,
                    category_name,
                    description,
                    is_active,
                    updated_at;
            `,
			[is_active, id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "Category not found",
			});
		}

		const category = result.rows[0];

		res.status(200).json({
			message: is_active
				? "Category activated successfully"
				: "Category deactivated successfully",

			category: {
				id: category.id,
				name: category.category_name,
				description: category.description,
				is_active: category.is_active,
				status: category.is_active ? "Active" : "Inactive",
				updated_at: category.updated_at,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const deactivateCategory = async (req, res, next) => {
	const { id } = req.params;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid category ID",
		});
	}

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
		next(error);
	}
};
