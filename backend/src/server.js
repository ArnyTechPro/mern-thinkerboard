// Import required dependencies
import express from 'express';                    // Web framework for Node.js
import cors from 'cors';                         // Middleware to enable CORS
import dotenv from 'dotenv';                     // To load environment variables from .env file
import path from 'path';                         // Node.js path module for handling file paths

// Import application modules
import notesRoutes from './routes/notesRoutes.js';    // API routes for notes
import { connectDB } from './config/db.js';          // Database connection function
import rateLimiter from './middleware/rateLimiter.js'; // Rate limiting middleware

// Load environment variables from .env file
// debug: false disables debug logging
// override: true allows existing env vars to be overwritten
dotenv.config({ debug: 'false', override: 'true' });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;  // Use PORT from env or default to 5001
const __dirname = path.resolve();         // Get current directory path

// ==================== MIDDLEWARE CONFIGURATION ====================

// CORS (Cross-Origin Resource Sharing) configuration
// In development: Allow requests only from frontend dev server (localhost:5173)
// In production: Allow requests from same origin
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:5173' }));
} else {
    app.use(cors({ origin: true }));
}

// JSON body parser middleware
// This parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

// Rate limiting middleware
// Applied only to routes starting with '/api' to protect API endpoints
// Static assets (CSS, JS, images) are not rate limited
app.use('/api', rateLimiter);

// Static file serving middleware
// Serves built frontend files from the dist directory
// This handles direct requests to specific files like:
// - /assets/index-BOO3W0kk.js (JavaScript bundles)
// - /assets/index-XrSEz7-1.css (CSS files)
// - /vite.svg (images/icons)
// Express automatically serves these files with correct MIME types
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Custom logging middleware
// Logs all incoming requests with method and URL for debugging
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
});

// ==================== ROUTES CONFIGURATION ====================

// API routes for notes
// All routes starting with '/api/notes' will be handled by notesRoutes
app.use('/api/notes', notesRoutes);

// Catch-all route for client-side routing (SPA - Single Page Application)
// This regex matches all routes except those containing '/assets/'
// WHY WE NEED BOTH static middleware AND this catch-all route:
//
// 1. app.use(express.static()) handles:
//    - Direct file requests: /assets/index-BOO3W0kk.js
//    - Direct file requests: /assets/index-XrSEz7-1.css
//    - Direct file requests: /vite.svg
//    - These are served with correct MIME types automatically by Express
//
// 2. app.get(/^((?!\/assets\/).)*$/) handles:
//    - Client-side routes: /, /create, /note/123
//    - Browser refreshes on SPA routes
//    - Direct navigation to URLs that don't exist as files
//    - Returns index.html so React Router can take over
//
// WITHOUT static middleware: All requests would hit this route
// WITHOUT catch-all route: Refreshing /create would show 404 error
app.get(/^((?!\/assets\/).)*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

// ==================== SERVER STARTUP ====================

// Start the server only after database connection is established
// This ensures we don't start serving requests before DB is ready
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started on port', PORT);
    });
})

// TODO: Download MongoDB locally for development
// TODO: Understand whole codebase better
