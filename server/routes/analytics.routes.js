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

router.get("/kpi", authenticateToken, getAnalyticsKpi);
router.get("/trends", authenticateToken, getIssueTrends);
router.get("/by-status", authenticateToken, getIssueTrendsByStatus);
router.get("/count-categories", authenticateToken, getIssuesByCategory);
router.get("/count-priorities", authenticateToken, getIssuesByPriority);
router.get("/count-locations", authenticateToken, getIssuesByLocation);
router.get("/resolution-stats", getResolutionStats);
router.get("/period-comparison", getPeriodComparison);
router.get("/export", authenticateToken, exportReportsCsv);
router.get("/analytics-export", authenticateToken, exportAnalyticsCsv);

export default router;