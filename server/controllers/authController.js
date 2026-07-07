const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

const {
    createUser,
    findUserByEmail,
    saveResetToken,
    findByResetToken
} = require("../models/userModel");

const db = require("../config/db");

// =========================
// Register
// =========================
const register = async (req, res) => {

    try {

        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        createUser(fullname, email, hashedPassword, (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Registration Successful",
                token: generateToken(result.insertId)
            });

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =========================
// Login
// =========================
const login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        });
    }

    findUserByEmail(email, async (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        res.json({
            success: true,
            message: "Login Successful",
            token: generateToken(user.id),
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });

    });

};

// =========================
// Forgot Password
// =========================
const forgotPassword = (req, res) => {

    const { email } = req.body;

    findUserByEmail(email, async (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Email not found"
            });
        }

        const token = crypto.randomBytes(32).toString("hex");

        const expire = new Date(Date.now() + 3600000);

        saveResetToken(email, token, expire, async (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            const resetLink =
                `${process.env.CLIENT_URL}/reset-password/${token}`;

            await sendEmail(
                email,
                "Reset Password",
                `
                <h2>Reset Password</h2>

                <p>Click the link below to reset your password.</p>

                <a href="${resetLink}">
                    ${resetLink}
                </a>

                <p>This link expires in 1 hour.</p>
                `
            );

            res.json({
                success: true,
                message: "Password reset link sent."
            });

        });

    });

};

// =========================
// Reset Password
// =========================
const resetPassword = async (req, res) => {

    const { token } = req.params;

    const { password } = req.body;

    findByResetToken(token, async (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token."
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        db.query(
            `
            UPDATE users
            SET password=?,
                reset_token=NULL,
                reset_token_expire=NULL
            WHERE id=?
            `,
            [hashed, results[0].id],
            (err) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.json({
                    success: true,
                    message: "Password reset successful."
                });

            }
        );

    });

};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
};