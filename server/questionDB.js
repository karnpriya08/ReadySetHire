
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/question');
const questionsData = require('./questions.json');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('MongoDB connected');
  // clear existing data
  await Question.deleteMany();
  // insert new data
  await Question.insertMany(questionsData);
  console.log('Questions imported successfully!');
  process.exit();
})
  // handle error 
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });
