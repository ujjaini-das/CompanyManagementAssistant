const Notification = require("../models/Notification");

const {
    generateNotifications
} = require("../services/notificationService");


const generateNotificationController = async (req, res) => {
    try {
        const notifications =
            await generateNotifications();

        res.status(200).json({
            message:
                "Notifications generated successfully",
            count: notifications.length,
            notifications
        });

    } catch (error) {
        console.error(
            "Notification generation error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to generate notifications",
            error: error.message
        });
    }
};


const getNotifications = async (req, res) => {
    try {
        const notifications =
            await Notification.find({
                user: req.user.id
            })
            .populate(
                "relatedTask",
                "title status priority deadline"
            )
            .populate(
                "relatedProject",
                "name status deadline"
            )
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            count: notifications.length,
            notifications
        });

    } catch (error) {
        console.error(
            "Get notifications error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to get notifications",
            error: error.message
        });
    }
};


const markNotificationAsRead = async (req, res) => {
    try {
        const {
            notificationId
        } = req.params;

        const notification =
            await Notification.findOneAndUpdate(
                {
                    _id: notificationId,
                    user: req.user.id
                },
                {
                    isRead: true
                },
                {
                    new: true
                }
            );

        if (!notification) {
            return res.status(404).json({
                message:
                    "Notification not found"
            });
        }

        res.status(200).json({
            message:
                "Notification marked as read",
            notification
        });

    } catch (error) {
        console.error(
            "Mark notification error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to update notification",
            error: error.message
        });
    }
};

const markAllNotificationsAsRead = async (req, res) => {
    try {
        const result =
            await Notification.updateMany(
                {
                    user: req.user.id,
                    isRead: false
                },
                {
                    isRead: true
                }
            );

        res.status(200).json({
            message:
                "All notifications marked as read",
            modifiedCount:
                result.modifiedCount
        });

    } catch (error) {
        console.error(
            "Mark all notifications error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to mark all notifications as read",
            error: error.message
        });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const {
            notificationId
        } = req.params;

        const notification =
            await Notification.findOneAndDelete({
                _id: notificationId,
                user: req.user.id
            });

        if (!notification) {
            return res.status(404).json({
                message:
                    "Notification not found"
            });
        }

        res.status(200).json({
            message:
                "Notification deleted successfully"
        });

    } catch (error) {
        console.error(
            "Delete notification error:",
            error.message
        );

        res.status(500).json({
            message:
                "Failed to delete notification",
            error: error.message
        });
    }
};
module.exports = {
    generateNotificationController,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
};