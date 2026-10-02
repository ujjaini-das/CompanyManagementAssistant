const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            enum: [
                "TASK_OVERDUE",
                "DEADLINE_APPROACHING",
                "TASK_BLOCKED",
                "HIGH_PRIORITY",
                "WORKLOAD_ALERT",
                "AI_ALERT"
            ],
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        priority: {
            type: String,
            enum: [
                "LOW",
                "MEDIUM",
                "HIGH",
                "URGENT"
            ],
            default: "MEDIUM"
        },

        relatedTask: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            default: null
        },

        relatedProject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            default: null
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);