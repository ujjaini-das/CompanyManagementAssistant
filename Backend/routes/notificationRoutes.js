const express = require("express");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    generateNotificationController,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
} = require("../controllers/notificationController");

const router = express.Router();

router.post(
    "/generate",
    protect,
    authorizeRoles("admin", "manager"),
    generateNotificationController
);

router.get(
    "/",
    protect,
    getNotifications
);

router.patch(
    "/:notificationId/read",
    protect,
    markNotificationAsRead
);

router.patch(
    "/read-all",
    protect,
    markAllNotificationsAsRead
);

router.delete(
    "/:notificationId",
    protect,
    deleteNotification
);
module.exports = router;