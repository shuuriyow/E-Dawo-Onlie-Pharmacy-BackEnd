const express = require('express');
const CustomerOrder = require('../models/CustomerOrder');
const router = express.Router();


// Get all orders for a specific user
router.get('/my/:userId', async (req, res) => {
  try {
    const orders = await CustomerOrder.find({ 'contact.userId': req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get all customer orders (for admin)
router.get('/', async (req, res) => {
  try {
    const orders = await CustomerOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/', async (req, res) => {
  try {
    const order = new CustomerOrder(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;