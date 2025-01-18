const mongoose = require('mongoose');

const bibleVerseSchema = new mongoose.Schema({
  citation: { type: String, required: true },
  book: { type: String, required: true },
  chapter: { type: Number, required: true },
  verse: { type: Number, required: true },
  text: { type: String, required: true }
});

const BibleVerse = mongoose.model('verse', bibleVerseSchema);

module.exports = BibleVerse;
