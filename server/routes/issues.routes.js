import express from "express";
import { getIssues, getIssueById, createIssue, updateIssue, deleteIssue } from "../controllers/issues.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizedRoles } from "../middleware/role.middleware.js";
import { getIssueFilterOptions } from "../controllers/filter.controller.js";

const router = express.Router();




router.get("/", authenticateToken, getIssues);
router.get("/filter-options", authenticateToken, getIssueFilterOptions);
router.get("/:id", authenticateToken, getIssueById);
router.post("/", authenticateToken, createIssue);
router.patch("/:id", authenticateToken, authorizedRoles(1, 2), updateIssue);
router.delete("/:id", authenticateToken, authorizedRoles(1), deleteIssue);




export default router;
 