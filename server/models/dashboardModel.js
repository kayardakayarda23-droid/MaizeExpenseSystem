
const db = require("../config/db");

// Dashboard Summary
const getDashboardSummary = (user_id, callback) => {

    const sql = `
        SELECT
            COUNT(*) AS totalExpenses,
            IFNULL(SUM(amount), 0) AS totalAmount,
            IFNULL(AVG(amount), 0) AS averageExpense,
            IFNULL(MAX(amount), 0) AS highestExpense,
            IFNULL(MIN(amount), 0) AS lowestExpense
        FROM expenses
        WHERE user_id = ?
    `;

    db.query(sql, [user_id], callback);
};

// Category Summary
const getCategorySummary = (user_id, callback) => {

    const sql = `
        SELECT
            category,
            COUNT(*) AS total,
            IFNULL(SUM(amount), 0) AS amount
        FROM expenses
        WHERE user_id = ?
        GROUP BY category
        ORDER BY amount DESC
    `;

    db.query(sql, [user_id], callback);
};

// Recent Expenses
const getRecentExpenses = (user_id, callback) => {

    const sql = `
        SELECT
            id,
            title,
            category,
            amount,
            expense_date,
            description,
            created_at
        FROM expenses
        WHERE user_id = ?
        ORDER BY expense_date DESC
        LIMIT 5
    `;

    db.query(sql, [user_id], callback);
};

module.exports = {
    getDashboardSummary,
    getCategorySummary,
    getRecentExpenses
};
