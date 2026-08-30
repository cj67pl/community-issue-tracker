import express from "express";
import { getIssues, getIssueById, createIssue, updateIssue, deleteIssue } from "../controllers/issues.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();




router.get("/", getIssues);
router.get("/:id", getIssueById);
router.post("/", authenticateToken, createIssue);
router.patch("/:id", updateIssue);
router.delete("/:id", deleteIssue);




export default router;
