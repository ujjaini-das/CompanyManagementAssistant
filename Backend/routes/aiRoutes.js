const express = require("express");

const {
    analyzeProjectController
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

module.exports = router;
