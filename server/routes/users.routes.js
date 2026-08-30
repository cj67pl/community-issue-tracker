import express from "express";
import { getUsers, getUserById, createUser, updateUserPassword, updateUserRole, reactivateUser, deleteUser } from "../controllers/users.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id/password", updateUserPassword);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/reactivate", reactivateUser);
router.delete("/:id", deleteUser);



export default router;
 