const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./models/blog');
const blogData = require('./blog.json');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('MongoDB Connected...');
  // Clear existing data
  await Blog.deleteMany();
  // Insert new data
  await Blog.insertMany(blogData);

  console.log('Blog data imported!');
  process.exit();
})
  // handle error 
  .catch((err) => {
    console.error('Error importing data:', err);
    process.exit(1);
  });
