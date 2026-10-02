const Task = require("../models/Task");

const {
    calculateWorkload
} = require("../services/workloadService");

const {
    generateAlertAnalysis
} = require("../services/alertAIService");

const getAIAlerts = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate(
                "project",
                "name"
            )
            .populate(
                "assignedTo",
                "name email department position"
            );

        const now = new Date();

        const twoDaysFromNow = new Date(
            now.getTime() + 2 * 24 * 60 * 60 * 1000
        );

        const alerts = [];

        for (const task of tasks) {

            const overdue =
                new Date(task.deadline) < now &&
                task.status !== "COMPLETED";

            const blocked =
                task.status === "BLOCKED";

            const deadlineApproaching =
                new Date(task.deadline) >= now &&
                new Date(task.deadline) <= twoDaysFromNow &&
                task.status !== "COMPLETED";

            const urgent =
                task.priority === "URGENT";

            const highPriority =
                task.priority === "HIGH";

            if (overdue) {
                alerts.push({
                    type: "TASK_OVERDUE",
                    priority: urgent
                        ? "URGENT"
                        : "HIGH",
                    title: "Task Overdue",
                    message: `${task.title} is overdue.`,
                    task: task.title,
                    project: task.project
                        ? task.project.name
                        : "Unknown",
                    assignedTo: task.assignedTo
                        ? task.assignedTo.name
                        : "Unassigned",
                    status: task.status,
                    deadline: task.deadline
                });
            }

            if (blocked) {
                alerts.push({
                    type: "TASK_BLOCKED",
                    priority: "HIGH",
                    title: "Blocked Task",
                    message: `${task.title} is currently blocked.`,
                    task: task.title,
                    project: task.project
                        ? task.project.name
                        : "Unknown",
                    assignedTo: task.assignedTo
                        ? task.assignedTo.name
                        : "Unassigned",
                    status: task.status,
                    deadline: task.deadline
                });
            }

            if (deadlineApproaching) {
                alerts.push({
                    type: "DEADLINE_APPROACHING",
                    priority: "MEDIUM",
                    title: "Deadline Approaching",
                    message: `${task.title} is due within the next 2 days.`,
                    task: task.title,
                    project: task.project
                        ? task.project.name
                        : "Unknown",
                    assignedTo: task.assignedTo
                        ? task.assignedTo.name
                        : "Unassigned",
                    status: task.status,
                    deadline: task.deadline
                });
            }

            if (
                (highPriority && deadlineApproaching) ||
                (urgent && task.status !== "COMPLETED")
            ) {
                alerts.push({
                    type: "HIGH_PRIORITY",
                    priority: urgent
                        ? "URGENT"
                        : "HIGH",
                    title: "High Priority Task",
                    message: `${task.title} requires attention.`,
                    task: task.title,
                    project: task.project
                        ? task.project.name
                        : "Unknown",
                    assignedTo: task.assignedTo
                        ? task.assignedTo.name
                        : "Unassigned",
                    status: task.status,
                    deadline: task.deadline
                });
            }
        }

        const workloadData =
            await calculateWorkload();

        const workloadAlerts =
            workloadData.filter(
                (employee) =>
                    employee.workloadLevel === "HIGH"
            );

        for (const employee of workloadAlerts) {
            alerts.push({
                type: "WORKLOAD_ALERT",
                priority: "HIGH",
                title: "High Employee Workload",
                message: `${employee.employee} has a high workload.`,
                employee: employee.employee,
                totalTasks: employee.totalTasks,
                activeTasks: employee.activeTasks,
                overdueTasks: employee.overdueTasks,
                highPriorityTasks:
                    employee.highPriorityTasks,
                workloadLevel:
                    employee.workloadLevel
            });
        }

        const analysis =
            await generateAlertAnalysis(alerts);

        res.status(200).json({
            message:
                "AI alert analysis generated successfully",
            alerts,
            analysis
        });

    } catch (error) {
        console.error(
            "AI alert controller error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to generate AI alert analysis",
            error: error.message
        });
    }
};

module.exports = {
    getAIAlerts
};