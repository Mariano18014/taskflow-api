import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
    res.json({ message: "Register endpoint" });
});

router.post("/login", (req, res) => {
    res.json({ message: "Login endpoint" });
});

router.get("/me", (req, res) => {
    res.json({ message: "Get current user endpoint" });
});

export default router;