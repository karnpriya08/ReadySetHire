const User = require('../models/User');
const jwt = require('jsonwebtoken');
const admin = require('../firebase/firebase'); 

//  Generate JWT Token for user authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // Token valid for 30 days
    expiresIn: '30d', 
  });
};

// Format user  to return only non-sensitive info
const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  contact: user.contact,
  dob: user.dob,
  provider: user.provider,
  profileImage: user.profileImage,
  resume: user.resume,
});

//  Google Login Controller
const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the Google ID token using Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;

    //  Check if user already exists in DB
    let user = await User.findOne({ email });

    //  If user doesn't exist, create a new one
    if (!user) {
      user = await User.create({
        name,
        email,
        password: Math.random().toString(36).slice(-8), // 🔒 Dummy password for fallback
        provider: 'google',
        profileImage: picture,
      });
    }

    //  Generate JWT token and return formatted user data
    const token = generateToken(user._id);
    res.json({ token, user: formatUser(user) });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ message: 'Invalid Google token', error: error.message });
  }
};

//  Register New User Controller
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //  Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //  Create a new user
    const user = await User.create({ name, email, password });

    //  Generate JWT token 
    const token = generateToken(user._id);
    res.status(201).json({ token, user: formatUser(user) });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Login Existing User Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //  Match the password 
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //  Generate JWT token and return formatted user
    const token = generateToken(user._id);
    res.json({ token, user: formatUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Export  functions
module.exports = {
  registerUser,
  loginUser,
  googleLogin,
};
