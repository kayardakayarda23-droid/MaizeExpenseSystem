

const {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseStatistics
} = require("../models/expenseModel");

// ==============================
// Create Expense
// ==============================
const createExpense = (req, res) => {

    const user_id = req.user.id;

    const {
        title,
        category,
        amount,
        expense_date,
        description
    } = req.body;

    const receipt = req.file ? req.file.filename : null;

    if (!title || !category || !amount || !expense_date) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided."
        });
    }

    addExpense(
        user_id,
        title,
        category,
        amount,
        expense_date,
        description,
        receipt,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Expense added successfully.",
                expenseId: result.insertId
            });

        }
    );

};

// ==============================
// Get All Expenses
// ==============================
const getAllExpenses = (req, res) => {

    getExpenses(req.user.id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            expenses: results
        });

    });

};

// ==============================
// Expense Statistics By Year
// ==============================
const expenseStatistics = (req, res) => {

    getExpenseStatistics(req.user.id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            statistics: results
        });

    });

};

// ==============================
// Get Single Expense
// ==============================
const getSingleExpense = (req, res) => {

    getExpenseById(req.params.id, req.user.id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found."
            });
        }

        res.status(200).json({
            success: true,
            expense: results[0]
        });

    });

};

// ==============================
// Update Expense
// ==============================
const editExpense = (req, res) => {

    const {
        title,
        category,
        amount,
        expense_date,
        description
    } = req.body;

    const receipt = req.file ? req.file.filename : null;

    updateExpense(
        req.params.id,
        req.user.id,
        title,
        category,
        amount,
        expense_date,
        description,
        receipt,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Expense not found."
                });
            }

            res.status(200).json({
                success: true,
                message: "Expense updated successfully."
            });

        }
    );

};

// ==============================
// Delete Expense
// ==============================
const removeExpense = (req, res) => {

    deleteExpense(
        req.params.id,
        req.user.id,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Expense not found."
                });
            }

            res.status(200).json({
                success: true,
                message: "Expense deleted successfully."
            });

        }
    );

};

module.exports = {
    createExpense,
    getAllExpenses,
    expenseStatistics,
    getSingleExpense,
    editExpense,
    removeExpense
};