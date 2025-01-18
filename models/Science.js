// models/ScienceQuestion.js
const mongoose = require('mongoose');

const scienceQuestionSchema = new mongoose.Schema({
  id: String,
  question: String,
  choices: [String],
  answerKey: String,
});

const ScienceQuestion = mongoose.model('science', scienceQuestionSchema);

module.exports = ScienceQuestion;
