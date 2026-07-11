const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Database Connection
require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Middleware
const protect = require("./middleware/authMiddleware");

const app = express();

// ============================
// Middleware
// ============================
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// ============================
// Home Route
// ============================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Maize Farming Expense Tracking API is Running..."
    });
});

// ============================
// API Routes
// ============================
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", reportRoutes);

// ============================
// Protected Test Route
// ============================
app.get("/api/test", protect, (req, res) => {
    res.json({
        success: true,
        message: "Protected route accessed successfully!",
        user: req.user
    });
});

// ============================
// 404 Route
// ============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// ============================
// Start Server
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("======================================");
    console.log(`Server running on port ${PORT}`);
    console.log(`API listening on port ${PORT}`);
    console.log("======================================");
});