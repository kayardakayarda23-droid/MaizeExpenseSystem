const db = require("../config/db");

// Overall Report Summary
const getReportSummary = (user_id, callback) => {

    const sql = `
        SELECT
            COUNT(*) AS totalExpenses,
            IFNULL(SUM(amount),0) AS totalAmount,
            IFNULL(AVG(amount),0) AS averageExpense,
            IFNULL(MAX(amount),0) AS highestExpense,
            IFNULL(MIN(amount),0) AS lowestExpense
        FROM expenses
        WHERE user_id = ?
    `;

    db.query(sql, [user_id], callback);

};

// Category Report
const getCategoryReport = (user_id, callback) => {

    const sql = `
        SELECT
            category,
            COUNT(*) AS totalExpenses,
            IFNULL(SUM(amount),0) AS totalAmount
        FROM expenses
        WHERE user_id = ?
        GROUP BY category
        ORDER BY totalAmount DESC
    `;

    db.query(sql, [user_id], callback);

};

// Monthly Report
const getMonthlyReport = (user_id, callback) => {

    const sql = `
        SELECT
            YEAR(expense_date) AS year,
            MONTH(expense_date) AS monthNumber,
            DATE_FORMAT(MIN(expense_date), '%M %Y') AS month,
            COUNT(*) AS totalExpenses,
            IFNULL(SUM(amount),0) AS totalAmount
        FROM expenses
        WHERE user_id = ?
        GROUP BY YEAR(expense_date), MONTH(expense_date)
        ORDER BY YEAR(expense_date), MONTH(expense_date)
    `;

    db.query(sql, [user_id], callback);

};

// Recent Expenses
const getRecentReport = (user_id, callback) => {

    const sql = `
        SELECT
            title,
            category,
            amount,
            expense_date
        FROM expenses
        WHERE user_id = ?
        ORDER BY expense_date DESC
        LIMIT 10
    `;

    db.query(sql, [user_id], callback);

};

module.exports = {
    getReportSummary,
    getCategoryReport,
    getMonthlyReport,
    getRecentReport
};