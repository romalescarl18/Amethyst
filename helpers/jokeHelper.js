const Jokes = require('../models/Jokes');

const getRandomJoke = async () => {
  try {
    const count = await Jokes.countDocuments();  
    if (count === 0) {
      throw new Error('No jokes found in the database');
    }
    
    const randomIndex = Math.floor(Math.random() * count);  
    const joke = await Jokes.findOne().skip(randomIndex);  
    return joke;
  } catch (err) {
    throw new Error('Error fetching random joke: ' + err.message);
  }
};

const getJokeById = async (id) => {
  try {
    const joke = await Jokes.findOne({ ID: id });  
    return joke;  
  } catch (err) {
    throw new Error('Error fetching joke: ' + err.message);
  }
};

module.exports = {
  getRandomJoke,
  getJokeById
};
