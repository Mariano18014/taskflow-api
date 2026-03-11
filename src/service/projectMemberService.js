import ProjectMember from "../model/ProjectMember.js";
import { validateObjectId } from "../utils/validateObjectId.js";

class ProjectMemberService {

    static async addProjectMember(requestUserId, projectId, data) {
        const { userId, role } = data;

        if (!validateObjectId(projectId) || !validateObjectId(userId)) {
            throw new Error("Invalid ID");
        }

        const membership = await ProjectMember.findOne({
            userId: requestUserId,
            projectId
        });

        if (!membership) {
            throw new Error("Access denied to this project");
        }

        if (membership.role !== "owner" && membership.role !== "admin") {
            throw new Error("Insufficient permissions to add members");
        }

        const existingMember = await ProjectMember.findOne({
            userId,
            projectId
        });

        if (existingMember) {
            throw new Error("User is already a member of this project");
        }

        const newMember = await ProjectMember.create({
            userId,
            projectId,
            role: role || "member"
        });

        return newMember;
    }

    static async getProjectMembers(requestUserId, projectId) {
        if (!validateObjectId(projectId)) {
            throw new Error("Invalid project ID");
        }

        const membership = await ProjectMember.findOne({
            userId: requestUserId,
            projectId
        });

        if (!membership) {
            throw new Error("Access denied to this project");
        }

        const members = await ProjectMember.find({ projectId });

        return members;
    }

    static async updateProjectMemberRole(requestUserId, projectId, targetUserId, role) {
        if (!validateObjectId(projectId) || !validateObjectId(targetUserId)) {
            throw new Error("Invalid ID");
        }

        const requesterMembership = await ProjectMember.findOne({
            userId: requestUserId,
            projectId
        });

        if (!requesterMembership) {
            throw new Error("Access denied to this project");
        }

        if (requesterMembership.role !== "owner") {
            throw new Error("Only owner can modify member roles");
        }

        const member = await ProjectMember.findOneAndUpdate(
            { userId: targetUserId, projectId },
            { role },
            { new: true }
        );

        if (!member) {
            throw new Error("Member not found in this project");
        }

        return member;
    }

    static async removeProjectMember(requestUserId, projectId, targetUserId) {
        if (!validateObjectId(projectId) || !validateObjectId(targetUserId)) {
            throw new Error("Invalid ID");
        }

        const requesterMembership = await ProjectMember.findOne({
            userId: requestUserId,
            projectId
        });

        if (!requesterMembership) {
            throw new Error("Access denied to this project");
        }

        const isSelfRemoval = requestUserId === targetUserId;

        if (
        !isSelfRemoval &&
        requesterMembership.role !== "owner" &&
        requesterMembership.role !== "admin"
        ) {
        throw new Error("Insufficient permissions to remove member");
        }

        const member = await ProjectMember.findOneAndDelete({
            userId: targetUserId,
            projectId
        });

        if (!member) {
            throw new Error("Member not found");
        }

        return true;
    }
}

export default ProjectMemberService;