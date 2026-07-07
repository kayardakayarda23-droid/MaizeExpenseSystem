require("dotenv").config();

const db = require("./config/db");

db.query("DESCRIBE expenses", (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.table(results);
    }

    process.exit();
});