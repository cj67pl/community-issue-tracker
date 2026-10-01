import express from "express";
import {
	getAnalyticsKpi,
	getIssueTrends,
	getIssueTrendsByStatus,
	getIssuesByCategory,
	getIssuesByPriority,
	getIssuesByLocation,
	getResolutionStats,
	getPeriodComparison,
    exportReportsCsv
} from "../controllers/analytics.controller.js";
import { exportAnalyticsCsv } from "../controllers/analyticsexport.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizedRoles } from "../middleware/role.middleware.js";


const router = express.Router();

router.get("/kpi", authenticateToken, authorizedRoles(1), getAnalyticsKpi);
router.get("/trends", authenticateToken, authorizedRoles(1), getIssueTrends);
router.get("/by-status", authenticateToken, authorizedRoles(1), getIssueTrendsByStatus);
router.get("/count-categories", authenticateToken, authorizedRoles(1), getIssuesByCategory);
router.get("/count-priorities", authenticateToken, authorizedRoles(1), getIssuesByPriority);
router.get("/count-locations", authenticateToken, authorizedRoles(1), getIssuesByLocation);
router.get("/resolution-stats", authenticateToken, authorizedRoles(1), getResolutionStats);
router.get("/period-comparison", authenticateToken, authorizedRoles(1), getPeriodComparison);
router.get("/export", authenticateToken, authorizedRoles(1), exportReportsCsv);
router.get("/analytics-export", authenticateToken, authorizedRoles(1), exportAnalyticsCsv);

export default router;