
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const projectAdminController = require('../controllers/projectAdminController');
const { validateProjectCreation, validateProjectUpdate } = require('../validation/projectValidation');

// Basic CRUD operations
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', validateProjectCreation, projectController.createProject);
router.put('/:id', validateProjectUpdate, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Admin functionality
router.post('/:id/assign-developer', projectAdminController.assignDeveloperToProject);
router.delete('/:id/remove-developer/:developerId', projectAdminController.removeDeveloperFromProject);

// Filtered queries
router.get('/client/:clientId', projectAdminController.getProjectsByClient);
router.get('/developer/:developerId', projectAdminController.getProjectsByDeveloper);

module.exports = router;
