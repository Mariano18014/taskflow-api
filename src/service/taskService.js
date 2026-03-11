import Task from "../model/Task.js";
import ProjectMember from "../model/ProjectMember.js";
import validateObjectId from "../utils/validateObjectId.js";

class TaskService {

    static async createTask(userId, projectId, data) {
        if (!validateObjectId(projectId)) {
            throw new Error("Invalid project ID");
        }

        const membership = await ProjectMember.findOne({
            userId,
            projectId
        });

        if (!membership) {
            throw new Error("User is not a member of this project");
        }

        const task = await Task.create({
            ...data,
            projectId,
            createdBy: userId
        });

        return task;
    }

    static async getProjectTasks(userId, projectId, filters) {
        if (!validateObjectId(projectId)) {
            throw new Error("Invalid project ID");
        }

        const membership = await ProjectMember.findOne({
            userId,
            projectId
        });

        if (!membership) {
            throw new Error("Access denied to project tasks");
        }

        const query = { projectId };

        if (filters.status) {
            query.status = filters.status;
        }

        if (filters.priority) {
            query.priority = filters.priority;
        }

        const tasks = await Task.find(query);

        return tasks;
    }

    static async getTaskById(userId, taskId) {
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

        return task;
    }

    static async updateTask(userId, taskId, data) {
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
            throw new Error("Access denied");
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            data,
            { new: true }
        );

        return updatedTask;
    }

    static async updateTaskStatus(userId, taskId, status) {
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
            throw new Error("Access denied");
        }

        task.status = status;

        await task.save();

        return task;
    }

    static async deleteTask(userId, taskId) {
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
            throw new Error("Access denied");
        }

        if (
        membership.role !== "owner" &&
        membership.role !== "admin" &&
        task.createdBy.toString() !== userId
        ) {
        throw new Error("Insufficient permissions to delete task");
        }

        await Task.findByIdAndDelete(taskId);

        return true;
    }
}

export default TaskService;