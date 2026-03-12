import { Router } from "express";
import { addProjectMember, getProjectMembers, updateProjectMemberRole, removeProjectMember } from "../controller/projectMemberController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { addProjectMemberSchema, updateProjectMemberRoleSchema } from "../validations/projectMemberValidation.js";

const router = Router();

router.post(
    "/:projectId/members",
    authMiddleware,
    validate(addProjectMemberSchema),
    addProjectMember
);

router.get(
    "/:projectId/members",
    authMiddleware,
    getProjectMembers
);

router.put(
    "/:projectId/members/:userId",
    authMiddleware,
    validate(updateProjectMemberRoleSchema),
    updateProjectMemberRole
);

router.delete(
    "/:projectId/members/:userId",
    authMiddleware,
    removeProjectMember
);

export default router;