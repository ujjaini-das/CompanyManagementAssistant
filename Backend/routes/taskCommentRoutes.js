const express = require("express");

const {
    protect
} = require("../middleware/authMiddleware");

const {
    createTaskComment,
    getTaskComments,
    updateTaskComment,
    deleteTaskComment
} = require("../controllers/taskCommentController");

const router = express.Router();

router.post(
    "/tasks/:taskId/comments",
    protect,
    createTaskComment
);

router.get(
    "/tasks/:taskId/comments",
    protect,
    getTaskComments
);

router.patch(
    "/comments/:commentId",
    protect,
    updateTaskComment
);

router.delete(
    "/comments/:commentId",
    protect,
    deleteTaskComment
);

module.exports = router;