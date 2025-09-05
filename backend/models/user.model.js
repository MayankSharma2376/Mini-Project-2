const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    lowercase: true,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
  },

  role: {
    type: String,
    enum: ['volunteer', 'NGO', 'admin'],
    required: true,
    default: 'volunteer',
  },

  skills: {
    type: Array,
    default: [],
  },

  location: {
    type: String,
    required: true
  },

  bio: {
    type: String,
    default: '',
    maxLength: 400,
  },
  otp: {
    type: String
  }, // store OTP temporarily

  otpExpires: {
    type: Date,
  }
},
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
  catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', userSchema);