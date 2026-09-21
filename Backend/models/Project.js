const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        startDate: {
            type: Date,
            required: true
        },

        deadline: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["planning", "active", "completed", "on-hold"],
            default: "planning"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Project", projectSchema);