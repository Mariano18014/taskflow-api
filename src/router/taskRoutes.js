import { Router } from "express";
import { createTask, getProjectTasks, getTaskById, updateTask, updateTaskStatus, deleteTask } from "../controller/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/projects/:projectId/tasks", authMiddleware, createTask);

router.get("/projects/:projectId/tasks", authMiddleware, getProjectTasks);

router.get("/tasks/:taskId", authMiddleware, getTaskById);

router.put("/tasks/:taskId", authMiddleware, updateTask);

router.patch("/tasks/:taskId/status", authMiddleware, updateTaskStatus);

router.delete("/tasks/:taskId", authMiddleware, deleteTask);

export default router;