// services/jokeService.js
const Jokes = require('../models/Jokes');

const getRandomJoke = async () => {
  try {
    const count = await Jokes.countDocuments();  // Count how many jokes are in the DB
    if (count === 0) {
      throw new Error('No jokes found in the database');
    }
    
    const randomIndex = Math.floor(Math.random() * count);  // Generate a random index

    const joke = await Jokes.findOne().skip(randomIndex);  // Fetch the joke at the random index
    return joke;
  } catch (err) {
    throw new Error('Error fetching random joke: ' + err.message);
  }
};

const getJokeById = async (id) => {
  try {
    const joke = await Jokes.findOne({ ID: id });  // Query MongoDB for the joke with the matching ID
    return joke;  // Return the found joke
  } catch (err) {
    throw new Error('Error fetching joke: ' + err.message);
  }
};

module.exports = {
  getRandomJoke,
  getJokeById
};
