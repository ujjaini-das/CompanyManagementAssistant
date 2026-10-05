const mongoose = require("mongoose");

const {
    getOverallAnalytics,
    getProjectAnalytics
} = require("../services/analyticsService");

const getAnalytics = async (req, res) => {
    try {
        const overview = await getOverallAnalytics();
        const projects = await getProjectAnalytics();

        res.status(200).json({
            success: true,
            overview,
            projects
        });
    } catch (error) {
        console.error("Analytics controller error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to get analytics",
            error: error.message
        });
    }
};

const getProjectAnalyticsById = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID"
            });
        }

        const projects = await getProjectAnalytics();

        const project = projects.find(
            (item) => item.projectId === projectId
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project analytics not found"
            });
        }

        res.status(200).json({
            success: true,
            project
        });
    } catch (error) {
        console.error(
            "Project analytics controller error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to get project analytics",
            error: error.message
        });
    }
};

module.exports = {
    getAnalytics,
    getProjectAnalyticsById
};