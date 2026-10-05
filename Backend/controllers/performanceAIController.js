const {
    getEmployeePerformance
} = require("../services/performanceService");

const {
    generatePerformanceAnalysis
} = require("../services/performanceAIService");

const getPerformanceAIAnalysis = async (req, res) => {
    try {
        const performanceData =
            await getEmployeePerformance();

        const analysis =
            await generatePerformanceAnalysis(
                performanceData
            );

        res.status(200).json({
            message:
                "AI performance analysis generated successfully",
            analysis
        });

    } catch (error) {
        console.error(
            "Performance AI controller error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to generate AI performance analysis",
            error: error.message
        });
    }
};

module.exports = {
    getPerformanceAIAnalysis
};