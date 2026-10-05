const mongoose = require("mongoose");

const Employee = require("../models/Employee");

const {
    getEmployeePerformance
} = require("../services/performanceService");

const getPerformance = async (req, res) => {
    try {
        const performance =
            await getEmployeePerformance();

        res.status(200).json({
            success: true,
            employees: performance
        });

    } catch (error) {
        console.error(
            "Performance controller error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to get employee performance",
            error: error.message
        });
    }
};

const getPerformanceByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(
                employeeId
            )
        ) {
            return res.status(400).json({
                message: "Invalid employee ID"
            });
        }

        const employee =
            await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const performance =
            await getEmployeePerformance();

        const employeePerformance =
            performance.find(
                (item) =>
                    item.employee === employee.name
            );

        if (!employeePerformance) {
            return res.status(404).json({
                message:
                    "Performance data not found"
            });
        }

        res.status(200).json({
            employee: employee.name,
            statistics: employeePerformance
        });

    } catch (error) {
        console.error(
            "Employee performance error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to get employee performance",
            error: error.message
        });
    }
};

module.exports = {
    getPerformance,
    getPerformanceByEmployee
};