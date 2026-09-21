const mongoose = require("mongoose");
const Project = require("../models/Project");

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create project",
            error: error.message
        });
    }
};


const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("manager", "name email")
            .populate("members", "name email");

        res.status(200).json({
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message
        });
    }
};


const getProjectById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }
        const project = await Project.findById(req.params.id)
            .populate("manager", "name email")
            .populate("members", "name email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch project",
            error: error.message
        });
    }
};


const updateProject = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update project",
            error: error.message
        });
    }
};


const deleteProject = async (req, res) => {
    try {

         if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid project ID"
            });
        }
        
        const project = await Project.findByIdAndDelete(
            req.params.id
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete project",
            error: error.message
        });
    }
};


module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};