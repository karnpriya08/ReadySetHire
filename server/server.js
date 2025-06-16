const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
// db connection
const connectDB = require('./config/db');
connectDB();

// importing  routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const questionRoutes = require('./routes/questionRoutes');
const blogRoutes = require('./routes/blogRoutes');


const app = express();
const port = process.env.PORT || 3002;

// middleware
app.use(express.json());
app.use(cors());

// for testing 
// app.use((req, res, next) => {
//     console.log(` Incoming: ${req.method} ${req.originalUrl}`);
//     next();
// });

// routes middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// main route  for testing 
app.get('/', (req, res) => {
    res.send('API is running...');
})


//  Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  }
  
  // Export app for testing
  module.exports = app;