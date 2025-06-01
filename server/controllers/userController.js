
const { validationResult } = require('express-validator');

// Mock data - TODO: Replace with actual database operations
const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techsolutions.com',
    role: 'client',
    company: 'Tech Solutions Inc.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  },
  {
    id: '2',
    name: 'Jane Developer',
    email: 'jane@dev.com',
    role: 'developer',
    skills: ['React', 'Node.js', 'TypeScript', 'Python'],
    bio: 'Full-stack developer with 5+ years experience in modern web technologies',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    email: 'sarah@innovationlabs.com',
    role: 'client',
    company: 'Innovation Labs',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@bluespace.tech',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  }
];

const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let filteredUsers = mockUsers;
    
    if (role) {
      filteredUsers = mockUsers.filter(user => user.role === role);
    }

    res.json({
      success: true,
      data: filteredUsers
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user,
      message: 'User found'
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userData = req.body;
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
    };

    mockUsers.push(newUser);

    res.status(201).json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updateData };

    res.json({
      success: true,
      data: mockUsers[userIndex],
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    mockUsers.splice(userIndex, 1);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const filteredUsers = mockUsers.filter(user => user.role === role);

    res.json({
      success: true,
      data: filteredUsers,
      message: `${role}s retrieved successfully`
    });
  } catch (error) {
    console.error('Get users by role error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByRole
};
