import { Router } from "express";

const router = Router();

router.post("/projects/:projectId/tasks", (req, res) => {
    res.json({
        message: `Create task in project ${req.params.projectId}`,
    });
});

router.get("/projects/:projectId/tasks", (req, res) => {
    res.json({
        message: `Get tasks for project ${req.params.projectId}`,
    });
});

router.get("/tasks/:taskId", (req, res) => {
    res.json({
        message: `Get task ${req.params.taskId}`,
    });
});

router.put("/tasks/:taskId", (req, res) => {
    res.json({
        message: `Update task ${req.params.taskId}`,
    });
});

router.patch("/tasks/:taskId/status", (req, res) => {
    res.json({
        message: `Update status for task ${req.params.taskId}`,
    });
});

router.delete("/tasks/:taskId", (req, res) => {
    res.json({
        message: `Delete task ${req.params.taskId}`,
    });
});

export default router;