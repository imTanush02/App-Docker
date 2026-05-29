# App-Docker

A full-stack web application with a Node.js/Express frontend and Python/Flask backend, containerized using Docker for easy deployment and development.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Configuration](#environment-configuration)
- [Features](#features)

## Overview

This is a containerized full-stack application featuring:
- **Frontend**: Express.js server with EJS templating engine for rendering dynamic HTML
- **Backend**: Flask API server for handling business logic and database operations
- **Database**: MongoDB for persistent data storage
- **Containerization**: Docker support for both frontend and backend services

The application demonstrates a form submission workflow where users submit data through the frontend, which communicates with the backend API to store and retrieve submissions from MongoDB.

## Tech Stack

### Frontend
- **Node.js 18** (Alpine)
- **Express.js** - Web framework
- **EJS** - Template engine (60.2% of codebase)
- **Axios** - HTTP client
- **Morgan** - HTTP logging
- **Nodemon** - Development auto-reload

### Backend
- **Python 3.9** (Alpine)
- **Flask** - Web framework
- **PyMongo** - MongoDB driver
- **python-dotenv** - Environment variable management

### DevOps
- **Docker** - Containerization
- **Alpine Linux** - Lightweight base images

## Project Structure

```
App-Docker/
├── frontend/
│   ├── app.js              # Express server entry point
│   ├── package.json        # Node.js dependencies
│   ├── Dockerfile          # Frontend container configuration
│   └── views/              # EJS template files
│       ├── index.ejs       # Home page with form
│       ├── success.ejs     # Success page with submissions
│       └── error.ejs       # Error page
├── backend/
│   ├── app.py              # Flask server entry point
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container configuration
└── README.md               # This file
```

## Prerequisites

To run this application, you need:
- Docker and Docker Compose installed
- (Or) Node.js 18+ and Python 3.9+ for local development
- MongoDB instance (local or remote)

## Installation

### Clone the repository

```bash
git clone https://github.com/imTanush02/App-Docker.git
cd App-Docker
```

### Local Development Setup

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

## Running the Application

### Using Docker (Recommended)

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

### Local Development

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
# Server runs on port 7000 (configurable via PORT env var)
```

**Terminal 2 - Backend:**
```bash
cd backend
python app.py
# Server runs on port 5000
```

Make sure MongoDB is running and accessible.

## API Documentation

### Endpoints

#### Frontend Routes
- **GET `/`** - Displays the main form page
- **POST `/submit`** - Submits form data to backend
- **GET `/success`** - Displays all submissions

#### Backend API Routes

##### Submit Form
```
POST /api/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}

Response (201):
{
  "message": "Form submitted successfully",
  "id": "507f1f77bcf86cd799439011"
}
```

##### Get All Submissions
```
GET /api/submissions

Response (200):
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your message here"
  },
  ...
]
```

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017
FLASK_ENV=development
FLASK_APP=app.py
PYTHONUNBUFFERED=1
```

### Frontend Environment Variables

Set via Docker or process environment:

```env
PORT=3000                          # Express server port
NODE_ENV=development
BACKEND_URL=http://localhost:5000  # Backend API URL
```

## Features

✅ **Form Submission** - Users can submit forms through the frontend interface  
✅ **Data Persistence** - Submissions are stored in MongoDB  
✅ **View Submissions** - Retrieve and display all submitted data  
✅ **Error Handling** - Comprehensive error handling and validation  
✅ **Docker Support** - Both services containerized for easy deployment  
✅ **Development Tools** - Nodemon for auto-reload during development  
✅ **Logging** - Morgan HTTP request logging on frontend  

## Docker Image Details

### Frontend Dockerfile
- Base: `node:18-alpine`
- Port: 3000
- CMD: `npm run dev` (Nodemon development mode)

### Backend Dockerfile
- Base: `python:3.9-alpine`
- Port: 5000
- CMD: `flask run --host=0.0.0.0`

## Development Workflow

1. Frontend and backend run independently in separate containers
2. Frontend communicates with backend via HTTP requests
3. Backend stores/retrieves data from MongoDB
4. Both services can be scaled independently

## Troubleshooting

### Frontend can't connect to backend
- Check that `BACKEND_URL` environment variable is set correctly
- Ensure backend container is running and accessible
- Verify network connectivity between containers

### MongoDB connection errors
- Ensure MongoDB is running and accessible at `MONGODB_URI`
- Check MongoDB credentials and permissions
- Verify network access to MongoDB instance

### Port conflicts
- Change `PORT` variable for frontend (default: 3000)
- Backend uses port 5000 by default
- Modify port mappings in Dockerfile or docker-compose.yml as needed

## License

ISC

## Author

**imTanush02**

---

For more information, visit the [repository](https://github.com/imTanush02/App-Docker).
