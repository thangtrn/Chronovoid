const HttpResponse = require('../utils/httpResponse');
const { Order, OrderItem, Product } = require("../models/model");
const generateUniqueId = require('../utils/generateUniqueId')

const createOrder = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { totalPrice, userId = 'US001', products = [] } = req.body;

      // 1. Tạo một hóa đơn mới
      const newOrder = new Order({
         _id: await generateUniqueId(Order, 'HD'),
         totalPrice,
         staff: userId,
      });

      // 2. Tạo các mục hóa đơn và liên kết chúng với hóa đơn
      const orderItems = [];
      for (const product of products) {
         const { productId, quantity, price } = product;
         const orderItem = new OrderItem({
            _id: await generateUniqueId(OrderItem, 'HDT'),
            quantity,
            price,
            product: productId,
         });
         await orderItem.save();
         await Product.findByIdAndUpdate(productId, { $inc: { quantity: -quantity } })
         orderItems.push(orderItem._id);
      }
      newOrder.orderItems = orderItems;

      // 3. Cập nhật tổng giá trị của hóa đơn
      await newOrder.save();
      httpRes.Ok(null, 'Tạo hoá đơn thành công')
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const getAllOrder = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const orders = await Order.find()
         .populate({
            path: 'staff',
            select: '-password'
         })
         .populate({
            path: 'orderItems',
            populate: {
               path: 'product',
            },
         }).sort('-createdAt')
      httpRes.Ok(orders)
   } catch (error) {
      httpRes.Error(error.message)
   }
}

module.exports = {
   createOrder,
   getAllOrder
}