import express from "express";
import { adminTest, getCurrentUser, loginUser, registerUser } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);  
router.get("/me", authenticate, getCurrentUser);

router.get("/admin-test", authenticate, authorize("admin"), adminTest);

export default router;