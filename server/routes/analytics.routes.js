import express from "express";
import {
	getAnalyticsKpi,
	getIssueTrends,
	getIssueTrendsByStatus,
    exportReportsCsv
} from "../controllers/analytics.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizedRoles } from "../middleware/role.middleware.js";


const router = express.Router();

router.get("/kpi", authenticateToken, getAnalyticsKpi);
router.get("/trends", authenticateToken, getIssueTrends);
router.get("/by-status", authenticateToken, getIssueTrendsByStatus);
router.get("/export", authenticateToken, exportReportsCsv);

export default router;