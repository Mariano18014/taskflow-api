import { Router } from "express";
import { register, login, me } from "../controller/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  authMiddleware,
  me
);

export default router;