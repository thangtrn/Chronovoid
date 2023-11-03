const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   _id: {
      type: String,
      required: true,
      unique: true,
   },
   name: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      default: 'https://us.123rf.com/450wm/sternfahrer/sternfahrer2210/sternfahrer221000095/192283932-cat-avatar-illustration-with-blue-background-concept.jpg'
   },
   role: {
      type: String,
      enum: ['staff', 'admin'],
      default: 'staff'
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
   },
}, {
   _id: false,
   timestamps: true
});

const productSchema = new Schema({
   _id: {
      type: String,
      required: true,
      unique: true
   },
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      min: 0,
      required: true,
   },
   quantity: {
      type: Number,
      default: 0,
      min: 0,
   },
   description: String,
   image: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6R3wMlaQstAxcE5smAjdBTwHjgCquBVCiF-RmnIC9&s'
   },
   category: {
      type: String,
      ref: "Category"
   },
}, {
   _id: false,
   timestamps: true
});

const categorySchema = new Schema({
   _id: {
      type: String,
      required: true,
      unique: true
   },
   name: {
      type: String,
      required: true
   },
   description: String,
   image: String,
}, {
   _id: false,
   timestamps: true
})

const orderItemSchema = new Schema({
   _id: {
      type: String,
      required: true,
      unique: true
   },
   quantity: Number,
   price: Number,
   product: {
      type: String,
      ref: "Product"
   },
}, {
   _id: false,
   timestamps: true
})

const orderSchema = new Schema({
   _id: {
      type: String,
      required: true,
      unique: true
   },
   orderItems: [
      {
         type: String,
         ref: 'OrderItem'
      }
   ],
   totalPrice: {
      type: Number,
      min: 0,
      required: true
   },
   staff: {
      type: String,
      ref: "User",
   }
}, {
   _id: false,
   timestamps: true
})

const inventorySchema = new Schema({
   _id: {
      type: String,
      required: true,
      unique: true
   },
   quantity: {
      type: Number,
      min: 0,
   },
   totalPrice: Number,
   product: {
      type: String,
      ref: "Product"
   },
}, {
   _id: false,
   timestamps: true
})

let User = mongoose.model("User", userSchema);
let Product = mongoose.model("Product", productSchema);
let Order = mongoose.model("Order", orderSchema);
let OrderItem = mongoose.model("OrderItem", orderItemSchema);
let Category = mongoose.model("Category", categorySchema);
let Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = { User, Product, Order, Category, OrderItem, Inventory };
