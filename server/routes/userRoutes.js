const express = require('express');
const router = express.Router();
const {getUserProfile, updateUserProfile,uploadResume, uploadProfileImage} = require('../controllers/userController')
const protect = require('../middelware/authMiddleware');
const upload = require('../middelware/upload');
const uploadImage = require ('../middelware/imageUpload');

// getting profile
router.get('/profile', protect, getUserProfile);
// updating profile
router.put('/profile', protect ,updateUserProfile);
// uploading resume 
router.post('/upload-resume', protect ,upload.single('resume'), uploadResume);
// uploading profileImage
router.post('/upload-image', protect, uploadImage.single('image'), uploadProfileImage)

module.exports = router;