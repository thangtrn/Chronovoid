const HttpResponse = require("../utils/httpResponse");
const { Order, Inventory } = require("../models/model");
const moment = require("moment");

const getDashboard = async (req, res) => {
   const httpRes = new HttpResponse(res);
   try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const orders = await Order.find({
         createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
         },
      });

      const inventories = await Inventory.find({
         createdAt: {
            $gte: today,
            $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000),
         },
      });

      httpRes.Ok([
         {
            value: orders.length,
            title: "Đơn hàng trong ngày",
         },
         {
            value: orders.reduce((curr, item) => curr + item.totalPrice, 0),
            title: "Doanh thu trong ngày",
            suffix: "đ",
         },
         {
            value: inventories.length,
            title: "Phiếu nhập trong ngày",
         },
         {
            value: inventories.reduce(
               (curr, item) => curr + item.totalPrice,
               0
            ),
            title: "Tiền hàng trong ngày",
            suffix: "đ",
         },
      ]);
   } catch (error) {
      httpRes.Error(error.message);
   }
};

const geRevenueChart = async (req, res) => {
   const httpRes = new HttpResponse(res);
   try {
      const { fromDate, toDate } = req.query;

      // Lấy tham số từ query parameters hoặc sử dụng mặc định nếu không có
      const startDate = fromDate ? moment(fromDate) : moment();
      const endDate = toDate ? moment(toDate) : new moment();

      // Lấy danh sách đơn hàng được tạo trong khoảng thời gian từ startDate đến endDate
      const orders = await Order.find({
         createdAt: {
            $gte: startDate.toDate(), // Chắc chắn rằng startDate là đối tượng moment
            $lte: endDate.toDate(), // Chắc chắn rằng endDate là đối tượng moment
         },
      });

      const dailyRevenue = [];

      const currentDate = startDate.clone();

      while (
         currentDate.isBefore(endDate) ||
         currentDate.isSame(endDate, "day")
      ) {
         const day = currentDate.format("DD-MM-YYYY");

         const existingDay = dailyRevenue.find((item) => item.date === day);

         if (existingDay) {
            existingDay.totalPrice += orders
               .filter((order) =>
                  currentDate.isSame(moment(order.createdAt), "day")
               )
               .reduce((total, order) => total + order.totalPrice, 0);
         } else {
            dailyRevenue.push({
               date: day,
               totalPrice: orders
                  .filter((order) =>
                     currentDate.isSame(moment(order.createdAt), "day")
                  )
                  .reduce((total, order) => total + order.totalPrice, 0),
            });
         }

         currentDate.add(1, "day");
      }
      httpRes.Ok(dailyRevenue);
   } catch (error) {
      httpRes.Error(error.message);
   }
};

const getAmountOrderChart = async (req, res) => {
   const httpRes = new HttpResponse(res);
   try {
      const { fromDate, toDate } = req.query;

      console.log(fromDate, toDate);

      // Lấy tham số từ query parameters hoặc sử dụng mặc định nếu không có
      const startDate = fromDate ? moment(fromDate) : moment();
      const endDate = toDate ? moment(toDate) : moment();

      // Lấy danh sách đơn hàng được tạo trong khoảng thời gian từ startDate đến endDate
      const orders = await Order.find({
         createdAt: {
            $gte: startDate.toDate(), // Chắc chắn rằng startDate là đối tượng moment
            $lte: endDate.toDate(), // Chắc chắn rằng endDate là đối tượng moment
         },
      });

      const dailyOrderCounts = [];

      const currentDate = startDate.clone();

      while (
         currentDate.isBefore(endDate) ||
         currentDate.isSame(endDate, "day")
      ) {
         const day = currentDate.format("DD-MM-YYYY");

         const orderCount = orders.filter((order) =>
            currentDate.isSame(moment(order.createdAt), "day")
         ).length;

         dailyOrderCounts.push({
            date: day,
            count: orderCount,
         });

         currentDate.add(1, "day");
      }
      httpRes.Ok(dailyOrderCounts);
   } catch (error) {
      httpRes.Error(error.message);
   }
};

const getStatistic = async (req, res) => {
   const httpRes = new HttpResponse(res);
   try {
      const { fromDate, toDate } = req.query;

      // Lấy tham số từ query parameters hoặc sử dụng mặc định nếu không có
      const startDate = fromDate ? moment(fromDate) : moment();
      const endDate = toDate ? moment(toDate) : new moment();

      // Lấy danh sách đơn hàng được tạo trong khoảng thời gian từ startDate đến endDate
      const orders = await Order.find({
         createdAt: {
            $gte: startDate.toDate(), // Chắc chắn rằng startDate là đối tượng moment
            $lte: endDate.toDate(), // Chắc chắn rằng endDate là đối tượng moment
         },
      });

      // Lấy danh sách đơn hàng được tạo trong khoảng thời gian từ startDate đến endDate
      const inventories = await Inventory.find({
         createdAt: {
            $gte: startDate.toDate(), // Chắc chắn rằng startDate là đối tượng moment
            $lte: endDate.toDate(), // Chắc chắn rằng endDate là đối tượng moment
         },
      });

      const dailyRevenue = formatStatistic(startDate, endDate, orders);
      const dailyInventory = formatStatistic(startDate, endDate, inventories);

      const data = dailyRevenue.map((item, index) => ({
         date: item?.date,
         amountOrder: item?.totalPrice,
         amountInventory: dailyInventory[index]?.totalPrice,
      }));

      httpRes.Ok(data);
   } catch (error) {
      httpRes.Error(error.message);
   }
};

const formatStatistic = (startDate, endDate, items) => {
   const dailyRevenue = [];

   const currentDate = startDate.clone();

   while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
      const day = currentDate.format("DD-MM-YYYY");

      const existingDay = dailyRevenue.find((item) => item.date === day);

      if (existingDay) {
         existingDay.totalPrice += items
            .filter((order) =>
               currentDate.isSame(moment(order.createdAt), "day")
            )
            .reduce((total, order) => total + order.totalPrice, 0);
      } else {
         dailyRevenue.push({
            date: day,
            totalPrice: items
               .filter((order) =>
                  currentDate.isSame(moment(order.createdAt), "day")
               )
               .reduce((total, order) => total + order.totalPrice, 0),
         });
      }

      currentDate.add(1, "day");
   }

   return dailyRevenue;
};

module.exports = {
   getDashboard,
   geRevenueChart,
   getAmountOrderChart,
   getStatistic,
};
