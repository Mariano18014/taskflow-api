import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    res.json({ message: "Create project endpoint" });
});

router.get("/", (req, res) => {
    res.json({ message: "Get all projects endpoint" });
});

router.get("/:id", (req, res) => {
    res.json({ message: `Get project with id ${req.params.id}` });
});

router.put("/:id", (req, res) => {
    res.json({ message: `Update project with id ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
    res.json({ message: `Delete project with id ${req.params.id}` });
});

export default router;