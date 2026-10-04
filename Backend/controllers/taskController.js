const mongoose = require("mongoose");
const Task = require("../models/Task");

const {
    createTaskActivity
} = require("../services/taskActivityService");

const {
    createTaskNotification
} = require("../services/notificationService");

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        await createTaskActivity(
            task._id,
            req.user.id,
            "TASK_CREATED"
        );

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create task",
            error: error.message
        });
    }
};


const getTasks = async (req, res) => {
    try {
        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        if (req.query.project) {
            filter.project = req.query.project;
        }

        if (req.query.assignedTo) {
            filter.assignedTo = req.query.assignedTo;
        }

        const tasks = await Task.find(filter)
            .populate("project", "name description")
            .populate("assignedTo", "name email department position");

        res.status(200).json({
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
};


const getTaskById = async (req, res) => {
    try {
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }
        
        const task = await Task.findById(req.params.id)
            .populate("project", "name description")
            .populate("assignedTo", "name email department position");

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch task",
            error: error.message
        });
    }
};


const updateTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const existingTask = await Task.findById(
            req.params.id
        );

        if (!existingTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const oldStatus = existingTask.status;
        const oldPriority = existingTask.priority;
        const oldDeadline = existingTask.deadline;
        const oldAssignedTo = existingTask.assignedTo;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (
            req.body.status &&
            req.body.status !== oldStatus
        ) {
            await createTaskActivity(
                task._id,
                req.user.id,
                req.body.status === "COMPLETED"
                    ? "TASK_COMPLETED"
                    : req.body.status === "BLOCKED"
                        ? "TASK_BLOCKED"
                        : "STATUS_CHANGED",
                oldStatus,
                req.body.status
            );
        }

        if (
            req.body.status === "BLOCKED" &&
            oldStatus !== "BLOCKED"
        ) {
            const project = await Task.findById(task._id)
                .populate({
                    path: "project",
                    select: "name manager"
                });

            if (project && project.project) {
                await createTaskNotification({
                    user: project.project.manager,
                    type: "TASK_BLOCKED",
                    title: "Blocked Task",
                    message: `${task.title} is currently blocked.`,
                    priority: "HIGH",
                    relatedTask: task._id,
                    relatedProject: project.project._id
                });
            }
        }

        if (
            req.body.priority &&
            req.body.priority !== oldPriority
        ) {
            await createTaskActivity(
                task._id,
                req.user.id,
                "PRIORITY_CHANGED",
                oldPriority,
                req.body.priority
            );
        }

        if (
            req.body.deadline &&
            new Date(req.body.deadline).getTime() !==
            new Date(oldDeadline).getTime()
        ) {
            await createTaskActivity(
                task._id,
                req.user.id,
                "DEADLINE_CHANGED",
                oldDeadline
                    ? new Date(oldDeadline).toISOString()
                    : null,
                new Date(req.body.deadline).toISOString()
            );
        }

        if (
            req.body.assignedTo &&
            String(req.body.assignedTo) !==
            String(oldAssignedTo)
        ) {
            await createTaskActivity(
                task._id,
                req.user.id,
                "TASK_ASSIGNED",
                oldAssignedTo
                    ? String(oldAssignedTo)
                    : null,
                String(req.body.assignedTo)
            );
        }

        res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        });
    }
};


const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const task = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};