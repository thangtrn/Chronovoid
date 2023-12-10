const router = require("express").Router();
const {
   getDashboard,
   geRevenueChart,
   getAmountOrderChart,
   getStatistic,
} = require("../controllers/StatisticController");

router.get("/", getStatistic);
router.get("/dashboard", getDashboard);
router.get("/revenue", geRevenueChart);
router.get("/amount-order", getAmountOrderChart);

module.exports = router;
