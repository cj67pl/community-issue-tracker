import express from "express";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { getDashboardKPIs, getIssuesByCategory } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/kpis", authenticateToken, getDashboardKPIs);
router.get("/categories", authenticateToken, getIssuesByCategory);

export default router;