import express from "express";
import { getAverageDays } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/average/days", getAverageDays);

export default router;