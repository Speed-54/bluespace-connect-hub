
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin, validateRegistration } = require('../validation/authValidation');

// Authentication endpoints
router.post('/login', validateLogin, authController.login);
router.post('/register', validateRegistration, authController.register);

module.exports = router;
