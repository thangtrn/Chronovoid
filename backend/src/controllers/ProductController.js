const { Product } = require('../models/model');
const HttpResponse = require('../utils/httpResponse');
const generateUniqueId = require('../utils/generateUniqueId')

const getAllProduct = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const products = await Product.find({}).populate(['category']).sort('-createdAt')
      return httpRes.Ok(products);
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const getProductById = async (req, res) => {
   const httpRes = new HttpResponse(res)

   try {

   } catch (error) {
      httpRes.Error(error.message)
   }
}

const createProduct = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { name, price, quantity, description, image, categoryId } = req.body;

      if (!name || !price || quantity < 0 || !description || !categoryId) {
         console.log(name, price, quantity, description, image, categoryId);
         return httpRes.Error('Vui lòng điền đầy đủ các trường', 400)
      }

      let _id = await generateUniqueId(Product, 'SP');

      const newProduct = new Product({ _id: _id, name, price, quantity, description, image, category: categoryId })

      await newProduct.save();

      return httpRes.Ok({ ...newProduct._doc }, 'Tạo thành công');
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const editProduct = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { productId, name, price, description, image, categoryId } = req.body;

      if (!name || !price || !description || !categoryId) {
         return httpRes.Error('Vui lòng điền đầy đủ các trường', 400)
      }

      const product = await Product.findOneAndUpdate({ _id: productId }, {
         name, price, description, image, category: categoryId
      })

      return httpRes.Ok(product, 'Cập nhật thành công');
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const deleteProduct = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { id } = req.params;

      await Product.findByIdAndDelete(id)
      return httpRes.Ok(null, 'Xoá nhật thành công');
   } catch (error) {
      httpRes.Error(error.message)
   }
}

module.exports = {
   getAllProduct,
   createProduct,
   getProductById,
   deleteProduct,
   editProduct
}