const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const workloadRoutes = require("./routes/workloadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const dashboardAIRoutes = require("./routes/dashboardAIRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const alertAIRoutes = require("./routes/alertAIRoutes");
const taskCommentRoutes = require("./routes/taskCommentRoutes");
const taskActivityRoutes = require("./routes/taskActivityRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const performanceAIRoutes = require("./routes/performanceAIRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const analyticsAIRoutes = require("./routes/analyticsAIRoutes");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/workload", workloadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/dashboard/ai", dashboardAIRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ai/alerts", alertAIRoutes);
app.use("/api", taskCommentRoutes);
app.use("/api", taskActivityRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/ai/performance-analysis", performanceAIRoutes );
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai/project-analysis", analyticsAIRoutes);

app.get("/api/test", (req, res) => {
    res.json({
        message: "Backend is working!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});