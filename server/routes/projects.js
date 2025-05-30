
const express = require('express');
const router = express.Router();
// TODO: Add your MongoDB connection and Project model here
// const Project = require('../models/Project');
// const User = require('../models/User');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { status, clientId, developerId } = req.query;

    // TODO: Replace with actual database query
    // let query = {};
    // if (status) query.status = status;
    // if (clientId) query.clientId = clientId;
    // if (developerId) query.developers = { $in: [developerId] };
    // const projects = await Project.find(query).populate('client developers');

    // Mock data for now
    const mockProjects = [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Modern e-commerce platform with React and Node.js',
        status: 'active',
        client: {
          id: '1',
          name: 'John Smith',
          email: 'john@techsolutions.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
        },
        developers: [
          {
            id: '2',
            name: 'Jane Developer',
            email: 'jane@dev.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
            skills: ['React', 'Node.js', 'TypeScript']
          }
        ],
        budget: 15000,
        deadline: '2024-08-15',
        createdAt: '2024-06-01',
        updatedAt: '2024-06-15',
        progress: 65
      },
      {
        id: '2',
        title: 'Mobile App MVP',
        description: 'Cross-platform mobile application using React Native',
        status: 'active',
        client: {
          id: '3',
          name: 'Sarah Wilson',
          email: 'sarah@innovationlabs.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
        },
        developers: [],
        budget: 8000,
        deadline: '2024-07-20',
        createdAt: '2024-05-15',
        updatedAt: '2024-06-10',
        progress: 30
      }
    ];

    res.json({
      success: true,
      data: mockProjects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Replace with actual database query
    // const project = await Project.findById(id).populate('client developers');

    res.json({
      success: true,
      data: null, // TODO: Return actual project data
      message: 'Project found'
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const projectData = req.body;

    if (!projectData.title || !projectData.client || !projectData.budget) {
      return res.status(400).json({
        success: false,
        message: 'Title, client, and budget are required'
      });
    }

    // TODO: Replace with actual database operations
    // const newProject = new Project({
    //   ...projectData,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   progress: 0
    // });
    // await newProject.save();

    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      developers: projectData.developers || []
    };

    res.status(201).json({
      success: true,
      data: newProject,
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // TODO: Replace with actual database operations
    // const project = await Project.findByIdAndUpdate(
    //   id, 
    //   { ...updateData, updatedAt: new Date() }, 
    //   { new: true }
    // ).populate('client developers');

    res.json({
      success: true,
      data: { id, ...updateData, updatedAt: new Date().toISOString() },
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Replace with actual database operations
    // await Project.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ADMIN FUNCTIONALITY: Link developer to project
router.post('/:id/assign-developer', async (req, res) => {
  try {
    const { id } = req.params;
    const { developerId } = req.body;

    if (!developerId) {
      return res.status(400).json({
        success: false,
        message: 'Developer ID is required'
      });
    }

    // TODO: Replace with actual database operations
    // const project = await Project.findById(id);
    // const developer = await User.findById(developerId);
    
    // if (!project || !developer) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Project or developer not found'
    //   });
    // }

    // if (developer.role !== 'developer') {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'User is not a developer'
    //   });
    // }

    // // Check if developer is already assigned
    // if (project.developers.includes(developerId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Developer already assigned to this project'
    //   });
    // }

    // project.developers.push(developerId);
    // project.updatedAt = new Date();
    // await project.save();

    // const updatedProject = await Project.findById(id).populate('client developers');

    res.json({
      success: true,
      data: {
        id,
        developerId,
        message: 'Developer assigned successfully'
      },
      message: 'Developer assigned to project successfully'
    });
  } catch (error) {
    console.error('Assign developer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ADMIN FUNCTIONALITY: Remove developer from project
router.delete('/:id/remove-developer/:developerId', async (req, res) => {
  try {
    const { id, developerId } = req.params;

    // TODO: Replace with actual database operations
    // const project = await Project.findById(id);
    
    // if (!project) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Project not found'
    //   });
    // }

    // project.developers = project.developers.filter(dev => dev.toString() !== developerId);
    // project.updatedAt = new Date();
    // await project.save();

    res.json({
      success: true,
      message: 'Developer removed from project successfully'
    });
  } catch (error) {
    console.error('Remove developer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get projects by client
router.get('/client/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;

    // TODO: Replace with actual database query
    // const projects = await Project.find({ clientId }).populate('client developers');

    res.json({
      success: true,
      data: [], // TODO: Return actual client projects
      message: 'Client projects retrieved successfully'
    });
  } catch (error) {
    console.error('Get client projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get projects by developer
router.get('/developer/:developerId', async (req, res) => {
  try {
    const { developerId } = req.params;

    // TODO: Replace with actual database query
    // const projects = await Project.find({ developers: { $in: [developerId] } }).populate('client developers');

    res.json({
      success: true,
      data: [], // TODO: Return actual developer projects
      message: 'Developer projects retrieved successfully'
    });
  } catch (error) {
    console.error('Get developer projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
