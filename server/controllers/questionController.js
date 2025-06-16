const Question = require('../models/question');

const getQuestions = async (req, res) => {
  // get query from requested URL
  const { category, page = 1, limit = 10 } = req.query;
  // filter by category 
  const query = category ? { category } : {};

  try {
    // fetch questions based on query  with pagination and filtering
    const questions = await Question.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Question.countDocuments(query);

    // send paginated response 
    res.status(200).json({  page: Number(page), totalPages: Math.ceil(total / limit),
      totalQuestions: total, questions
    });
    // error handling 
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questions', error: err.message });
  }
};

module.exports = { getQuestions };