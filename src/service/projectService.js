import Project from "../model/Project.js";
import ProjectMember from "../model/ProjectMember.js";
import validateObjectId from "../utils/validateObjectId.js";

class ProjectService {

    static async createProject(userId, data) {
        const { name, description } = data;

        const project = await Project.create({
            name,
            description,
            ownerId: userId
        });

        await ProjectMember.create({
            userId,
            projectId: project._id,
            role: "owner"
        });

        return project;
    }

    static async getProjects(userId) {
        const memberships = await ProjectMember.find({ userId });

        const projectIds = memberships.map(m => m.projectId);

        const projects = await Project.find({
            _id: { $in: projectIds }
        });

        return projects;
    }

    static async getProjectById(userId, projectId) {
        if (!validateObjectId(projectId)) {
            throw new Error("Invalid project ID");
        }

        const membership = await ProjectMember.findOne({
            userId,
            projectId
        });

        if (!membership) {
            throw new Error("Access denied to this project");
        }

        const project = await Project.findById(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        return project;
    }

    static async updateProject(userId, projectId, data) {
        if (!validateObjectId(projectId)) {
            throw new Error("Invalid project ID");
        }

        const membership = await ProjectMember.findOne({
            userId,
            projectId
        });

        if (!membership) {
            throw new Error("Access denied to this project");
        }

        if (membership.role !== "owner" && membership.role !== "admin") {
            throw new Error("Insufficient permissions to update project");
        }

        const project = await Project.findByIdAndUpdate(
            projectId,
            data,
            { new: true }
        );

        if (!project) {
            throw new Error("Project not found");
        }

        return project;
    }

    static async deleteProject(userId, projectId) {
        if (!validateObjectId(projectId)) {
            throw new Error("Invalid project ID");
        }

        const membership = await ProjectMember.findOne({
            userId,
            projectId
        });

        if (!membership) {
            throw new Error("Access denied to this project");
        }

        if (membership.role !== "owner") {
            throw new Error("Only the owner can delete this project");
        }

        const project = await Project.findByIdAndDelete(projectId);

        if (!project) {
            throw new Error("Project not found");
        }

        await ProjectMember.deleteMany({ projectId });

        return true;
    }
}

export default ProjectService;