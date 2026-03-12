import { Router } from "express";
import { createComment, getTaskComments, updateComment, deleteComment } from "../controller/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlawares/validate.js";
import { createCommentSchema, updateCommentSchema } from "../validations/commentValidation.js";

const router = Router();

router.post(
    "/tasks/:taskId/comments",
    authMiddleware,
    validate(createCommentSchema),
    createComment
);

router.get(
    "/tasks/:taskId/comments",
    authMiddleware,
    getTaskComments
);

router.put(
    "/comments/:commentId",
    authMiddleware,
    validate(updateCommentSchema),
    updateComment
);

router.delete(
    "/comments/:commentId",
    authMiddleware,
    deleteComment
);

export default router;