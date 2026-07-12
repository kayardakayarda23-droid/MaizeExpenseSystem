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

app.use((req, res, next) => {
    console.log(`REQUEST: ${req.method} ${req.url}`);
    next();
});

// =====================================
// Middleware
// =====================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================================
// Serve Uploaded Files
// =====================================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =====================================
// Health Check Route
// =====================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Maize Farming Expense Tracking API is Running..."
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy"
  });
});

// =====================================
// API Routes
// =====================================
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", reportRoutes);

// =====================================
// Protected Test Route
// =====================================
app.get("/api/test", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully!",
    user: req.user
  });
});

// =====================================
// 404 Route
// =====================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// =====================================
// Start Server
// =====================================
process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log("======================================");
    console.log(`Server running on port ${PORT}`);
    console.log("Maize Farming Expense API is live");
    console.log("======================================");
});