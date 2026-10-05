const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getAnalytics,
    getProjectAnalyticsById
} = require("../controllers/analyticsController");

const router = express.Router();

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getAnalytics
);

router.get(
    "/projects/:projectId",
    protect,
    authorizeRoles("admin", "manager"),
    getProjectAnalyticsById
);

module.exports = router;