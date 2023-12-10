const authRoute = require("./authRoute");
const productRoute = require("./productRoute");
const categoryRoute = require("./categoryRoute");
const orderRoute = require("./orderRoute");
const inventoryRoute = require("./inventoryRoute");
const statisticRoute = require("./statisticRoute");

const mainRoutes = (app) => {
   app.use("/api/auth", authRoute);
   app.use("/api/products", productRoute);
   app.use("/api/categories", categoryRoute);
   app.use("/api/orders", orderRoute);
   app.use("/api/inventories", inventoryRoute);
   app.use("/api/statistic", statisticRoute);
};

module.exports = mainRoutes;
