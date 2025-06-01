
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Analytics endpoints
router.get('/dashboard', analyticsController.getDashboardStats);
router.get('/projects', analyticsController.getProjectAnalytics);
router.get('/users', analyticsController.getUserAnalytics);

module.exports = router;
