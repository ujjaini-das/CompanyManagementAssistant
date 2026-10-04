const mongoose = require("mongoose");

const {
    createComment,
    getCommentsForTask,
    updateComment,
    deleteComment
} = require("../services/taskCommentService");

const {
    createTaskActivity
} = require("../services/taskActivityService");

const createTaskComment = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const newComment = await createComment(
            taskId,
            req.user.id,
            comment
        );

        await createTaskActivity(
            taskId,
            req.user.id,
            "COMMENT_ADDED",
            null,
            comment.trim()
        );

        res.status(201).json({
            success: true,
            comment: newComment
        });

    } catch (error) {
        console.error(
            "Create comment error:",
            error.message
        );

        const statusCode =
            error.message === "Task not found"
                ? 404
                : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const getTaskComments = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const comments =
            await getCommentsForTask(taskId);

        res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {
        console.error(
            "Get comments error:",
            error.message
        );

        const statusCode =
            error.message === "Task not found"
                ? 404
                : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const updateTaskComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        const updatedComment =
            await updateComment(
                commentId,
                req.user.id,
                comment
            );

        res.status(200).json({
            success: true,
            comment: updatedComment
        });

    } catch (error) {
        console.error(
            "Update comment error:",
            error.message
        );

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTaskComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                message: "Invalid comment ID"
            });
        }

        await deleteComment(
            commentId,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error(
            "Delete comment error:",
            error.message
        );

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createTaskComment,
    getTaskComments,
    updateTaskComment,
    deleteTaskComment
};