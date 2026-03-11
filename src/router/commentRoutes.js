import { Router } from "express";
import { createComment, getTaskComments, updateComment, deleteComment } from "../controller/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/tasks/:taskId/comments", authMiddleware, createComment);

router.get("/tasks/:taskId/comments", authMiddleware, getTaskComments);

router.put("/comments/:commentId", authMiddleware, updateComment);

router.delete("/comments/:commentId", authMiddleware, deleteComment);

export default router;