import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { isNonEmptyString, isValidId, isValidEmail, isValidPassword } from "../utils/validation.js";

export const getUsers = async (req, res, next) => {
	try {
		const result = await pool.query(`
				SELECT
					users.id,
					users.name,
					users.email,
					users.role_id,
					roles.role_name AS role,
					users.is_active,
					CASE
						WHEN users.is_active = true THEN 'Active'
						ELSE 'Inactive'
					END AS status,
					users.created_at,
					users.updated_at
				FROM users
				LEFT JOIN roles
					ON users.role_id = roles.id
				ORDER BY users.id;
            `);

		res.json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to get users",
		});
	}
};

export const getUserById = async (req, res, next) => {
	const { id } = req.params;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid user ID",
		});
	}

	try {
		const result = await pool.query(
			`
                    SELECT
                        users.id,
                        users.name,
                        users.email,
						users.phone,
                        roles.role_name AS role,
                        users.created_at,
                        users.updated_at
                    FROM users
                    JOIN roles
                        ON users.role_id = roles.id
                    WHERE users.id = $1
                        AND is_active = true;
            
            `,
			[id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		res.json({
			message: "User fetched successfully!",
			user: result.rows[0]
		});
	} catch (error) {
		next(error);
	}
};

export const createUser = async (req, res, next) => {
	const { name, password, role, email, is_active = true } = req.body;

	if (!isNonEmptyString(name)) {
		return res.status(400).json({
			error: "Name is required",
		});
	}

	if (!isValidEmail(email)) {
		return res.status(400).json({
			error: "Invalid email format",
		});
	}

	if (!isValidPassword(password)) {
		return res.status(400).json({
			error: "Password must be at least 8 characters long",
		});
	}

	if (!isValidId(role)) {
		return res.status(400).json({
			error: "Invalid role ID",
		});
	}

	try {
		const cleanName = name.trim();
		const cleanEmail = email.trim().toLowerCase();

		const existingUser = await pool.query(
			`
                SELECT id 
                FROM users 
                WHERE email = $1 
            
        `,
			[cleanEmail],
		);

		if (existingUser.rowCount > 0) {
			return res.status(409).json({
				error: "Email is already registered",
			});
		}

		const rolesResult = await pool.query(
			`
            SELECT id FROM roles WHERE id = $1 
            
            `,
			[role],
		);

		if (rolesResult.rowCount === 0) {
			return res.status(404).json({
				error: "Invalid role",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 15);

		const result = await pool.query(
			`
				INSERT INTO users (
					name,
					password,
					role_id,
					email,
					is_active
				)
				VALUES ($1, $2, $3, $4, $5)
				RETURNING
					id,
					name,
					email,
					role_id,
					is_active,
					created_at,
					updated_at;
			`,
			[cleanName, hashedPassword, role, cleanEmail, is_active],
		);

		res.status(201).json(
		{
			message: "User registered successfully",
			user: result.rows[0]
		});
	} catch (error) {
		next(error);
	}
};

export const updateUserPassword = async (req, res, next) => {
	const { id } = req.params;
	const { password } = req.body;

    if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid user ID",
		});
	}

	if (!isValidPassword(password)) {
		return res.status(400).json({
			error: "Password must be at least 8 characters long",
		});
	}


    if (req.user.role_id !== 1 && Number(id) !== req.user.id) {
		return res.status(403).json({
			error: "You can only change your own password",
		});
	}



	try {
		const userResult = await pool.query(
			`
                    SELECT id 
                    FROM users
                    WHERE id = $1
            `,
			[id],
		);

		if (userResult.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}


		const hashedPassword = await bcrypt.hash(password, 15);

		const result = await pool.query(
			`
                UPDATE users
                SET password = $1, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING 
                id, name, email, role_id, updated_at; 
                
            `,
			[hashedPassword, id],
		);

		res.status(200).json({
			message: "Password updated successfully",
			user: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

export const updateUserRole = async (req, res, next) => {
	const { id } = req.params;
	const { role } = req.body;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid user ID",
		});
	}

	if (!isValidId(role)) {
		return res.status(400).json({
			error: "Invalid role ID",
		});
	}

	try {
		const roleResult = await pool.query(
			`
                SELECT id
                FROM roles
                WHERE id = $1
            `,
			[role],
		);

		if (roleResult.rowCount === 0) {
			return res.status(400).json({
				error: "Invalid role",
			});
		}

		const userResult = await pool.query(
			`
                SELECT id
                FROM users
                WHERE id = $1
            `,
			[id],
		);

		if (userResult.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		await pool.query(
			`
                UPDATE users
                SET
                    role_id = $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
            `,
			[role, id],
		);

		const result = await pool.query(
			`
                SELECT
                    users.id,
                    users.name,
                    users.email,
                    users.role_id,
                    roles.role_name AS role,
                    users.is_active,
                    CASE
                        WHEN users.is_active THEN 'Active'
                        ELSE 'Inactive'
                    END AS status,
                    users.created_at,
                    users.updated_at
                FROM users
                JOIN roles
                    ON users.role_id = roles.id
                WHERE users.id = $1
            `,
			[id],
		);

		res.status(200).json({
			message: "Role updated successfully",
			user: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

export const updateUserStatus = async (req, res, next) => {
	const { id } = req.params;
	const { is_active } = req.body;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid user ID",
		});
	}

	if (typeof is_active !== "boolean") {
		return res.status(400).json({
			error: "is_active must be a boolean",
		});
	}

	try {
		const userResult = await pool.query(
			`
                SELECT id
                FROM users
                WHERE id = $1
            `,
			[id],
		);

		if (userResult.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		const result = await pool.query(
			`
                UPDATE users
                SET
                    is_active = $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING
                    id,
                    name,
                    email,
                    role_id,
                    is_active,
                    created_at,
                    updated_at;
            `,
			[is_active, id],
		);

		res.status(200).json({
			message: is_active
				? "User activated successfully"
				: "User deactivated successfully",
			user: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

export const updateUserProfile = async (req, res, next) => {
	const { id } = req.params;
	const { name, email } = req.body;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid user ID",
		});
	}

	if (!isNonEmptyString(name)) {
		return res.status(400).json({
			error: "Name is required",
		});
	}

	if (!isValidEmail(email)) {
		return res.status(400).json({
			error: "Invalid email format",
		});
	}

	try {
		const cleanName = name.trim();
		const cleanEmail = email.trim().toLowerCase();

		const userResult = await pool.query(
			`
                SELECT id
                FROM users
                WHERE id = $1
            `,
			[id],
		);

		if (userResult.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		const existingEmail = await pool.query(
			`
                SELECT id
                FROM users
                WHERE email = $1
                  AND id != $2
            `,
			[cleanEmail, id],
		);

		if (existingEmail.rowCount > 0) {
			return res.status(409).json({
				error: "Email is already registered",
			});
		}

		const result = await pool.query(
			`
                UPDATE users
                SET
                    name = $1,
                    email = $2,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $3
                RETURNING
                    id,
                    name,
                    email,
                    role_id,
                    is_active,
                    created_at,
                    updated_at;
            `,
			[cleanName, cleanEmail, id],
		);

		res.status(200).json({
			message: "User updated successfully",
			user: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

export const reactivateUser = async (req, res, next) => {
	const { id } = req.params;
	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid user ID",
		});
	}
	try {
		const userResult = await pool.query(
			`
                    SELECT id 
                    FROM users
                    WHERE id = $1
                        AND is_active = false
            `,
			[id],
		);

		if (userResult.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		const result = await pool.query(
			`
                UPDATE users
                SET is_active = true, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $1
                RETURNING
                    id,
                    name,
                    email,
                    role_id,
                    is_active,
                    updated_at;

        `,
			[id],
		);

		res.status(200).json({
			message: "User reactivated successfully",
			user: result.rows[0],
		});
	} catch (error) {
		next(error);
	}
};

export const deactivateUser = async (req, res, next) => {
	const { id } = req.params;

	if (!isValidId(id)) {
		return res.status(400).json({
			error: "Invalid user ID",
		});
	}

	try {
		const result = await pool.query(
			`
                UPDATE users
                SET is_active = false
                WHERE id = $1
            

        `,
			[id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({
				error: "User not found",
			});
		}

		res.status(200).json({
			message: "User deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};
