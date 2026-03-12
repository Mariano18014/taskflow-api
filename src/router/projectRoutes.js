import { Router } from "express";
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from "../controller/projectController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { createProjectSchema, updateProjectSchema } from "../validations/projectValidation.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    validate(createProjectSchema),
    createProject
);

router.get(
    "/",
    authMiddleware,
    getProjects
);

router.get(
    "/:id",
    authMiddleware,
    getProjectById
);

router.put(
    "/:id",
    authMiddleware,
    validate(updateProjectSchema),
    updateProject
);

router.delete(
    "/:id",
    authMiddleware,
    deleteProject
);

export default router;