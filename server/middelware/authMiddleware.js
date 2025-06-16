const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware to protect routes by verifying JWT
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from the header
      token = req.headers.authorization.split(' ')[1];
      // verify token 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      //  If token verification fails, send unauthorized
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  // if there is no token then send it unauthorised and won't allow 
  if (!token) {
    return res.status(401).json({ message: 'No token, not authorized' });
  }
};

module.exports = protect;