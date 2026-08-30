import express from "express";
import { getUsers, getUserById, createUser, updateUserPassword, updateUserRole, reactivateUser, deleteUser } from "../controllers/users.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getUserById);
router.post("/", authenticateToken, createUser);
router.patch("/:id/password", authenticateToken, updateUserPassword);
router.patch("/:id/role", authenticateToken, updateUserRole);
router.patch("/:id/reactivate", authenticateToken, reactivateUser);
router.delete("/:id", authenticateToken, deleteUser);



export default router;
 