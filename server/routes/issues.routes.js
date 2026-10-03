import express from "express";
import { getIssues, getIssueById, createIssue, updateIssue, deleteIssue, updateIssuePriority, getUserIssues } from "../controllers/issues.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizedRoles } from "../middleware/role.middleware.js";
import { getIssueFilterOptions } from "../controllers/filter.controller.js";
import demoMode from "../middleware/demoMode.js";

const router = express.Router();




router.get("/", authenticateToken, getIssues);
router.get("/user-issues", authenticateToken, getUserIssues);
router.get("/filter-options", authenticateToken, getIssueFilterOptions);
router.get("/:id", authenticateToken, getIssueById);
router.post("/", authenticateToken, demoMode, createIssue);

router.patch("/:id", authenticateToken, demoMode, authorizedRoles(1, 2), updateIssue);

router.patch("/:id/priority", authenticateToken, demoMode, authorizedRoles(1, 2), updateIssuePriority);

router.delete("/:id", authenticateToken, demoMode, authorizedRoles(1, 3), deleteIssue);




export default router;
 