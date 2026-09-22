const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    createTask
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getTasks
);

router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getTaskById
);

router.patch(
    "/:id",
    protect,
    authorizeRoles("admin", "manager"),
    updateTask
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteTask
);

module.exports = router;