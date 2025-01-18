const Quote = require('../models/Quotes');  
const getRandomQuote = async () => {
  try {
    const count = await Quote.countDocuments();  
    const randomIndex = Math.floor(Math.random() * count);  
    const randomQuote = await Quote.findOne().skip(randomIndex);  
    return randomQuote;
  } catch (err) {
    throw new Error('Error fetching random quote: ' + err.message);
  }
};

module.exports = {
  getRandomQuote
};
