
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUserCreation, validateUserUpdate } = require('../validation/userValidation');

// Basic CRUD operations
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUserCreation, userController.createUser);
router.put('/:id', validateUserUpdate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Filtered queries
router.get('/role/:role', userController.getUsersByRole);

module.exports = router;
