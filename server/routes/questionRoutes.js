const express= require('express');
const router = express.Router();
const question = require ('../controllers/questionController')

// routes for practice resources questions 
router.get('/',question.getQuestions);

module.exports =router;