import mongoose from "mongoose";

const projectMemberSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "admin", "member"],
        default: "member",
        required: true,
    },
});

const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);

export default ProjectMember;