const NewsletterSubscriber = require('../models/NewsletterSubscriber');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    // Prevent duplicate subscriptions
    const exists = await NewsletterSubscriber.findOne({ email: email.trim().toLowerCase() });
    if (exists) return res.status(409).json({ error: 'Already subscribed' });

    const subscriber = new NewsletterSubscriber({ email: email.trim().toLowerCase() });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};