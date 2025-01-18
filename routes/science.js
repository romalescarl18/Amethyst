/**
 * @swagger
 * tags:
 *   - name: Science Questions API
 *     description: Random science related questions
 */

const express = require('express');
const router = express.Router();
const scienceQuestionHelper = require('../helpers/scienceHelper');

/**
 * @swagger
 * /api/science/random:
 *   get:
 *     summary: Get a random science question
 *     description: Returns a random science question from the science questions collection
 *     tags:
 *       - Science Questions API
 *     responses:
 *       200:
 *         description: A random science question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   type: string
 *                   example: "An astronomer observes that a planet rotates faster after a meteorite impacts it. What will happen to the planet?"
 *                 choices:
 *                   type: object
 *                   example: {
 *                     "text": ["Planetary density will decrease.", "Planetary temperature will rise.", "Planetary rotation speed will increase.", "Planetary mass will increase."]
 *                   }
 *                 answerKey:
 *                   type: string
 *                   example: "C"
 *       500:
 *         description: Internal server error
 */

router.get('/random', async (req, res) => {
  try {
    const randomQuestion = await scienceQuestionHelper.getRandomScienceQuestion();
    if (!randomQuestion) {
      return res.status(404).json({ message: 'No science questions found' });
    }
    res.json({
      id: randomQuestion.id,
      question: randomQuestion.question,
      choices: randomQuestion.choices,
      answerKey: randomQuestion.answerKey
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching science question', error: error.message });
  }
});

module.exports = router;
