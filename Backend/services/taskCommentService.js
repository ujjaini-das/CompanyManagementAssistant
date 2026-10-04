const TaskComment = require("../models/TaskComment");
const Task = require("../models/Task");

const createComment = async (taskId, userId, comment) => {
    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    if (!comment || !comment.trim()) {
        throw new Error("Comment is required");
    }

    const taskComment = await TaskComment.create({
        task: taskId,
        user: userId,
        comment: comment.trim()
    });

    return taskComment;
};

const getCommentsForTask = async (taskId) => {
    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    const comments = await TaskComment.find({
        task: taskId
    })
        .populate("user", "name email role")
        .sort({
            createdAt: 1
        });

    return comments;
};

const updateComment = async (
    commentId,
    userId,
    comment
) => {
    if (!comment || !comment.trim()) {
        throw new Error("Comment is required");
    }

    const existingComment =
        await TaskComment.findOne({
            _id: commentId,
            user: userId
        });

    if (!existingComment) {
        throw new Error(
            "Comment not found or you are not allowed to modify it"
        );
    }

    existingComment.comment = comment.trim();

    await existingComment.save();

    return existingComment;
};

const deleteComment = async (
    commentId,
    userId
) => {
    const comment =
        await TaskComment.findOneAndDelete({
            _id: commentId,
            user: userId
        });

    if (!comment) {
        throw new Error(
            "Comment not found or you are not allowed to delete it"
        );
    }

    return comment;
};

module.exports = {
    createComment,
    getCommentsForTask,
    updateComment,
    deleteComment
};