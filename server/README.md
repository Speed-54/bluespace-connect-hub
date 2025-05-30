
# BlueSpace Backend API

This is the backend API for the BlueSpace platform that handles user management, project management, and developer-client linking functionality.

## Features

- User authentication and authorization
- User management (CRUD operations)
- Project management with developer-client linking
- Analytics and dashboard statistics
- Role-based access control (Admin, Client, Developer)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string
   - Set your JWT secret key
   - Configure other environment variables as needed

3. **Database Setup**
   - Make sure MongoDB is running on your system
   - The application will create the database automatically
   - Update the connection string in `.env` file

4. **Start the Server**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users (with optional role filter)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/role/:role` - Get users by role

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/assign-developer` - Assign developer to project (Admin)
- `DELETE /api/projects/:id/remove-developer/:developerId` - Remove developer from project (Admin)
- `GET /api/projects/client/:clientId` - Get projects by client
- `GET /api/projects/developer/:developerId` - Get projects by developer

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/projects` - Get project analytics
- `GET /api/analytics/users` - Get user analytics

## Database Models

### User Model
- name, email, password, role, avatar, company, skills, bio, isActive

### Project Model
- title, description, status, client, developers, budget, deadline, progress, tasks

## Key Features for Admin

### Developer-Client Linking
The admin can link developers to clients through projects:

1. **Create Project**: Admin creates a project and assigns it to a client
2. **Assign Developer**: Admin can assign one or more developers to the project
3. **Manage Assignments**: Admin can add/remove developers from projects
4. **Track Progress**: Monitor project progress and developer performance

## TODO Items

Replace all TODO comments in the code with actual database operations:

1. **Database Connection**: Update `config/database.js` with your MongoDB setup
2. **Authentication**: Implement JWT token generation and validation
3. **Database Queries**: Replace mock data with actual MongoDB queries
4. **Error Handling**: Add comprehensive error handling
5. **Validation**: Add input validation for all endpoints
6. **Testing**: Add unit and integration tests

## Security Considerations

- Implement proper input validation
- Use HTTPS in production
- Implement rate limiting
- Add request logging
- Secure JWT token handling
- Implement proper CORS policies

## Directory Structure

```
server/
├── config/
│   └── database.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── Project.js
├── routes/
│   ├── index.js
│   ├── auth.js
│   ├── users.js
│   ├── projects.js
│   └── analytics.js
├── index.js
├── package.json
├── .env.example
└── README.md
```
