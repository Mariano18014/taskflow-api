import Comment from "../model/Comment.js";
import Task from "../model/Task.js";
import ProjectMember from "../model/ProjectMember.js";
import { validateObjectId } from "../utils/validateObjectId.js";

class CommentService {

    static async createComment(userId, taskId, data) {
        if (!validateObjectId(taskId)) {
            throw new Error("Invalid task ID");
        }

        const task = await Task.findById(taskId);

        if (!task) {
            throw new Error("Task not found");
        }

        const membership = await ProjectMember.findOne({
            userId,
            projectId: task.projectId
        });

        if (!membership) {
            throw new Error("Access denied to this task");
        }

        const comment = await Comment.create({
            content: data.content,
            taskId,
            userId
        });

        return comment;
    }

    static async getTaskComments(userId, taskId) {
        if (!validateObjectId(taskId)) {
            throw new Error("Invalid task ID");
        }

        const task = await Task.findById(taskId);

        if (!task) {
            throw new Error("Task not found");
        }

        const membership = await ProjectMember.findOne({
            userId,
            projectId: task.projectId
        });

        if (!membership) {
            throw new Error("Access denied to this task");
        }

        const comments = await Comment.find({ taskId });

        return comments;
    }

    static async updateComment(userId, commentId, content) {
        if (!validateObjectId(commentId)) {
            throw new Error("Invalid comment ID");
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error("Comment not found");
        }

        if (comment.userId.toString() !== userId) {
            throw new Error("Only the author can update this comment");
        }

        comment.content = content;

        await comment.save();

        return comment;
    }

    static async deleteComment(userId, commentId) {
        if (!validateObjectId(commentId)) {
            throw new Error("Invalid comment ID");
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error("Comment not found");
        }

        const task = await Task.findById(comment.taskId);

        if (!task) {
            throw new Error("Task not found");
        }

        const membership = await ProjectMember.findOne({
            userId,
            projectId: task.projectId
        });

        if (!membership) {
            throw new Error("Access denied");
        }

        const isAuthor = comment.userId.toString() === userId;
        const isAdmin = membership.role === "admin";
        const isOwner = membership.role === "owner";

        if (!isAuthor && !isAdmin && !isOwner) {
            throw new Error("Insufficient permissions to delete comment");
        }

        await Comment.findByIdAndDelete(commentId);

        return true;
    }
}

export default CommentService;