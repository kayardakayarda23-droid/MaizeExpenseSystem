const express = require("express");

const router = express.Router();

const {
    register,
    login,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

// Auth
router.post("/register", register);
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

module.exports = router;