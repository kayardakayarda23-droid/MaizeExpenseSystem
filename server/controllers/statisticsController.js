const db = require("../config/db");

const yearlyStatistics = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            YEAR(expense_date) AS year,
            MONTH(expense_date) AS month,
            SUM(amount) AS total
        FROM expenses
        WHERE user_id = ?
        GROUP BY YEAR(expense_date), MONTH(expense_date)
        ORDER BY YEAR(expense_date), MONTH(expense_date)
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            statistics: results
        });

    });

};

module.exports = {
    yearlyStatistics
};