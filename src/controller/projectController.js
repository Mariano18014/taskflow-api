import ProjectService from "../service/projectService.js";

export const createProject = async (req, res, next) => {
    try {
        const project = await ProjectService.createProject(req.user.id, req.body);

        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
};

export const getProjects = async (req, res, next) => {
    try {
        const projects = await ProjectService.getProjects(req.user.id);

        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};

export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const project = await ProjectService.getProjectById(req.user.id, id);

        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        const project = await ProjectService.updateProject(
            req.user.id,
            id,
            req.body
        );

        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

export const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        await ProjectService.deleteProject(req.user.id, id);

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        next(error);
    }
};