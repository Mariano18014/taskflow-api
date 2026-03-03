import { Router } from "express";

const router = Router();

router.post("/:projectId/members", (req, res) => {
    res.json({
        message: `Add member to project ${req.params.projectId}`,
    });
});

router.get("/:projectId/members", (req, res) => {
    res.json({
        message: `Get members of project ${req.params.projectId}`,
    });
});

router.put("/:projectId/members/:userId", (req, res) => {
    res.json({
        message: `Update member ${req.params.userId} in project ${req.params.projectId}`,
    });
});

router.delete("/:projectId/members/:userId", (req, res) => {
    res.json({
        message: `Remove member ${req.params.userId} from project ${req.params.projectId}`,
    });
});

export default router;