const express = require('express');
const Discount = require('../models/Discount');

const router = express.Router();

// GET all discounts
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
});

// Validate promo code
router.post('/validate', async (req, res) => {
  const { code } = req.body;
  const now = new Date();
  try {
    const discount = await Discount.findOne({
      discountCode: code.trim(),
      status: true, // Boolean, not string
      startDate: { $lte: now },
      endDate: { $gte: now }
    });
    if (!discount) return res.status(404).json({ error: 'Invalid or expired code' });
    res.json({ value: discount.discountValue / 100 }); // Convert percent to decimal (e.g. 10% => 0.1)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to validate code' });
  }
});

// PUT (update) a discount
router.put('/:id', async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!discount) return res.status(404).json({ error: 'Discount not found' });
    res.json(discount);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update discount', details: error.message });
  }
});

// DELETE a discount
router.delete('/:id', async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ error: 'Discount not found' });
    res.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete discount' });
  }
});

module.exports = router;