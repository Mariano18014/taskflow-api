import { Router } from "express";
import { addProjectMember, getProjectMembers, updateProjectMemberRole, removeProjectMember } from "../controller/projectMemberController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/:projectId/members", authMiddleware, addProjectMember);

router.get("/:projectId/members", authMiddleware, getProjectMembers);

router.put("/:projectId/members/:userId", authMiddleware, updateProjectMemberRole);

router.delete("/:projectId/members/:userId", authMiddleware, removeProjectMember);

export default router;