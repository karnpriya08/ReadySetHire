const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  profileImage: {
    type: String,
  },
  name: {
     type: String, 
     required: true 
    },
  email: { 
    type: String, 
    required: true, 
    unique: true
 },
  password: { 
    type: String, 
    required: true 
},
  contact: { 
    type: String 
},
  dob: { 
    type: Date
   },
  provider: {
     type: String,
      default: 'email' 
    },
  resume: {
    type: String,
  },
});

// Hash password before saving in DB
userSchema.pre('save', async function (next) {
  // prevent re-hashing skip if passwordis unchanged 
  if (!this.isModified('password')) return next();
  // hash the password 
  this.password = await bcrypt.hash(this.password, 10);
  // saving password 
  next();
});

//When a user logs in compare the password  entered with the stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);