import ProjectMemberService from "../service/projectService.js";

export const addProjectMember = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const member = await ProjectMemberService.addProjectMember(
            req.user.id,
            projectId,
            req.body
        );

        res.status(201).json(member);
    } catch (error) {
        next(error);
    }
};

export const getProjectMembers = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const members = await ProjectMemberService.getProjectMembers(
            req.user.id,
            projectId
        );

        res.status(200).json(members);
    } catch (error) {
        next(error);
    }
};

export const updateProjectMemberRole = async (req, res, next) => {
    try {
        const { projectId, userId } = req.params;

        const member = await ProjectMemberService.updateProjectMemberRole(
            req.user.id,
            projectId,
            userId,
            req.body.role
        );

        res.status(200).json(member);
    } catch (error) {
        next(error);
    }
};

export const removeProjectMember = async (req, res, next) => {
    try {
        const { projectId, userId } = req.params;

        await ProjectMemberService.removeProjectMember(
            req.user.id,
            projectId,
            userId
        );

        res.status(200).json({
            message: "Member removed from project successfully",
        });
    } catch (error) {
        next(error);
    }
};