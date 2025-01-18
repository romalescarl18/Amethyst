/**
 * @swagger
 * tags:
 *   - name: Economy API
 *     description: API for managing the built in simple economy (balance, earn, spend, transfer money).
 */

/**
 * @swagger
 * /api/economy/balance/{username}:
 *   get:
 *     summary: Get user balance
 *     tags: [Economy API]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: User balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 balance:
 *                   type: number
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching balance
 * 
 * /api/economy/earn:
 *   post:
 *     summary: Earn money
 *     tags: [Economy API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: New balance after earning money
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 balance:
 *                   type: number
 *       500:
 *         description: Error earning money
 * 
 * /api/economy/spend:
 *   post:
 *     summary: Spend money
 *     tags: [Economy API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: New balance after spending money
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 balance:
 *                   type: number
 *       500:
 *         description: Error spending money
 * 
 * /api/economy/transfer:
 *   post:
 *     summary: Transfer money
 *     tags: [Economy API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromUsername:
 *                 type: string
 *               toUsername:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Balances after transferring money
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fromUsername:
 *                   type: string
 *                 fromBalance:
 *                   type: number
 *                 toUsername:
 *                   type: string
 *                 toBalance:
 *                   type: number
 *       500:
 *         description: Error transferring money
 * 
 * /api/economy/update:
 *   put:
 *     summary: Update user information
 *     tags: [Economy API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               newUsername:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newUsername:
 *                   type: string
 *                 balance:
 *                   type: number
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */

const express = require('express');
const router = express.Router();
const economyHelper = require('../helpers/economyHelper');

router.put('/update', async (req, res) => {
  const { username, newUsername, balance } = req.body;
  try {
    const userExists = await economyHelper.getBalance(username);
    if (userExists === null) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await economyHelper.updateUser(username, { newUsername, balance });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

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
  const { username, amount } = req.body;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing username' });
  }
  if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid or missing amount' });
  }

  try {
    const newBalance = await economyHelper.earnMoney(username, amount);
    res.status(200).json({ username, balance: newBalance });
  } catch (error) {
    console.error('Error earning money:', error);
    res.status(500).json({ message: 'Error earning money', error: error.message });
  }
});


router.post('/spend', async (req, res) => {
  const { username, amount } = req.body;
  try {
    const newBalance = await economyHelper.spendMoney(username, amount);
    res.json({ username, balance: newBalance });
  } catch (error) {
    res.status(500).json({ message: 'Error spending money', error: error.message });
  }
});

router.post('/transfer', async (req, res) => {
  const { from, to, amount } = req.body;
  try {
    const { fromBalance, toBalance } = await economyHelper.transferMoney(
      from, to, amount
    );
    res.json({ from, fromBalance, to, toBalance });
  } catch (error) {
    res.status(500).json({ message: 'Error transferring money', error: error.message });
  }
});

module.exports = router;
