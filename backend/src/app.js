const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { protect } = require('./middleware/authMiddleware');
// protect is imported from middleware to add the auth nd userId in the other api endpoints 
const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/dashboard', protect, dashboardRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'LifeOS API is running.'
  });
});

module.exports = app;