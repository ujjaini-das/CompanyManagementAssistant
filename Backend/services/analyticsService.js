const Task = require("../models/Task");
const Project = require("../models/Project");

const calculateProjectHealth = (
    completionRate,
    overdueTasks,
    blockedTasks
) => {
    if (
        completionRate >= 70 &&
        overdueTasks === 0 &&
        blockedTasks === 0
    ) {
        return "HEALTHY";
    }

    if (
        completionRate < 40 ||
        overdueTasks >= 3 ||
        blockedTasks >= 2
    ) {
        return "CRITICAL";
    }

    return "AT_RISK";
};

const getOverallAnalytics = async () => {
    const tasks = await Task.find();

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "COMPLETED"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "TODO"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "IN_PROGRESS"
    ).length;

    const blockedTasks = tasks.filter(
        (task) => task.status === "BLOCKED"
    ).length;

    const overdueTasks = tasks.filter(
        (task) =>
            new Date(task.deadline) < new Date() &&
            task.status !== "COMPLETED"
    ).length;

    const highPriorityTasks = tasks.filter(
        (task) =>
            task.priority === "HIGH" ||
            task.priority === "URGENT"
    ).length;

    const completionRate =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    return {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        blockedTasks,
        overdueTasks,
        highPriorityTasks,
        completionRate
    };
};

const getProjectAnalytics = async () => {
    const projects = await Project.find();

    const projectAnalytics = [];

    for (const project of projects) {
        const tasks = await Task.find({
            project: project._id
        });

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
            (task) => task.status === "COMPLETED"
        ).length;

        const pendingTasks = tasks.filter(
            (task) => task.status === "TODO"
        ).length;

        const inProgressTasks = tasks.filter(
            (task) => task.status === "IN_PROGRESS"
        ).length;

        const blockedTasks = tasks.filter(
            (task) => task.status === "BLOCKED"
        ).length;

        const overdueTasks = tasks.filter(
            (task) =>
                new Date(task.deadline) < new Date() &&
                task.status !== "COMPLETED"
        ).length;

        const completionRate =
            totalTasks === 0
                ? 0
                : Math.round((completedTasks / totalTasks) * 100);

        const health = calculateProjectHealth(
            completionRate,
            overdueTasks,
            blockedTasks
        );

        projectAnalytics.push({
            projectId: project._id.toString(),
            project: project.name,
            totalTasks,
            completedTasks,
            pendingTasks,
            inProgressTasks,
            blockedTasks,
            overdueTasks,
            completionRate,
            health
        });
    }

    return projectAnalytics;
};

module.exports = {
    getOverallAnalytics,
    getProjectAnalytics
};