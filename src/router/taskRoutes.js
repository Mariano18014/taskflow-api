import { Router } from "express";
import { createTask, getProjectTasks, getTaskById, updateTask, updateTaskStatus, deleteTask } from "../controller/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { createTaskSchema, updateTaskSchema, updateTaskStatusSchema } from "../validations/taskValidation.js";

const router = Router();

router.post(
    "/projects/:projectId/tasks",
    authMiddleware,
    validate(createTaskSchema),
    createTask
);

router.get(
    "/projects/:projectId/tasks",
    authMiddleware,
    getProjectTasks
);

router.get(
    "/tasks/:taskId",
    authMiddleware,
    getTaskById
);

router.put(
    "/tasks/:taskId",
    authMiddleware,
    validate(updateTaskSchema),
    updateTask
);

router.patch(
    "/tasks/:taskId/status",
    authMiddleware,
    validate(updateTaskStatusSchema),
    updateTaskStatus
);

router.delete(
    "/tasks/:taskId",
    authMiddleware,
    deleteTask
);

export default router;