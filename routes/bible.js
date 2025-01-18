/**
 * @swagger
 * tags:
 *   - name: Bible Verses API
 *     description: Endpoints for Bible verses in the collection
 */

const express = require('express');
const router = express.Router();
const bibleHelper = require('../helpers/bibleHelper');

/**
 * @swagger
 * /api/bibleVerses/random:
 *   get:
 *     summary: Get a random Bible verse
 *     description: Returns a random Bible verse from the collection
 *     tags:
 *       - Bible Verses API
 *     responses:
 *       200:
 *         description: A random Bible verse
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 citation:
 *                   type: string
 *                   example: "Genesis 1:1"
 *                 book:
 *                   type: string
 *                   example: "Genesis"
 *                 chapter:
 *                   type: integer
 *                   example: 1
 *                 verse:
 *                   type: integer
 *                   example: 1
 *                 text:
 *                   type: string
 *                   example: "In the beginning God created the heaven and the earth."
 *       500:
 *         description: Internal server error
 */

router.get('/random', async (req, res) => {
  try {
    const verse = await bibleHelper.getRandomVerse();  
    if (!verse) {
      return res.status(404).json({ message: 'Bible verse not found' });
    }
    res.json({
      citation: verse.citation,
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Bible verse', error: error.message });
  }
});

/**
 * @swagger
 * /api/bibleVerses/{book}/{chapter}/{verse}:
 *   get:
 *     summary: Get a Bible verse by book, chapter, and verse
 *     description: Returns a specific Bible verse based on the book, chapter, and verse
 *     tags:
 *       - Bible Verses API
 *     parameters:
 *       - in: path
 *         name: book
 *         required: true
 *         description: The name of the book
 *         schema:
 *           type: string
 *           example: "Genesis"
 *       - in: path
 *         name: chapter
 *         required: true
 *         description: The chapter number
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: verse
 *         required: true
 *         description: The verse number
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A specific Bible verse
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 citation:
 *                   type: string
 *                   example: "Genesis 1:1"
 *                 book:
 *                   type: string
 *                   example: "Genesis"
 *                 chapter:
 *                   type: integer
 *                   example: 1
 *                 verse:
 *                   type: integer
 *                   example: 1
 *                 text:
 *                   type: string
 *                   example: "In the beginning God created the heaven and the earth."
 *       404:
 *         description: Verse not found
 *       500:
 *         description: Internal server error
 */

router.get('/:book/:chapter/:verse', async (req, res) => {
    let { book, chapter, verse } = req.params;  // Extract parameters from the URL
  
    // Normalize the book name to lowercase
    book = book.charAt(0).toUpperCase() + book.slice(1).toLowerCase();  // Title case: "genesis" becomes "Genesis"
  
    try {
      const verseData = await bibleHelper.getVerseByCitation(book, chapter, verse);  // Fetch the verse based on the reference
      if (!verseData) {
        return res.status(404).json({ message: 'Bible verse not found' });  // If no verse is found, return a 404
      }
      res.json({
        citation: verseData.citation,
        book: verseData.book,
        chapter: verseData.chapter,
        verse: verseData.verse,
        text: verseData.text
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Bible verse', error: error.message });
    }
  });

module.exports = router;
