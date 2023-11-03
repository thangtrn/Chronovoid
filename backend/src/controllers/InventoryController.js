const { Product, Inventory } = require('../models/model');
const HttpResponse = require('../utils/httpResponse');
const generateUniqueId = require('../utils/generateUniqueId')

const getAllInventory = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const inventories = await Inventory.find({}).populate(['product']).sort('-createdAt')
      return httpRes.Ok(inventories);
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const createInventory = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { productId, quantity, totalPrice } = req.body;

      if (!productId || quantity < 0 || totalPrice < 0) {
         return httpRes.Error('Vui lòng điền đầy đủ các trường', 400)
      }

      let _id = await generateUniqueId(Inventory, 'PN');

      await Product.findOneAndUpdate({ _id: productId }, {
         $inc: { quantity: quantity }
      })

      const newInventory = await Inventory({ _id: _id, quantity, totalPrice, product: productId })

      await newInventory.save();

      return httpRes.Ok(newInventory, 'Tạo thành công');
   } catch (error) {
      httpRes.Error(error.message)
   }
}


module.exports = { getAllInventory, createInventory }