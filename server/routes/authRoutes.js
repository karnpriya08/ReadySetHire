const express = require('express');
const router = express.Router();
const { registerUser, loginUser,googleLogin } = require('../controllers/authController');

// register
router.post('/register', registerUser);
// login
router.post('/login', loginUser);
//  Google login
router.post('/google-login', googleLogin);

module.exports = router;