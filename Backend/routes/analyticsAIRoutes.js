const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getAIAnalytics
} = require("../controllers/analyticsAIController");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getAIAnalytics
);

module.exports = router;