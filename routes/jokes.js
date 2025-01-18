/**
 * @swagger
 * tags:
 *   - name: Jokes API
 *     description: All joke-related endpoints
 */

const express = require('express');
const router = express.Router();
const jokeService = require('../helpers/jokeHelper');

/**
 * @swagger
 * /api/jokes/random:
 *   get:
 *     summary: Get a random joke
 *     description: Returns a random joke from the jokes collection
 *     tags:
 *       - Jokes API
 *     responses:
 *       200:
 *         description: A random joke
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 joke:
 *                   type: string
 *                   example: "Why don't skeletons fight each other? They don't have the guts."
 *       500:
 *         description: Internal server error
 */ 
router.get('/random', async (req, res) => {
  try {
    const joke = await jokeService.getRandomJoke();
    res.json({
      id: joke.ID,
      Joke: joke.Joke
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching joke', error: error.message });
  }
});

/**
 * @swagger
 * /api/jokes/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     description: Returns a specific joke by its ID
  *     tags:
 *       - Jokes API
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the joke
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: A specific joke
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 joke:
 *                   type: string
 *                   example: "Why don't skeletons fight each other? They don't have the guts."
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Internal server error
 */

router.get('/:id', async (req, res) => {
  const { id } = req.params; 

  try {
    const joke = await jokeService.getJokeById(id); 
    if (!joke) {
      return res.status(404).json({ message: 'Joke not found' });  
    }
    res.json({
      ID: joke.ID,
      Joke: joke.Joke
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching joke', error: error.message });
  }
});

module.exports = router;
