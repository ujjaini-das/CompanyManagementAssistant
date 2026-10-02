const {
    getDashboardStatistics
} = require("../services/dashboardService");

const getDashboard = async (req, res) => {
    try {
        const statistics = await getDashboardStatistics();

        res.status(200).json(statistics);

    } catch (error) {
        console.error(
            "Dashboard controller error:",
            error.message
        );

        res.status(500).json({
            message: "Failed to get dashboard statistics",
            error: error.message
        });
    }
};

module.exports = {
    getDashboard
};