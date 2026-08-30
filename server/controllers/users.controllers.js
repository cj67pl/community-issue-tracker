import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
	try {
		const result = await pool.query(`
                    SELECT
                        users.id,
                        users.name,
                        users.email,
                        roles.role_name AS role,
                        users.created_at,
                        users.updated_at
                    FROM users
                    JOIN roles
                        ON users.role_id = roles.id
                    WHERE is_active = true    
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

export const getUserById = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query(
			`
                    SELECT
                        users.id,
                        users.name,
                        users.email,
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

		res.json(result.rows[0]);
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "User not found",
		});
	}
};

export const createUser = async (req, res) => {
	const { name, password, role, email } = req.body;

	if (!name || !password || !role || !email) {
		return res.status(400).json({
			error: "All fields are required",
		});
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email)) {
		return res.status(400).json({
			error: "Invalid email format",
		});
	}

	if (password.length < 8) {
		return res.status(400).json({
			error: "Password must be at least 8 characters long",
		});
	}

	try {
		const existingUser = await pool.query(
			`
                SELECT id 
                FROM users 
                WHERE email = $1 
            
        `,
			[email],
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
            INSERT INTO
                    users (name, password, role_id, email)
            VALUES ($1, $2, $3, $4)
            RETURNING 
            id, name, email, role_id, created_at, updated_at;
            
            
        `,
			[name, hashedPassword, role, email],
		);

		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to create user",
		});
	}
};

export const updateUserPassword = async (req, res) => {
	const { id } = req.params;
	const { password } = req.body;

	if (!password) {
		return res.status(400).json({
			error: "Password is required",
		});
	}

	if (password.length < 8) {
		return res.status(400).json({
			error: "Password must be at least 8 characters long",
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
		console.error(error);

		res.status(500).json({
			error: "Failed to update user password",
		});
	}
};

export const updateUserRole = async (req, res) => {
	const { id } = req.params;
	const { role } = req.body;

	if (!role) {
		return res.status(400).json({
			error: "Role is required",
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
			return res.status(400).json({
				error: "User not found",
			});
		}

		const result = await pool.query(
			`
                UPDATE users
                SET role_id = $1, 
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                RETURNING
                    id,
                    name,
                    email,
                    role_id,
                    updated_at;

        `,
			[role, id],
		);

		res.status(200).json({
			message: "Role updated successfully",
			user: result.rows[0],
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "Failed to update user role",
		});
	}
};

export const reactivateUser = async (req, res) => {
	const { id } = req.params;

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
			return res.status(400).json({
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
		console.error(error);

		res.status(500).json({
			error: "Failed to reactivate user",
		});
	}
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

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
		console.error(error);

		res.status(500).json({
			error: "Failed to delete user",
		});
	}
};
