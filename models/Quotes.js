// models/Quote.js
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
  category: [String],
});

const Quote = mongoose.model('quote', quoteSchema);

module.exports = Quote;
