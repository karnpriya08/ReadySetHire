const express = require('express');
const router = express.Router();
const  {scheduleInterview, getUserInterview, markInterviewCompleted}  = require('../controllers/interviewController');
const protect = require('../middelware/authMiddleware');

// schedule new interview
router.post('/', protect, scheduleInterview); 

// fetch user interview upcoming / completed
router.get('/', protect ,getUserInterview)

// marking interview complete 
router.put('/:id/complete',protect, markInterviewCompleted)

module.exports = router;