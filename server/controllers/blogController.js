const Blog = require('../models/blog');

const getBlogs = async (req, res) => {
  try {
    // get category from query string 
    const category = req.query.category;
    let blogs;

    // finding blogs by category 
    if (category) {
      blogs = await Blog.find({ category });
    } else {
      // if not specified return all 
      blogs = await Blog.find();
    }
    res.status(200).json(blogs);
    // handling error 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// creating a blog 
const createBlog = async (req, res) => {
  // get blog data by req body 
  const { title, content, category, image } = req.body;

  try {
    // creating new blog
    const newBlog = new Blog({ title, content, category, image });
    // saving it to DB
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
}
module.exports = {
  createBlog,
  getBlogs
}