const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getWorkload
} = require("../controllers/workloadController");

const router = express.Router();

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getWorkload
);

module.exports = router;