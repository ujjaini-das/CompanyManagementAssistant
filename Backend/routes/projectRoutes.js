const express = require("express");

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    createProject
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getProjects
);

router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getProjectById
);

router.patch(
    "/:id",
    protect,
    authorizeRoles("admin", "manager"),
    updateProject
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteProject
);

module.exports = router;