const HttpResponse = require('../utils/httpResponse');
const { Order } = require("../models/model");

const createOrder = async (req, res) => {
   const httpRes = new HttpResponse(res)

   try {

   } catch (error) {
      httpRes.Error(error.message)
   }
}

const getAllProductByOrder = async (req, res) => {
   const httpRes = new HttpResponse(res)

   try {

   } catch (error) {
      httpRes.Error(error.message)
   }
}

module.exports = {
   createOrder,
   getAllProductByOrder
}