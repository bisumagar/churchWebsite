import express from "express";
import { activateUser, deactivateUser, getAllUsers, getUserById, updateUser, updateUserRole } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin"), getAllUsers);
router.get ("/:id", authenticate, authorize("admin"), getUserById);
router.patch("/:id", authenticate, authorize("admin"), updateUser);
router.patch("/:id/deactivate", authenticate, authorize("admin"), deactivateUser);
router.patch("/:id/activate", authenticate, authorize("admin"), activateUser);
router.patch("/:id/role", authenticate, authorize("admin"), updateUserRole);

export default router;      
