const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // connect with mongourl and console it 
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    // handling error 
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;