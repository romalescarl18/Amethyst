/**
 * @swagger
 * tags:
 *   - name: Quotes API
 *     description: All quote-related endpoints
 */

const express = require('express');
const router = express.Router();
const quoteHelper = require('../helpers/quoteHelper');

/**
 * @swagger
 * /api/quotes/random:
 *   get:
 *     summary: Get a random quote
 *     description: Returns a random quote from the quotes collection
 *     tags:
 *       - Quotes API
 *     responses:
 *       200:
 *         description: A random quote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quote:
 *                   type: string
 *                   example: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control, and at times hard to handle."
 *                 author:
 *                   type: string
 *                   example: "Marilyn Monroe"
 *                 category:
 *                   type: string
 *                   example: "life, love, mistakes"
 *       500:
 *         description: Internal server error
 */

router.get('/random', async (req, res) => {
  try {
    const randomQuote = await quoteHelper.getRandomQuote();
    if (!randomQuote) {
      return res.status(404).json({ message: 'No quotes found' });
    }
    res.json({
      quote: randomQuote.quote,
      author: randomQuote.author,
      category: randomQuote.category
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote', error: error.message });
  }
});

module.exports = router;
