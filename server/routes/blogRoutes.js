const express = require('express');
const router = express.Router();
const { getBlogs, createBlog } = require('../controllers/blogController');

// Get all blogs (with optional category filter)
router.get('/', getBlogs);

// Admin route to create a blog
router.post('/', createBlog);

module.exports = router;
