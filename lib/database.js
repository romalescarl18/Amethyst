const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);

    console.log('MongoDB connected', mongoose.connection.name);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
