const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, role, skills, location, bio } = req.body;

  try {
    if (!email || !name || !password || !role || !skills || !location || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
      role,
      skills,
      location,
      bio
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.cookie("token", token, { httpOnly: true });
    return res.status(201).json({ 
      success: true, 
      user: newUser,
      token: token 
    });
  }
  catch (error) {
    console.error('Error in controller: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ 
      success: true, 
      user: user,
      token: token 
    });
  }
  catch (error) {
    console.error('Error in controller: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error('Error in controller: ', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  logout
};