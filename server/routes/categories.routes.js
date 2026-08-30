import express from "express";

import {
	getCategories,
	createCategory,
	updateCategory,
	deactivateCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", createCategory);

router.patch("/:id", updateCategory);

router.patch("/:id/deactivate", deactivateCategory);

export default router;
