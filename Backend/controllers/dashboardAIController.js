const Project = require("../models/Project");
const Task = require("../models/Task");

const {
    getDashboardStatistics
} = require("../services/dashboardService");

const {
    calculateWorkload
} = require("../services/workloadService");

const {
    generateDashboardAnalysis
} = require("../services/dashboardAIService");


const getDashboardAIAnalysis = async (req, res) => {
    try {

        const dashboardStatistics =
            await getDashboardStatistics();


        const workloadData =
            await calculateWorkload();


        const projects = await Project.find()
            .populate(
                "manager",
                "name email"
            )
            .populate(
                "members",
                "name email"
            );


        const tasks = await Task.find()
            .populate(
                "project",
                "name"
            )
            .populate(
                "assignedTo",
                "name email department position"
            );


        const projectData = projects.map(
            (project) => ({
                name: project.name,

                description:
                    project.description,

                manager: project.manager
                    ? project.manager.name
                    : "Unknown",

                members: project.members
                    ? project.members.map(
                        (member) => member.name
                    )
                    : [],

                startDate:
                    project.startDate,

                deadline:
                    project.deadline,

                status:
                    project.status,

                priority:
                    project.priority
            })
        );


        const taskData = tasks.map(
            (task) => ({
                title:
                    task.title,

                description:
                    task.description,

                project: task.project
                    ? task.project.name
                    : "Unknown",

                assignedTo:
                    task.assignedTo
                        ? task.assignedTo.name
                        : "Unassigned",

                priority:
                    task.priority,

                status:
                    task.status,

                deadline:
                    task.deadline,

                overdue:
                    new Date(task.deadline) <
                        new Date() &&
                    task.status !==
                        "COMPLETED"
            })
        );


        const analysis =
            await generateDashboardAnalysis(
                dashboardStatistics,
                workloadData,
                projectData,
                taskData
            );


        res.status(200).json({
            message:
                "AI dashboard analysis generated successfully",

            analysis
        });

    } catch (error) {

        console.error(
            "Dashboard AI controller error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to generate AI dashboard analysis",

            error: error.message
        });
    }
};


module.exports = {
    getDashboardAIAnalysis
};