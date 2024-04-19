const mongoose = require('mongoose');
require("dotenv").config();

const MONGODB_URI = process.env.REACT_APP_MONGO_DB_URI;

const connectToDatabase = async () => {
  try {
    const mongodbConnection = await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Failed to connect to MongoDB database: " + e.message);
    console.log(err.message)
  }
};

module.exports = connectToDatabase;
