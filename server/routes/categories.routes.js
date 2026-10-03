import express from "express";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizedRoles } from "../middleware/role.middleware.js";
import demoMode from "../middleware/demoMode.js";

import {
    getCategories,
    createCategory,
    updateCategory,
    updateCategoryStatus,
    // deactivateCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/", authenticateToken, getCategories);

// router.get("/:id", authenticateToken, getCategoryById);

router.post("/", authenticateToken, demoMode, authorizedRoles(1), createCategory);

router.patch("/:id", authenticateToken, demoMode, authorizedRoles(1), updateCategory);

router.patch(
    "/:id/status",
    authenticateToken,
    demoMode,
    authorizedRoles(1),
    updateCategoryStatus,
);

// router.delete("/:id", authenticateToken, authorizedRoles(1), deactivateCategory);

export default router;