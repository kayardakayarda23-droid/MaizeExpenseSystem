const db = require("../config/db");

// ==============================
// Add Expense
// ==============================
const addExpense = (
    user_id,
    title,
    category,
    amount,
    expense_date,
    description,
    receipt,
    callback
) => {

    const sql = `
        INSERT INTO expenses
        (
            user_id,
            title,
            category,
            amount,
            expense_date,
            description,
            receipt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            title,
            category,
            amount,
            expense_date,
            description,
            receipt
        ],
        callback
    );

};

// ==============================
// Get All Expenses
// ==============================
const getExpenses = (user_id, callback) => {

    const sql = `
        SELECT *
        FROM expenses
        WHERE user_id = ?
        ORDER BY expense_date DESC
    `;

    db.query(sql, [user_id], callback);

};

// ==============================
// Get Single Expense
// ==============================
const getExpenseById = (id, user_id, callback) => {

    const sql = `
        SELECT *
        FROM expenses
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [id, user_id], callback);

};

// ==============================
// Update Expense
// ==============================
const updateExpense = (
    id,
    user_id,
    title,
    category,
    amount,
    expense_date,
    description,
    receipt,
    callback
) => {

    let sql;
    let values;

    if (receipt) {

        sql = `
            UPDATE expenses
            SET
                title = ?,
                category = ?,
                amount = ?,
                expense_date = ?,
                description = ?,
                receipt = ?
            WHERE id = ?
            AND user_id = ?
        `;

        values = [
            title,
            category,
            amount,
            expense_date,
            description,
            receipt,
            id,
            user_id
        ];

    } else {

        sql = `
            UPDATE expenses
            SET
                title = ?,
                category = ?,
                amount = ?,
                expense_date = ?,
                description = ?
            WHERE id = ?
            AND user_id = ?
        `;

        values = [
            title,
            category,
            amount,
            expense_date,
            description,
            id,
            user_id
        ];

    }

    db.query(sql, values, callback);

};

// ==============================
// Delete Expense
// ==============================
const deleteExpense = (
    id,
    user_id,
    callback
) => {

    const sql = `
        DELETE
        FROM expenses
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [id, user_id], callback);

};

// ==============================
// Expense By Category (NEW)
// ==============================
const getCategoryStatistics = (user_id, callback) => {

    const sql = `
        SELECT
            category,
            SUM(amount) AS total
        FROM expenses
        WHERE user_id = ?
        GROUP BY category
        ORDER BY total DESC
    `;

    db.query(sql, [user_id], callback);

};

// ==============================
// Expense Statistics By Year
// ==============================
const getExpenseStatistics = (user_id, callback) => {

    const sql = `
        SELECT
            YEAR(expense_date) AS year,
            SUM(amount) AS totalExpense
        FROM expenses
        WHERE user_id = ?
        GROUP BY YEAR(expense_date)
        ORDER BY YEAR(expense_date)
    `;

    db.query(sql, [user_id], callback);

};

module.exports = {
    addExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseStatistics
};