const Employee = require("../models/Employee");
const Task = require("../models/Task");

const calculateWorkload = async () => {
    const employees = await Employee.find();

    const workloadData = [];

    for (const employee of employees) {
        const tasks = await Task.find({
            assignedTo: employee._id
        });

        const totalTasks = tasks.length;

        const activeTasks = tasks.filter(
            (task) => task.status !== "COMPLETED"
        ).length;

        const highPriorityTasks = tasks.filter(
            (task) =>
                task.priority === "HIGH" &&
                task.status !== "COMPLETED"
        ).length;

        const overdueTasks = tasks.filter(
            (task) =>
                new Date(task.deadline) < new Date() &&
                task.status !== "COMPLETED"
        ).length;

        // Our current Task model does not have a BLOCKED status.
        // Therefore, blocked tasks are 0 for now.
        const blockedTasks = 0;

        let workloadLevel = "LOW";

        if (activeTasks >= 5) {
            workloadLevel = "HIGH";
        } else if (activeTasks >= 3) {
            workloadLevel = "MEDIUM";
        }

        workloadData.push({
            employee: employee.name,
            totalTasks,
            activeTasks,
            highPriorityTasks,
            overdueTasks,
            blockedTasks,
            workloadLevel
        });
    }

    return workloadData;
};

module.exports = {
    calculateWorkload
};