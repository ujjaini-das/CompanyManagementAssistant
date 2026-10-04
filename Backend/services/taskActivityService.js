const TaskActivity = require("../models/TaskActivity");
const Task = require("../models/Task");

const createTaskActivity = async (
    taskId,
    userId,
    action,
    oldValue = null,
    newValue = null
) => {
    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    const activity = await TaskActivity.create({
        task: taskId,
        user: userId,
        action,
        oldValue,
        newValue
    });

    return activity;
};

const getTaskActivities = async (taskId) => {
    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    const activities = await TaskActivity.find({
        task: taskId
    })
        .populate(
            "user",
            "name email role"
        )
        .sort({
            createdAt: 1
        });

    return activities;
};

module.exports = {
    createTaskActivity,
    getTaskActivities
};