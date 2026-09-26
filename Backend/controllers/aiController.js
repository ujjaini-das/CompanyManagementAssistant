const mongoose = require("mongoose");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Employee = require("../models/Employee");
const { analyzeProject } = require("../services/aiService");
const { chatWithAssistant } = require("../services/chatService");

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

const chatWithAssistantController = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        const employees = await Employee.find()
            .select("name email department position role status");

        const projects = await Project.find()
            .populate("manager", "name email")
            .populate("members", "name email");

        const tasks = await Task.find()
            .populate("project", "name")
            .populate("assignedTo", "name email department position");

        const companyData = {
            employees: employees.map((employee) => ({
                name: employee.name,
                email: employee.email,
                department: employee.department,
                position: employee.position,
                role: employee.role,
                status: employee.status
            })),

            projects: projects.map((project) => ({
                name: project.name,
                description: project.description,
                manager: project.manager
                    ? project.manager.name
                    : "Unknown",
                members: project.members
                    ? project.members.map((member) => member.name)
                    : [],
                startDate: project.startDate,
                deadline: project.deadline,
                status: project.status,
                priority: project.priority
            })),

            tasks: tasks.map((task) => ({
                title: task.title,
                description: task.description,

                project: task.project
                    ? task.project.name
                    : "Unknown",

                assignedTo: task.assignedTo
                    ? task.assignedTo.name
                    : "Unassigned",

                priority: task.priority,
                status: task.status,
                deadline: task.deadline,

                overdue:
                    new Date(task.deadline) < new Date() &&
                    task.status !== "COMPLETED"
            }))
        };

        const answer = await chatWithAssistant(
            question,
            companyData
        );

        res.status(200).json({
            message: "Chat response generated successfully",
            answer
        });

    } catch (error) {
        console.error("Chat controller error:", error.message);

        res.status(500).json({
            message: "Failed to generate chat response",
            error: error.message
        });
    }
};

module.exports = {
    analyzeProjectController,
    chatWithAssistantController
};