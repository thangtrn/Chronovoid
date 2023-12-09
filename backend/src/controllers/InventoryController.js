const { Product, Inventory, InventoryItem } = require("../models/model");
const HttpResponse = require("../utils/httpResponse");
const generateUniqueId = require("../utils/generateUniqueId");

const getAllInventory = async (req, res) => {
   const httpRes = new HttpResponse(res);
   try {
      const inventories = await Inventory.find()
         .populate({
            path: "staff",
            select: "-password",
         })
         .populate({
            path: "inventoryItems",
            populate: {
               path: "product",
            },
         })
         .sort("-createdAt");
      httpRes.Ok(inventories);
   } catch (error) {
      httpRes.Error(error.message);
   }
};

const createInventory = async (req, res) => {
   const httpRes = new HttpResponse(res);
   try {
      const { totalPrice, userId = "US001", products = [] } = req.body;

      // 1. Tạo một hóa đơn mới
      const newInventory = new Inventory({
         _id: await generateUniqueId(Inventory, "PH"),
         totalPrice,
         staff: userId,
      });

      // 2. Tạo các mục hóa đơn và liên kết chúng với hóa đơn
      const inventoryItems = [];
      for (const product of products) {
         const { productId, quantity, price } = product;
         const inventoryItem = new InventoryItem({
            _id: await generateUniqueId(InventoryItem, "PHT"),
            quantity,
            price,
            product: productId,
         });
         await inventoryItem.save();
         await Product.findByIdAndUpdate(productId, {
            $inc: { quantity: +quantity },
         });
         inventoryItems.push(inventoryItem._id);
      }
      newInventory.inventoryItems = inventoryItems;

      // 3. Cập nhật tổng giá trị của hóa đơn
      await newInventory.save();
      httpRes.Ok(null, "Tạo phiếu nhập thành công");
   } catch (error) {
      httpRes.Error(error.message);
   }
};

module.exports = { getAllInventory, createInventory };
