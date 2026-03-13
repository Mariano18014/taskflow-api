import { Router } from "express";
import { addProjectMember, getProjectMembers, updateProjectMemberRole, removeProjectMember } from "../controller/projectMemberController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { addProjectMemberSchema, updateProjectMemberRoleSchema } from "../validations/projectMemberValidation.js";

const router = Router();

/**
 * @swagger
 * /projects/{projectId}/members:
 *   post:
 *     summary: Add a user as a member of a project
 *     tags:
 *       - Project Members
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - role
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 665f1c2b9a3c4d5e6f7a8b9c
 *               role:
 *                 type: string
 *                 example: member
 *     responses:
 *       201:
 *         description: Member added to project successfully
 */

router.post(
    "/:projectId/members",
    authMiddleware,
    validate(addProjectMemberSchema),
    addProjectMember
);

/**
 * @swagger
 * /projects/{projectId}/members:
 *   get:
 *     summary: Get all members of a project
 *     tags:
 *       - Project Members
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: List of project members
 */

router.get(
    "/:projectId/members",
    authMiddleware,
    getProjectMembers
);

/**
 * @swagger
 * /projects/{projectId}/members/{userId}:
 *   put:
 *     summary: Update a member role in the project
 *     tags:
 *       - Project Members
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Member role updated successfully
 */

router.put(
    "/:projectId/members/:userId",
    authMiddleware,
    validate(updateProjectMemberRoleSchema),
    updateProjectMemberRole
);

/**
 * @swagger
 * /projects/{projectId}/members/{userId}:
 *   delete:
 *     summary: Remove a member from the project
 *     tags:
 *       - Project Members
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Member removed from project successfully
 */

router.delete(
    "/:projectId/members/:userId",
    authMiddleware,
    removeProjectMember
);

export default router;