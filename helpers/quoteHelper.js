const Quote = require('../models/Quotes');  // Assuming you have a Quote model

const getRandomQuote = async () => {
  try {
    const count = await Quote.countDocuments();  // Get the total number of quotes in the collection
    const randomIndex = Math.floor(Math.random() * count);  // Random index
    const randomQuote = await Quote.findOne().skip(randomIndex);  // Get a random quote by skipping the random index
    return randomQuote;
  } catch (err) {
    throw new Error('Error fetching random quote: ' + err.message);
  }
};

module.exports = {
  getRandomQuote
};
