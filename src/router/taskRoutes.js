import { Router } from "express";
import { createTask, getProjectTasks, getTaskById, updateTask, updateTaskStatus, deleteTask } from "../controller/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { createTaskSchema, updateTaskSchema, updateTaskStatusSchema } from "../validations/taskValidation.js";

const router = Router();

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   post:
 *     summary: Create a task inside a project
 *     tags:
 *       - Tasks
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
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Implement authentication
 *               description:
 *                 type: string
 *                 example: Implement JWT authentication for the API
 *               status:
 *                 type: string
 *                 example: todo
 *               assignedTo:
 *                 type: string
 *                 example: 665f1c2b9a3c4d5e6f7a8b9c
 *     responses:
 *       201:
 *         description: Task created successfully
 */

router.post(
    "/projects/:projectId/tasks",
    authMiddleware,
    validate(createTaskSchema),
    createTask
);

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   get:
 *     summary: Get all tasks for a specific project
 *     tags:
 *       - Tasks
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
 *         description: List of tasks for the project
 */

router.get(
    "/projects/:projectId/tasks",
    authMiddleware,
    getProjectTasks
);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task information
 */

router.get(
    "/tasks/:taskId",
    authMiddleware,
    getTaskById
);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Update authentication system
 *               description:
 *                 type: string
 *                 example: Refactor JWT logic
 *               status:
 *                 type: string
 *                 example: in-progress
 *               assignedTo:
 *                 type: string
 *                 example: 665f1c2b9a3c4d5e6f7a8b9c
 *     responses:
 *       200:
 *         description: Task updated successfully
 */

router.put(
    "/tasks/:taskId",
    authMiddleware,
    validate(updateTaskSchema),
    updateTask
);

/**
 * @swagger
 * /tasks/{taskId}/status:
 *   patch:
 *     summary: Update task status
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: done
 *     responses:
 *       200:
 *         description: Task status updated successfully
 */

router.patch(
    "/tasks/:taskId/status",
    authMiddleware,
    validate(updateTaskStatusSchema),
    updateTaskStatus
);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */

router.delete(
    "/tasks/:taskId",
    authMiddleware,
    deleteTask
);

export default router;