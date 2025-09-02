const express = require('express');
const { login, register, logout } = require('../controllers/auth.controller');
const { sendOtp, verifyOtp, resetPassword } = require('../controllers/reset.controller.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Forgot password flow
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;