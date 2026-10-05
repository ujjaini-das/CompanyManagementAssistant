const {
    getOverallAnalytics,
    getProjectAnalytics
} = require("../services/analyticsService");

const {
    generateAnalyticsAnalysis
} = require("../services/analyticsAIService");

const getAIAnalytics = async (req, res) => {
    try {
        const overview = await getOverallAnalytics();
        const projects = await getProjectAnalytics();

        const analyticsData = {
            overview,
            projects
        };

        const analysis = await generateAnalyticsAnalysis(
            analyticsData
        );

        res.status(200).json({
            success: true,
            analysis
        });
    } catch (error) {
        console.error(
            "AI analytics controller error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to generate AI analytics",
            error: error.message
        });
    }
};

module.exports = {
    getAIAnalytics
};