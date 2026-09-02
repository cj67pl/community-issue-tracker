import express from "express";
import { login } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/login", login);
router.get("/me", authenticateToken, getCurrentUser);

export default router;

