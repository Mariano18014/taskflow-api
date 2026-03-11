import CommentService from "../service/commentService.js";

export const createComment = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const comment = await CommentService.createComment(
            req.user.id,
            taskId,
            req.body
        );

        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

export const getTaskComments = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const comments = await CommentService.getTaskComments(
            req.user.id,
            taskId
        );

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const comment = await CommentService.updateComment(
            req.user.id,
            commentId,
            req.body.content
        );

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        await CommentService.deleteComment(
            req.user.id,
            commentId
        );

        res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};