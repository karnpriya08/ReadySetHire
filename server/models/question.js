const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
     type: String, 
     enum: ['frontend', 'backend', 'fullstack', 'behavioral'] 
    },
    question: {
     type :  String,
    },
  answer: {
    type: String
    }
});

module.exports = mongoose.model('Question', questionSchema);