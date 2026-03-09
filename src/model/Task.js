import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],
        default: "pending",
        required: true,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
        required: true,
    },
    dueDate: {
        type: Date,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;