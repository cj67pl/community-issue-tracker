import express from "express";
import { getUserNotif, markNotifAsRead, markAllNotifAsRead } from "../controllers/notifications.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/", authenticateToken, getUserNotif);
router.patch("/:id/read", authenticateToken, markNotifAsRead);
router.patch("/read-all", authenticateToken, markAllNotifAsRead);




export default router;