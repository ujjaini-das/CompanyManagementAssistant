const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getPerformance,
    getPerformanceByEmployee
} = require("../controllers/performanceController");

const router = express.Router();

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getPerformance
);

router.get(
    "/:employeeId",
    protect,
    authorizeRoles("admin", "manager"),
    getPerformanceByEmployee
);

module.exports = router;