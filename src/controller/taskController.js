import TaskService from "../service/taskService.js";

export const createTask = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const task = await TaskService.createTask(
            req.user.id,
            projectId,
            req.body
        );

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

export const getProjectTasks = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const tasks = await TaskService.getProjectTasks(
            req.user.id,
            projectId,
            req.query
        );

        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await TaskService.getTaskById(
            req.user.id,
            taskId
        );

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await TaskService.updateTask(
            req.user.id,
            taskId,
            req.body
        );

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const updateTaskStatus = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await TaskService.updateTaskStatus(
            req.user.id,
            taskId,
            req.body.status
        );

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        await TaskService.deleteTask(
            req.user.id,
            taskId
        );

        res.status(200).json({
        message: "Task deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};