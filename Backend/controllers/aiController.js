const mongoose = require("mongoose");
const Project = require("../models/Project");
const Task = require("../models/Task");
const { analyzeProject } = require("../services/aiService");

const analyzeProjectController = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }

        const project = await Project.findById(projectId)
            .populate("manager", "name email")
            .populate("members", "name email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const tasks = await Task.find({
            project: projectId
        }).populate(
            "assignedTo",
            "name email department position"
        );

        const projectData = {
            project: {
                name: project.name,
                description: project.description,
                manager: project.manager,
                members: project.members,
                startDate: project.startDate,
                deadline: project.deadline,
                status: project.status,
                priority: project.priority
            },

            tasks: tasks.map((task) => {
                const overdue =
                    new Date(task.deadline) < new Date() &&
                    task.status !== "COMPLETED";

                return {
                    title: task.title,
                    description: task.description,
                    assignedTo: task.assignedTo
                        ? task.assignedTo.name
                        : "Unassigned",
                    priority: task.priority,
                    status: task.status,
                    deadline: task.deadline,
                    overdue
                };
            })
        };

        const analysis = await analyzeProject(projectData);

        res.status(200).json({
            message: "Project analysis completed",
            analysis
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to analyze project",
            error: error.message
        });
    }
};

module.exports = {
    analyzeProjectController
};