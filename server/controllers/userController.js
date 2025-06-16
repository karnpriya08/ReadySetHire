const User = require('../models/User');

// getting user by id 
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        // check for user requested aunthentication 
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    // handling error 
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// updating user profile with id
const updateUserProfile = async (req, res) => {
    try {
        // getting data by req body 
        const { name, contact, dob, profileImage } = req.body;
        // find user by id and check authenticating request
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" })

        // send the data 
        user.name = name || user.name;
        user.contact = contact || user.contact;
        user.dob = dob || user.dob;
        user.profileImage = profileImage || user.profileImage;

        // save to DB
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    // error handling 
    catch (err) {
        res.status(500).json({ message: "update failed", error: err.message })
    }
}

// resume uploading 
const uploadResume = async (req, res) => {
    try {
        console.log('FILE RECEIVED:', req.file);
        console.log('USER:', req.user);
        // find user by id 
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Old Resume Path:", user.resume);
        // save path to DB
        user.resume = req.file.path;
        // save path to DB
        const updated = await user.save();
        console.log("✅ New Resume Path Saved:", updated.resume);
        res.status(200).json({ message: "Resume Upload Sucessfully", resumePath: updated.resume });
    }
    // handle error 
    catch (err) {
        res.status(500).json({ message: 'Not able to Upload Resume', error: err.message })
    }
}

// image upload 
const uploadProfileImage = async (req, res) => {
    try {
        // if there is no file 
        if (!req.file) {
            return res.status(400).json({ message: "No file Uploaded" })
        }

        // authenticating user req
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // save image path to DB
        const imagePath = `/uploads/profileImages/${req.file.filename}`;
        user.profileImage = imagePath;
        await user.save();
        res.status(200).json({ message: "Image uploaded and saved", imagePath });
    }
    // error handling
    catch (error) {
        res.status(500).json({ message: "Image upload failed ", error: error.message })
    }
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    uploadResume,
    uploadProfileImage
}