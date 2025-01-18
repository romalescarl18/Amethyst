const Sciences = require("../models/Science"); 

const getRandomScienceQuestion = async () => {
  try {
    const count = await Sciences.countDocuments(); 
    const randomIndex = Math.floor(Math.random() * count); 
    const randomQuestion = await Sciences.findOne().skip(randomIndex); 
    return randomQuestion;
  } catch (err) {
    throw new Error("Error fetching random science question: " + err.message);
  }
};

module.exports = {
  getRandomScienceQuestion,
};
