// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://officialsampfreeph:SampFreePH2024@amethyst.gxth8pc.mongodb.net/datasets?retryWrites=true&w=majority&appName=Amethyst");

    console.log('MongoDB connected', mongoose.connection.name);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
