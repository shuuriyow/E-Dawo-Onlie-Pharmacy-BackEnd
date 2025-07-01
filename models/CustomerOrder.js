const mongoose = require('mongoose');

const customerOrderSchema = new mongoose.Schema({
  contact: {
    userId: String, // <-- Add this line!
    firstName: String,
    lastName: String,
    countryCode: String,
    phone: String,
    email: String,
  },
  delivery: {
    method: String,
    date: String,
    time: String,
    city: String,
    address: String,
    zip: String,
  },
  payment: String,
  cartItems: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
     category: String, // <-- must be present

    }
  ],
  subtotal: Number,
  discount: Number,
  shipping: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomerOrder', customerOrderSchema);