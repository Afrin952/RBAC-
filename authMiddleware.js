// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token (Bearer <token>)
  if (!token) return res.status(403).send('Access denied. No token provided.');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user; // Attach the user to the request object
    next();
  });
};

// Authorization Middleware (Check for roles)
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send('Access denied. You do not have permission.');
    }
    next();
  };
};

module.exports = { authenticateJWT, authorizeRole };
