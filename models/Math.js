// models/MathQuestion.js
const mongoose = require('mongoose');

const mathQuestionSchema = new mongoose.Schema({
  problem: String,
  level: String,
  type: String,
  solution: String,
  answer: Number
});

const MathQuestion = mongoose.model('math', mathQuestionSchema);

module.exports = MathQuestion;
