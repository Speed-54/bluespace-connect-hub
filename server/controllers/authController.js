
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  // TODO: Move JWT_SECRET to environment variables
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret-key', {
    expiresIn: '7d'
  });
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, role } = req.body;

    // TODO: Implement proper database connection
    // For now, using mock data until database is connected
    
    // TODO: Replace with actual database query
    // const user = await User.findOne({ email });
    // if (!user || !await user.comparePassword(password)) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Invalid credentials'
    //   });
    // }

    // Mock user validation - TODO: Replace with real authentication
    if (email !== 'demo@bluespace.tech' && password !== 'demo123') {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Mock user data - TODO: Replace with actual user from database
    const mockUser = {
      id: Date.now().toString(),
      name: role === 'client' ? 'John Client' : role === 'admin' ? 'Admin User' : 'Jane Developer',
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      company: role === 'client' ? 'Tech Solutions Inc.' : undefined,
      skills: role === 'developer' ? ['React', 'Node.js', 'TypeScript'] : undefined,
      bio: role === 'developer' ? 'Full-stack developer with 5+ years experience' : undefined
    };

    // TODO: Generate proper JWT token with user data
    const token = generateToken(mockUser.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUser,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password, role, company, skills, bio } = req.body;

    // TODO: Replace with actual database operations
    // TODO: Check if user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).json({
    //     success: false,
    //     message: 'User already exists'
    //   });
    // }

    // TODO: Hash password properly
    // const hashedPassword = await bcrypt.hash(password, 12);

    // TODO: Create new user in database
    // const newUser = new User({
    //   name, 
    //   email, 
    //   password: hashedPassword, 
    //   role, 
    //   company, 
    //   skills, 
    //   bio
    // });
    // const savedUser = await newUser.save();

    // Mock user creation - TODO: Replace with actual database save
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      company,
      skills,
      bio
    };

    // TODO: Generate proper JWT token
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: newUser,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  login,
  register
};
