import express from "express";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { getDashboardKPIs, getIssuesByCategory, getIssuesByUrgency, getRecentIssues, getUserDashboardKPIs } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/kpis", authenticateToken, getDashboardKPIs);

router.get("/user-kpis", authenticateToken, getUserDashboardKPIs);
router.get("/categories", authenticateToken, getIssuesByCategory);
router.get("/urgent", authenticateToken, getIssuesByUrgency);
router.get("/recent/issues", authenticateToken, getRecentIssues);

export default router;