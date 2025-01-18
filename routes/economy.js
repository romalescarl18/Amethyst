const express = require('express');
const router = express.Router();
const economyHelper = require('../helpers/economyHelper');

router.get('/balance/:username', async (req, res) => {
  try {
    const balance = await economyHelper.getBalance(req.params.username);
    if (balance === null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: req.params.username, balance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching balance', error: error.message });
  }
});

router.post('/earn', async (req, res) => {
  const { username, amount, description } = req.body;
  try {
    const newBalance = await economyHelper.earnMoney(username, amount, description);
    res.json({ username, balance: newBalance });
  } catch (error) {
    res.status(500).json({ message: 'Error earning money', error: error.message });
  }
});

router.post('/spend', async (req, res) => {
  const { username, amount, description } = req.body;
  try {
    const newBalance = await economyHelper.spendMoney(username, amount, description);
    res.json({ username, balance: newBalance });
  } catch (error) {
    res.status(500).json({ message: 'Error spending money', error: error.message });
  }
});

router.post('/transfer', async (req, res) => {
  const { fromUsername, toUsername, amount, description } = req.body;
  try {
    const { fromBalance, toBalance } = await economyHelper.transferMoney(
      fromUsername, toUsername, amount, description
    );
    res.json({ fromUsername, fromBalance, toUsername, toBalance });
  } catch (error) {
    res.status(500).json({ message: 'Error transferring money', error: error.message });
  }
});

module.exports = router;
