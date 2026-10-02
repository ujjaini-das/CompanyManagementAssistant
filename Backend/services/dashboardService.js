const Employee = require("../models/Employee");
const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardStatistics = async () => {
    const totalEmployees = await Employee.countDocuments();

    const activeEmployees = await Employee.countDocuments({
        status: "active"
    });


    const totalProjects = await Project.countDocuments();

    const activeProjects = await Project.countDocuments({
        status: "active"
    });

    const completedProjects = await Project.countDocuments({
        status: "completed"
    });


    const totalTasks = await Task.countDocuments();

    const todoTasks = await Task.countDocuments({
        status: "TODO"
    });

    const inProgressTasks = await Task.countDocuments({
        status: "IN_PROGRESS"
    });

    const completedTasks = await Task.countDocuments({
        status: "COMPLETED"
    });

    const blockedTasks = await Task.countDocuments({
        status: "BLOCKED"
    });

    const overdueTasks = await Task.countDocuments({
        deadline: {
            $lt: new Date()
        },
        status: {
            $ne: "COMPLETED"
        }
    });

    const highPriorityTasks = await Task.countDocuments({
        priority: "HIGH"
    });


    return {
        employees: {
            total: totalEmployees,
            active: activeEmployees
        },

        projects: {
            total: totalProjects,
            active: activeProjects,
            completed: completedProjects
        },

        tasks: {
            total: totalTasks,
            todo: todoTasks,
            inProgress: inProgressTasks,
            completed: completedTasks,
            blocked: blockedTasks,
            overdue: overdueTasks,
            highPriority: highPriorityTasks
        }
    };
};

module.exports = {
    getDashboardStatistics
};