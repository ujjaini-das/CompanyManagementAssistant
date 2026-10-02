const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getDashboard
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getDashboard
);

module.exports = router;