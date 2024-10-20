# Full-Stack To-Do List Application

This is a full-stack To-Do List application with a ReactJS and BootStrap for frontend and a NodeJS backend using MongoDB for data persistence. 
The app allows users to create, view, update and mark tasks as complete/incomplete. It also features user authentication for a personalized task list.

## Project Structure

### Backend (NodeJS)
- **`/backend`**
  - `index.js`: Main entry point for the backend server.
  - `app.js`: For setting up express and CORS.
  - `models/`: Contains Mongoose schemas for MongoDB collections, for the project we have User Schema and TodoListItem Schema.
  - `routes/`: Defines API routes for tasks and user authentication.
  - `db/`: Contains the code for connection to the database
  - `controllers/`: Contains logic for handling incoming requests. Each controller manages specific routes, such as handling CRUD operations for tasks and user authentication.
  - `middlewares/`: Contains reusable middleware functions that modify or filter incoming requests. Common use cases include user authentication (e.g., JWT validation) and request validation.
  - `utils/`: Holds utility functions that are reused across the backend, such as error handling, generating tokens, or formatting data.

### Frontend (ReactJS)
- **`/frontend`**
  - `App.jsx`: The central component of the React app, managing routing, rendering, and coordinating all other components. It defines the application’s main structure and layout.
  - `/src/components/`: Houses all reusable UI components. Each component focuses on rendering specific parts of the application interface.

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Steps to Setup Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MilanPatel28/MilanPatel_ToDoList_App.git
   cd MilanPatel_ToDoList_App
   ```

2. **Install backend dependencies:**
   ```bash
   cd /backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd /frontend
   npm install
   ```

4. **Configure environment variables:**
   - Create a `.env` file inside the `backend/` folder.
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    ACCESS_TOKEN_EXPIRY=7d  # Example: 7 days
    REFRESH_TOKEN_EXPIRY=30d  # Example: 30 days
    CORS_ORIGIN=http://localhost:3000  # Or your frontend URL
    ```

    - Replace the placeholder values with the actual details as needed.


5. **Start the backend server:**
   ```bash
   cd backend
   nodemon index.js
   ```

6. **Start the frontend:**
   ```bash
   cd /frontend
   npm run dev
   ```

### Running the Application
- The backend server will run on `http://localhost:8000/`.
- The frontend will run by default on `http://localhost:5173/`.
- Open `http://localhost:5173/` in your browser to use the To-Do List app.
