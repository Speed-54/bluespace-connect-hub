
const { validationResult } = require('express-validator');

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

    // TODO: Replace with actual database query and password verification
    // const user = await User.findOne({ email });
    // if (!user || !user.comparePassword(password)) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Invalid credentials'
    //   });
    // }

    // Mock response for now
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

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUser,
        token: 'mock-jwt-token' // TODO: Generate actual JWT token
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
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).json({
    //     success: false,
    //     message: 'User already exists'
    //   });
    // }

    // const newUser = new User({
    //   name, email, password, role, company, skills, bio
    // });
    // await newUser.save();

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

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: newUser,
        token: 'mock-jwt-token' // TODO: Generate actual JWT token
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
