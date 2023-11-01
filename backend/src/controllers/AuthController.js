const { User } = require('../models/model');
const HttpResponse = require('../utils/httpResponse');
const generateUniqueId = require('../utils/generateUniqueId')

const login = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return httpRes.Error('Vui lòng điền đầy đủ các trường', 400)
      }

      const user = await User.findOne({ email, password })
      if (!user) {
         return httpRes.Error('Tài khoản hoặc mật khẩu không đúng!', 400)
      }

      const { password: pwd, ...res } = user._doc;

      return httpRes.Ok({
         ...res
      });
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const register = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { name, email, password, image } = req.body;

      if (!name || !email || !password) {
         return httpRes.Error('Vui lòng điền đầy đủ các trường', 400)
      }

      const isExist = await User.findOne({ email })
      if (isExist) {
         return httpRes.Error('Email đã tồn tại', 400)
      }

      let _id = await generateUniqueId(User, 'US');

      const newUser = new User({ _id: _id, name, email, password, image });

      await newUser.save();

      return httpRes.Ok(null, 'Đăng ký thành công!', 201);
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const updateProfile = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { userId, name, password, role, image } = req.body;

      const updateData = {
         name, role, image
      }
      if (password) {
         updateData.password = password
      }

      console.log(updateData);
      const user = await User.findOneAndUpdate({ _id: userId }, updateData);

      return httpRes.Ok(user);
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const getAllUser = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const users = await User.find({})
      // .select('-password')

      return httpRes.Ok(users);
   } catch (error) {
      httpRes.Error(error.message)
   }
}

const deleteUser = async (req, res) => {
   const httpRes = new HttpResponse(res)
   try {
      const { id } = req.params;
      const users = await User.findByIdAndDelete(id)

      return httpRes.Ok(null, "Xoá thành công");
   } catch (error) {
      httpRes.Error(error.message)
   }
}

module.exports = { login, register, getAllUser, updateProfile, deleteUser }