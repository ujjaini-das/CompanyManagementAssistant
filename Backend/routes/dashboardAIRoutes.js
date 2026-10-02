const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getDashboardAIAnalysis
} = require("../controllers/dashboardAIController");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getDashboardAIAnalysis
);

module.exports = router;