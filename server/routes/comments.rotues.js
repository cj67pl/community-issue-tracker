import express from "express";
import { getIssueComments, createComment, updateComment, deleteComment } from "../controllers/comments.controllers.js";

const router = express.Router({ mergeParams: true });

router.get("/", getIssueComments);
router.post("/", createComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;