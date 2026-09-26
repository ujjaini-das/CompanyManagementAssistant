const express = require("express");

const {
    analyzeProjectController,
    chatWithAssistantController
} = require("../controllers/aiController");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/analyze-project/:projectId",
    protect,
    authorizeRoles("admin", "manager"),
    analyzeProjectController
);
router.post(
    "/chat",
    protect,
    authorizeRoles("admin", "manager"),
    chatWithAssistantController
);

module.exports = router;
