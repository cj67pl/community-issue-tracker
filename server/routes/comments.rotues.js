import express from "express";
import { getIssueComments, createComment, updateComment, deleteComment } from "../controllers/comments.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", authenticateToken, getIssueComments);
router.post("/", authenticateToken, createComment);
router.patch("/:id", authenticateToken, updateComment);
router.delete("/:id", authenticateToken, deleteComment);

export default router;