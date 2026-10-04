const mongoose = require("mongoose");

const {
    getTaskActivities
} = require("../services/taskActivityService");

const getActivitiesForTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const activities =
            await getTaskActivities(taskId);

        res.status(200).json({
            success: true,
            activities
        });

    } catch (error) {
        console.error(
            "Get task activities error:",
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

module.exports = {
    getActivitiesForTask
};