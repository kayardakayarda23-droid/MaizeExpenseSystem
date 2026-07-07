const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    createExpense,
    getAllExpenses,
    getSingleExpense,
    editExpense,
    removeExpense
} = require("../controllers/expenseController");

const {
    yearlyStatistics
} = require("../controllers/statisticsController");

// Create Expense
router.post(
    "/",
    protect,
    upload.single("receipt"),
    createExpense
);

// Expense Statistics
router.get(
    "/statistics",
    protect,
    yearlyStatistics
);

// Get All Expenses
router.get(
    "/",
    protect,
    getAllExpenses
);

// Get Single Expense
router.get(
    "/:id",
    protect,
    getSingleExpense
);

// Update Expense
router.put(
    "/:id",
    protect,
    upload.single("receipt"),
    editExpense
);

// Delete Expense
router.delete(
    "/:id",
    protect,
    removeExpense
);

module.exports = router;