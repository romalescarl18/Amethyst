const BibleVerse = require('../models/BibleVerse');

const getRandomVerse = async () => {
  try {
    const count = await BibleVerse.countDocuments();  
    if (count === 0) {
      throw new Error('No Bible verses found');
    }

    const randomIndex = Math.floor(Math.random() * count); 
    const verse = await BibleVerse.findOne().skip(randomIndex); 
    return verse;
  } catch (err) {
    throw new Error('Error fetching random Bible verse: ' + err.message);
  }
};

const getVerseByCitation = async (book, chapter, verse) => {
    try {
        // Query the database with a case-insensitive regular expression for the book
        const verseData = await BibleVerse.findOne({
          book: { $regex: new RegExp(book, 'i') },  // Case-insensitive query
          chapter,
          verse
        });
        return verseData;
      } catch (err) {
        throw new Error('Error fetching Bible verse: ' + err.message);
      }
    };

module.exports = {
  getRandomVerse,
  getVerseByCitation
};
