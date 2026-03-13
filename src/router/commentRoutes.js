import { Router } from "express";
import { createComment, getTaskComments, updateComment, deleteComment } from "../controller/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlawares/validate.js";
import { createCommentSchema, updateCommentSchema } from "../validations/commentValidation.js";

const router = Router();

/**
 * @swagger
 * /tasks/{taskId}/comments:
 *   post:
 *     summary: Create a comment on a task
 *     tags:
 *       - Comments
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
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: This task needs review
 *     responses:
 *       201:
 *         description: Comment created successfully
 */

router.post(
    "/tasks/:taskId/comments",
    authMiddleware,
    validate(createCommentSchema),
    createComment
);


/**
 * @swagger
 * /tasks/{taskId}/comments:
 *   get:
 *     summary: Get all comments for a task
 *     tags:
 *       - Comments
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
 *         description: List of comments
 */

router.get(
    "/tasks/:taskId/comments",
    authMiddleware,
    getTaskComments
);

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 */

router.put(
    "/comments/:commentId",
    authMiddleware,
    validate(updateCommentSchema),
    updateComment
);

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */

router.delete(
    "/comments/:commentId",
    authMiddleware,
    deleteComment
);

export default router;