import express from "express";
import { getAnalyticsKpi } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/kpi", getAnalyticsKpi);

export default router;