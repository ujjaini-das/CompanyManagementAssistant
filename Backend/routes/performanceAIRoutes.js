const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getPerformanceAIAnalysis
} = require("../controllers/performanceAIController");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getPerformanceAIAnalysis
);

module.exports = router;