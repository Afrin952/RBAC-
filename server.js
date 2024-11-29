// server.js
require('dotenv').config();  // This will load the environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json()); // for parsing application/json

// Import the routes for authentication
const authRoute = require('./routes/auth'); // Correct import statement

app.use('/api/auth', authRoute); // This should work if auth.js exports the router

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
