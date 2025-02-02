const mongoose = require('mongoose');

// User Schema for the economy system
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
});

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = User;
