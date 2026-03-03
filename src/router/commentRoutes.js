import { Router } from "express";

const router = Router();

router.post("/tasks/:taskId/comments", (req, res) => {
    res.json({
        message: `Create comment for task ${req.params.taskId}`,
    });
});

router.get("/tasks/:taskId/comments", (req, res) => {
    res.json({
        message: `Get comments for task ${req.params.taskId}`,
    });
});

router.put("/comments/:commentId", (req, res) => {
    res.json({
        message: `Update comment ${req.params.commentId}`,
    });
});

router.delete("/comments/:commentId", (req, res) => {
    res.json({
        message: `Delete comment ${req.params.commentId}`,
    });
});

export default router;