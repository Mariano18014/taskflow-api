import { Router } from "express";
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from "../controller/projectController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { createProjectSchema, updateProjectSchema } from "../validations/projectValidation.js";

const router = Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Task Management App
 *               description:
 *                 type: string
 *                 example: Project for managing tasks and team collaboration
 *     responses:
 *       201:
 *         description: Project created successfully
 */

router.post(
    "/",
    authMiddleware,
    validate(createProjectSchema),
    createProject
);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects of the authenticated user
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */

router.get(
    "/",
    authMiddleware,
    getProjects
);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project information
 */

router.get(
    "/:id",
    authMiddleware,
    getProjectById
);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Project Name
 *               description:
 *                 type: string
 *                 example: Updated project description
 *     responses:
 *       200:
 *         description: Project updated successfully
 */

router.put(
    "/:id",
    authMiddleware,
    validate(updateProjectSchema),
    updateProject
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */

router.delete(
    "/:id",
    authMiddleware,
    deleteProject
);

export default router;