import express from "express";

import {
	getIssueComments,
	createComment,
	updateComment,
	deleteComment,
} from "../controllers/comments.controllers.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import demoMode from "../middleware/demoMode.js";

const router = express.Router({ mergeParams: true });

router.get("/", authenticateToken, getIssueComments);

router.post("/", authenticateToken, demoMode, createComment);

router.patch("/:id", authenticateToken, demoMode, updateComment);

router.delete("/:id", authenticateToken, demoMode, deleteComment);

export default router;
