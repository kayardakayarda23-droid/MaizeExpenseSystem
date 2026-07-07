const db = require("../config/db");

const createUser = (fullname, email, password, callback) => {
    const sql = `
        INSERT INTO users (fullname, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [fullname, email, password], callback);
};

const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);
};
// Save reset token
const saveResetToken = (email, token, expire, callback) => {
    const sql = `
        UPDATE users
        SET reset_token = ?, reset_token_expire = ?
        WHERE email = ?
    `;

    db.query(sql, [token, expire, email], callback);
};

// Find user by reset token
const findByResetToken = (token, callback) => {
    const sql = `
        SELECT *
        FROM users
        WHERE reset_token = ?
        AND reset_token_expire > NOW()
    `;

    db.query(sql, [token], callback);
};
module.exports = {
    createUser,
    findUserByEmail,
    saveResetToken,
    findByResetToken
};