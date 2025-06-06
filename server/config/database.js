
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // TODO: Replace with your actual MongoDB connection string
    // TODO: Add proper environment variable for production
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bluespace', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // TODO: Add connection event listeners for better error handling
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    // TODO: Implement proper fallback mechanism
    console.log('Running without database connection for now');
    // process.exit(1); // Commented out to allow app to run without DB
  }
};

module.exports = connectDB;
