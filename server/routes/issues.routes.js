import express from "express";
import { getIssues, getIssueById, createIssue, updateIssue, deleteIssue } from "../controllers/issues.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();




router.get("/", authenticateToken, getIssues);
router.get("/:id", authenticateToken, getIssueById);
router.post("/", authenticateToken, createIssue);
router.patch("/:id", authenticateToken, updateIssue);
router.delete("/:id", authenticateToken, deleteIssue);




export default router;
