import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isValidEmail, isValidPassword, isNonEmptyString } from "../utils/validation.js";

export const login = async (req, res) => {
    const { email, password} = req.body;


    if (!isValidEmail(email)) {
        return res.status(400).json({
			error: "Invalid email or password",
		});
    }

    if (!isNonEmptyString(password)) {
        return res.status(400).json({
			error: "Invalid email or password",
		});
    }


    try {
        const cleanEmail = email.trim().toLowerCase();
        const result = await pool.query(` 
                SELECT
                    id,
                    name,
                    email,
                    password,
                    role_id,
                    is_active
                FROM users
                WHERE email = $1
            `,
                [cleanEmail],
            );
        if (result.rowCount === 0) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        const user = result.rows[0];    

        if (!user.is_active) {
            return res.status(403).json({
                error: "Account is inactive",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role_id: user.role_id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            },
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id,
            },
        });

    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Login failed",
        });
    }

    

};