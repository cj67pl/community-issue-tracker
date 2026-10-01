import pool from "../config/db.js";
import { isValidId } from "../utils/validation.js";

export const getUserNotif = async (req, res, next) => {
	const userId = req.user.id;
	// console.log(userId);
	if (!isValidId(notificationId)) {
		return res.status(400).json({
			error: "Invalid notification ID",
		});
	}
	try {
		const result = await pool.query(
			`
            SELECT
                n.notification_id,
                n.user_id,
                u.name,
                u.role_id,
                u.is_active,
                n.issue_id,
                n.type,
                n.message,
                n.is_read,
                n.created_at
            FROM notifications AS n
            JOIN users AS u
                ON u.id = n.user_id
            WHERE u.id = $1
            ORDER BY n.created_at DESC;
            
        `,
			[userId],
		);
		res.json(result.rows);
	} catch (error) {
		next(error);
	}
};

export const markNotifAsRead = async (req, res, next) => {
	const notificationId = req.params.id;
	const userId = req.user.id;

	if (!notificationId) {
		return res.status(400).json({
			error: "Invalid notification ID",
		});
	}

	try {
		const result = await pool.query(
			`
            UPDATE notifications
            SET is_read = true
            WHERE notification_id = $1
              AND user_id = $2
            RETURNING notification_id, is_read;
            `,
			[notificationId, userId],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({
				error: "Notification not found",
			});
		}

		res.json(result.rows[0]);
	} catch (error) {
		next(error);
	}
};

export const markAllNotifAsRead = async (req, res, next) => {
	const userId = req.user.id;

	if (!userId) {
		return res.status(400).json({
			error: "Invalid user ID",
		});
	}

	try {
		const result = await pool.query(
			`
            UPDATE notifications
            SET is_read = true
            WHERE user_id = $1
              AND is_read = false
            RETURNING notification_id;
            `,
			[userId],
		);

		res.json({
			message: "All notifications marked as read",
			updatedCount: result.rowCount,
		});
	} catch (error) {
		next(error);
	}
};