const mongoose = require("mongoose");

const taskActivitySchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        action: {
            type: String,
            enum: [
                "TASK_CREATED",
                "STATUS_CHANGED",
                "PRIORITY_CHANGED",
                "DEADLINE_CHANGED",
                "TASK_ASSIGNED",
                "TASK_COMPLETED",
                "TASK_BLOCKED",
                "COMMENT_ADDED"
            ],
            required: true
        },

        oldValue: {
            type: String,
            default: null
        },

        newValue: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "TaskActivity",
    taskActivitySchema
);