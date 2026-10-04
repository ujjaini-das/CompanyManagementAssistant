const express = require("express");

const {
    protect
} = require("../middleware/authMiddleware");

const {
    getActivitiesForTask
} = require("../controllers/taskActivityController");

const router = express.Router();

router.get(
    "/tasks/:taskId/activities",
    protect,
    getActivitiesForTask
);

module.exports = router;