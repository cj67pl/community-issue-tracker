import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizedRoles } from "../middleware/role.middleware.js";

import {
	getCategories,
	createCategory,
	updateCategory,
	deactivateCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getCategories);

// router.get("/:id", authenticateToken, getCategoryById);

router.post("/", authenticateToken, authorizedRoles(1), createCategory);

router.patch("/:id", authenticateToken, authorizedRoles(1), updateCategory);

router.delete("/:id", authenticateToken, authorizedRoles(1), deactivateCategory);


export default router;
