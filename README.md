# ThinkerBoard - MERN Stack Note-Taking App

A full-stack note-taking application built with MongoDB, Express, React, and Node.js.

## Features

- Create, read, update, and delete notes
- Rate limiting for API protection
- Responsive design with Tailwind CSS and DaisyUI
- Animated background effects
- Toast notifications

## Development Setup

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables in `backend/.env`:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   NODE_ENV=development
   ```
4. Run in development mode:
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend (in separate window)
   cd frontend && npm run dev
   ```
   Frontend runs on http://localhost:5173 and backend on http://localhost:5001

## Production Deployment on Render

### Backend Deployment

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure the service:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add all variables from your `.env` file
   - **Node Version**: 18 or higher
   - **Root Directory**: `.` (root directory)

### Frontend Build Process

The frontend is automatically built during the backend build process. The build script in `backend/package.json` will:
1. Navigate to the frontend directory
2. Run `npm run build` to create the production build
3. The backend will then serve the static files from the `frontend/dist` directory

### Environment Variables for Production

Make sure to set these environment variables in your Render dashboard:

```
MONGO_URI=mongodb+srv://your_connection_string
PORT=10000 (Render's default port)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NODE_ENV=production
```

## Project Structure

```
mern-thinkerboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
├── package.json (root level)
└── README.md
```

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Rate Limiting

The API is rate-limited to 10 requests per minute per IP address using Upstash Redis.