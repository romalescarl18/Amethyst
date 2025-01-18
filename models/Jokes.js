// models/Joke.js
const mongoose = require('mongoose');

const jokesSchema = new mongoose.Schema({
  ID: { type: Number },
  Joke: { type: String, required: true },
});

const Jokes = mongoose.model('Jokes', jokesSchema);

module.exports = Jokes;
