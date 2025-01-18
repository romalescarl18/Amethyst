/**
 * @swagger
 * tags:
 *   - name: Math Questions API
 *     description: Random math related questions
 */

const express = require('express');
const router = express.Router();
const mathQuestionHelper = require('../helpers/mathHelper');

/**
 * @swagger
 * /api/math/random:
 *   get:
 *     summary: Get a random math question
 *     description: Returns a random math question from the math questions collection
 *     tags:
 *       - Math Questions API
 *     responses:
 *       200:
 *         description: A random math question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 problem:
 *                   type: string
 *                   example: "How many four-digit integers are less than 8000 and greater than 2000?"
 *                 level:
 *                   type: string
 *                   example: "Level 3"
 *                 type:
 *                   type: string
 *                   example: "Prealgebra"
 *                 solution:
 *                   type: string
 *                   example: "We must count the numbers in the list [2001, 2002, 2003, ..., 7999]"
 *                 answer:
 *                   type: integer
 *                   example: 5999
 *       500:
 *         description: Internal server error
 */
router.get('/random', async (req, res) => {
  try {
    const randomQuestion = await mathQuestionHelper.getRandomMathQuestion();
    if (!randomQuestion) {
      return res.status(404).json({ message: 'No math questions found' });
    }
    res.json({
      problem: randomQuestion.problem,
      level: randomQuestion.level,
      type: randomQuestion.type,
      solution: randomQuestion.solution,
      answer: randomQuestion.answer
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching math question', error: error.message });
  }
});

module.exports = router;
