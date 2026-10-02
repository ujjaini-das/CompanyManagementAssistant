const Notification = require("../models/Notification");
const Task = require("../models/Task");

const createNotificationIfNotExists = async ({
    user,
    type,
    title,
    message,
    priority,
    relatedTask,
    relatedProject
}) => {
    if (!user) {
        return null;
    }

    const existingNotification =
        await Notification.findOne({
            user,
            type,
            relatedTask: relatedTask || null,
            relatedProject: relatedProject || null,
            isRead: false
        });

    if (existingNotification) {
        return null;
    }

    const notification =
        await Notification.create({
            user,
            type,
            title,
            message,
            priority,
            relatedTask: relatedTask || null,
            relatedProject: relatedProject || null
        });

    return notification;
};


const generateNotifications = async () => {
    const now = new Date();

    const twoDaysFromNow = new Date(
        now.getTime() + 2 * 24 * 60 * 60 * 1000
    );

    const tasks = await Task.find()
        .populate({
            path: "project",
            select: "name manager",
            populate: {
                path: "manager",
                select: "name email"
            }
        })
        .populate(
            "assignedTo",
            "name email department position"
        );

        console.log(
            "NOTIFICATION TASKS:",
            JSON.stringify(tasks, null, 2)
        );

    const createdNotifications = [];

    for (const task of tasks) {
        const manager = task.project?.manager;

        if (!manager) {
            continue;
        }

        const projectName =
            task.project?.name || "Unknown Project";


        if (
            new Date(task.deadline) < now &&
            task.status !== "COMPLETED"
        ) {
            const notification =
                await createNotificationIfNotExists({
                    user: manager._id,
                    type: "TASK_OVERDUE",
                    title: "Task Overdue",
                    message: `${task.title} is overdue.`,
                    priority: "HIGH",
                    relatedTask: task._id,
                    relatedProject: task.project?._id
                });

            if (notification) {
                createdNotifications.push(
                    notification
                );
            }
        }


        if (
            new Date(task.deadline) >= now &&
            new Date(task.deadline) <= twoDaysFromNow &&
            task.status !== "COMPLETED"
        ) {
            const notification =
                await createNotificationIfNotExists({
                    user: manager._id,
                    type: "DEADLINE_APPROACHING",
                    title: "Deadline Approaching",
                    message: `${task.title} is due within the next 2 days.`,
                    priority: "MEDIUM",
                    relatedTask: task._id,
                    relatedProject: task.project?._id
                });

            if (notification) {
                createdNotifications.push(
                    notification
                );
            }
        }


        if (task.status === "BLOCKED") {
            const notification =
                await createNotificationIfNotExists({
                    user: manager._id,
                    type: "TASK_BLOCKED",
                    title: "Blocked Task",
                    message: `${task.title} is currently blocked.`,
                    priority: "HIGH",
                    relatedTask: task._id,
                    relatedProject: task.project?._id
                });

            if (notification) {
                createdNotifications.push(
                    notification
                );
            }
        }


        const isUrgent =
            task.priority === "URGENT";

        const isHighPriority =
            task.priority === "HIGH";

        const deadlineApproaching =
            new Date(task.deadline) >= now &&
            new Date(task.deadline) <= twoDaysFromNow;

        const shouldCreateHighPriorityAlert =
            (isHighPriority && deadlineApproaching) ||
            (isUrgent && task.status !== "COMPLETED");


        if (shouldCreateHighPriorityAlert) {
            const notification =
                await createNotificationIfNotExists({
                    user: manager._id,
                    type: "HIGH_PRIORITY",
                    title: "High Priority Task",
                    message: `${task.title} requires attention.`,
                    priority: isUrgent
                        ? "URGENT"
                        : "HIGH",
                    relatedTask: task._id,
                    relatedProject: task.project?._id
                });

            if (notification) {
                createdNotifications.push(
                    notification
                );
            }
        }
    }

    return createdNotifications;
};


module.exports = {
    generateNotifications
};