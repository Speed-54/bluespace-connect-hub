
// Quick start script for development
// TODO: Replace with proper process manager for production

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Bluespace Backend Server...');
console.log('📁 Working directory:', __dirname);

// TODO: Add environment checks
// TODO: Add dependency validation
// TODO: Add database connection checks

const server = spawn('node', ['index.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
});

server.on('close', (code) => {
  console.log(`🔴 Server process exited with code ${code}`);
});

// TODO: Add graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGINT');
  process.exit(0);
});
