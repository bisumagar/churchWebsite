import express from "express";

import { activateMember, createMember, deactivateMember, getAllMembers, getMemberById, updateMember } from "../controllers/member.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";


const router = express.Router();

router.post("/", authenticate, createMember);
router.get("/", authenticate, getAllMembers);
router.get("/:id", authenticate, getMemberById);
router.put("/:id", authenticate, updateMember);
router.patch("/:id/deactivate", authenticate, authorize("admin"),deactivateMember);
router.patch("/:id/activate", authenticate, authorize("admin"), activateMember);

export default router;