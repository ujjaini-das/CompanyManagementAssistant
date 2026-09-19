const express = require("express");

const {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    createEmployee
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getEmployees
);

router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getEmployeeById
);

router.patch(
    "/:id",
    protect,
    authorizeRoles("admin", "manager"),
    updateEmployee
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteEmployee
);

module.exports = router;