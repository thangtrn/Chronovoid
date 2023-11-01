const { Category } = require('../models/model')
const HttpResponse = require('../utils/httpResponse');
const generateUniqueId = require('../utils/generateUniqueId')

const getAllCategory = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const categories = await Category.find({}).sort('-createdAt')

      httpRes.Ok(categories)
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const createCategory = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { name, description } = req.body;

      let _id = await generateUniqueId(Category, 'TL');

      const isExist = await Category.findOne({ name: name });

      if (isExist) {
         return httpRes.Error('Danh mục nay đã tồn tại', 400);
      }

      const category = await Category.create({ _id: _id, name, description });

      httpRes.Ok(category, 'Tạo thành công')
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const updateCategory = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { categoryId, name, description } = req.body;
      console.log(categoryId, name, description);
      const category = await Category.findOneAndUpdate({ _id: categoryId }, {
         name: name,
         description: description
      });

      httpRes.Ok(category, 'Sửa thành công')
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const deleteCategory = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { id } = req.params;

      const category = await Category.deleteOne({ _id: id });


      httpRes.Ok(null, 'Xoá thành công')
   } catch (error) {
      httpRes.Error(error.message)
   }
}

module.exports = { getAllCategory, createCategory, updateCategory, deleteCategory }