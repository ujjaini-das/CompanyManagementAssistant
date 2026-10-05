const Employee = require("../models/Employee");
const Task = require("../models/Task");

const getEmployeePerformance = async () => {
    const employees = await Employee.find();

    const performanceData = [];

    for (const employee of employees) {
        const tasks = await Task.find({
            assignedTo: employee._id
        });

        const assignedTasks = tasks.length;

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
                (task.priority === "HIGH" ||
                    task.priority === "URGENT") &&
                task.status !== "COMPLETED"
        ).length;

        const completionRate =
            assignedTasks === 0
                ? 0
                : Math.round(
                    (completedTasks / assignedTasks) * 100
                );

        const activeTasks =
            tasks.filter(
                (task) => task.status !== "COMPLETED"
            ).length;

        let workload = "LOW";

        if (activeTasks >= 5) {
            workload = "HIGH";
        } else if (activeTasks >= 3) {
            workload = "MEDIUM";
        }

        performanceData.push({
            employee: employee.name,
            assignedTasks,
            completedTasks,
            pendingTasks,
            inProgressTasks,
            blockedTasks,
            overdueTasks,
            highPriorityTasks,
            completionRate,
            workload
        });
    }

    return performanceData;
};


module.exports = {
    getEmployeePerformance
};