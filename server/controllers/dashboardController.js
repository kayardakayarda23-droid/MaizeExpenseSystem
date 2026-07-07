const {
    getDashboardSummary,
    getCategorySummary,
    getRecentExpenses
} = require("../models/dashboardModel");

// ==============================
// Dashboard
// ==============================
const getDashboard = (req, res) => {

    const user_id = req.user.id;

    getDashboardSummary(user_id, (err, summary) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        getCategorySummary(user_id, (err, categories) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            getRecentExpenses(user_id, (err, recent) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.json({
                    success: true,
                    dashboard: summary[0],
                    categories,
                    recentExpenses: recent
                });

            });

        });

    });

};

module.exports = {
    getDashboard
};