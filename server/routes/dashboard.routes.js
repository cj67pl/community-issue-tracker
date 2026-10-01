import express from "express";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizedRoles } from "../middleware/role.middleware.js";

import {
    getDashboardKPIs,
    getIssuesByCategory,
    getIssuesByUrgency,
    getRecentIssues,
    getUserDashboardKPIs,
    getAdminKPIs,
    getIssuesCount,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/kpis", authenticateToken, authorizedRoles(2), getDashboardKPIs);

router.get( "/user-kpis", authenticateToken, authorizedRoles(3), getUserDashboardKPIs);

router.get("/admin-kpis", authenticateToken, authorizedRoles(1), getAdminKPIs);

router.get("/admin-issues-counts", authenticateToken, authorizedRoles(1), getIssuesCount);

router.get( "/categories", authenticateToken, authorizedRoles(1, 2), getIssuesByCategory);

router.get("/urgent", authenticateToken, authorizedRoles(2),  getIssuesByUrgency);

router.get("/recent/issues", authenticateToken, authorizedRoles(2), getRecentIssues);

export default router;