const Maths = require("../models/Math"); 

const getRandomMathQuestion = async () => {
  try {
    const count = await Maths.countDocuments(); 
    const randomIndex = Math.floor(Math.random() * count); 
    const randomQuestion = await Maths.findOne().skip(randomIndex);
  } catch (err) {
    throw new Error("Error fetching random math question: " + err.message);
  }
};

module.exports = {
  getRandomMathQuestion,
};
