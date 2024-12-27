const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registration API
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login API
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, userId: user._id });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(400).json({ message: 'Invalid token' });
  }
};

// User Profile Endpoint
router.get('/user-profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ username: user.username, email: user.email, score: user.score || 0 });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
