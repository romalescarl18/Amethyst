const Sciences = require("../models/Science"); // Assuming you have a Quote model

const getRandomScienceQuestion = async () => {
  try {
    const count = await Sciences.countDocuments(); // Get the total number of quotes in the collection
    const randomIndex = Math.floor(Math.random() * count); // Random index
    const randomQuestion = await Sciences.findOne().skip(randomIndex); // Get a random quote by skipping the random index
    return randomQuestion;
  } catch (err) {
    throw new Error("Error fetching random science question: " + err.message);
  }
};

module.exports = {
  getRandomScienceQuestion,
};
