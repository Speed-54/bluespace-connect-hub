
const { validationResult } = require('express-validator');

// Mock data - TODO: Replace with actual database operations
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

const getAllProjects = async (req, res) => {
  try {
    const { status, clientId, developerId } = req.query;
    let filteredProjects = mockProjects;

    if (status) {
      filteredProjects = filteredProjects.filter(project => project.status === status);
    }
    if (clientId) {
      filteredProjects = filteredProjects.filter(project => project.client.id === clientId);
    }
    if (developerId) {
      filteredProjects = filteredProjects.filter(project => 
        project.developers.some(dev => dev.id === developerId)
      );
    }

    res.json({
      success: true,
      data: filteredProjects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = mockProjects.find(p => p.id === id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project,
      message: 'Project found'
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const projectData = req.body;
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: 0,
      developers: projectData.developers || []
    };

    mockProjects.push(newProject);

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
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const projectIndex = mockProjects.findIndex(p => p.id === id);
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: mockProjects[projectIndex],
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = mockProjects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    mockProjects.splice(projectIndex, 1);

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
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
