const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    yearlyStatistics
} = require("../controllers/statisticsController");

router.get(
    "/yearly",
    protect,
    yearlyStatistics
);

module.exports = router;