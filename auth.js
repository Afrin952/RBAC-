// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send('User already exists.');

    const user = new User({ email, password, role });
    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials.');

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) return res.status(400).send('Invalid credentials.');

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Protected Route (Admin only)
router.get('/admin', authenticateJWT, authorizeRole('Admin'), (req, res) => {
  res.send('Hello Admin, you have access to this route.');
});

// Protected Route (Moderator only)
router.get('/moderator', authenticateJWT, authorizeRole('Moderator'), (req, res) => {
  res.send('Hello Moderator, you have access to this route.');
});

// Protected Route (User can access own data)
router.get('/user', authenticateJWT, (req, res) => {
  res.send(`Hello User, your ID is ${req.user.id}`);
});

// Export the router
module.exports = router;
