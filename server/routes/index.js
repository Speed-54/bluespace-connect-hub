
const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./users');
const projectRoutes = require('./projects');
const authRoutes = require('./auth');
const analyticsRoutes = require('./analytics');

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;
