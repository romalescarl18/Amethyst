const Maths = require("../models/Math"); // Assuming you have a Quote model

const getRandomMathQuestion = async () => {
  try {
    const count = await Maths.countDocuments(); // Get the total number of quotes in the collection
    const randomIndex = Math.floor(Math.random() * count); // Random index
    const randomQuestion = await Maths.findOne().skip(randomIndex); // Get a random quote by skipping the random index
    return randomQuestion;
  } catch (err) {
    throw new Error("Error fetching random math question: " + err.message);
  }
};

module.exports = {
  getRandomMathQuestion,
};
