const {
    getReportSummary,
    getCategoryReport,
    getMonthlyReport,
    getRecentReport
} = require("../models/reportModel");

const getReports = (req, res) => {

    console.log("Reports endpoint called");

    console.log("User:", req.user);

    const user_id = req.user.id;

    getReportSummary(user_id, (err, summary) => {

        if (err) {
            console.log("Summary Error:", err);
            return res.status(500).json(err);
        }

        getCategoryReport(user_id, (err, categories) => {

            if (err) {
                console.log("Category Error:", err);
                return res.status(500).json(err);
            }

            getMonthlyReport(user_id, (err, monthly) => {

                if (err) {
                    console.log("Monthly Error:", err);
                    return res.status(500).json(err);
                }

                getRecentReport(user_id, (err, recent) => {

                    if (err) {
                        console.log("Recent Error:", err);
                        return res.status(500).json(err);
                    }

                    res.json({
                        success: true,
                        summary: summary[0],
                        categories,
                        monthly,
                        recentExpenses: recent
                    });

                });

            });

        });

    });

};

module.exports = {
    getReports
};