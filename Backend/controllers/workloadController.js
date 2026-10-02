const { calculateWorkload } = require("../services/workloadService");

const getWorkload = async (req, res) => {
    try {
        const employees = await calculateWorkload();

        res.status(200).json({
            success: true,
            employees
        });
    } catch (error) {
        console.error("Workload controller error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to calculate employee workload",
            error: error.message
        });
    }
};

module.exports = {
    getWorkload
};