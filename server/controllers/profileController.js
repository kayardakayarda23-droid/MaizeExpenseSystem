const db = require("../config/db");

// Get Logged-in User
const getProfile = (req, res) => {

    const sql = `
        SELECT
            id,
            fullname,
            email,
            created_at
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [req.user.id], (err, results) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message,
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found.",
            });

        }

        res.json({
            success: true,
            user: results[0],
        });

    });

};

module.exports = {
    getProfile,
};