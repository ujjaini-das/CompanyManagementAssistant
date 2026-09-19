const mongoose = require("mongoose");
const Employee = require("../models/Employee");

const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            message: "Employee created successfully",
            employee
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create employee",
            error: error.message
        });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        res.status(200).json({
            employees
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch employees",
            error: error.message
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid employee ID"
            });
        }

        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            employee
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch employee",
            error: error.message
        });
    }
};

const updateEmployee = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid employee ID"
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid employee ID"
            });
        }

        const employee = await Employee.findByIdAndDelete(
            req.params.id
        );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    }
};
module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};
   