import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			error: "Access token is required",
		});
	}


	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// req.user = decoded;
		// next();

		const result = await pool.query(
            `
                SELECT
                    id,
                    role_id,
                    is_active
                FROM users
                WHERE id = $1
            `,
            [decoded.id]
        );

        if (result.rowCount === 0) {
            return res.status(401).json({
                error: "User not found",
            });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(403).json({
                error: "Account is inactive",
            });
        }

        req.user = {
            id: user.id,
            role_id: user.role_id
        };

        next();

	} catch (error) {
		return res.status(403).json({
			error: "Invalid or expired token",
		});
	}
};
