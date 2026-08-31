import express from "express";
import { getUsers, getUserById, createUser, updateUserPassword, updateUserRole, reactivateUser, deactivateUser } from "../controllers/users.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizedRoles } from "../middleware/role.middleware.js";


const router = express.Router();

router.get("/", authenticateToken, authorizedRoles(1,2), getUsers);
router.get("/:id", authenticateToken, authorizedRoles(1, 2), getUserById);
router.post("/", authenticateToken, authorizedRoles(1), createUser);
router.patch("/:id/password", authenticateToken, updateUserPassword);
router.patch("/:id/role", authenticateToken, authorizedRoles(1), updateUserRole);
router.patch("/:id/reactivate", authenticateToken, authorizedRoles(1), reactivateUser);
router.delete("/:id", authenticateToken, authorizedRoles(1), deactivateUser);



export default router;
 