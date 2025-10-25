import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config({ debug: 'false', override: 'true' });

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:5173' }));  // Allow requests from frontend dev server
}

app.use(express.json());    // This middleware will parse the json bodies: req.body
app.use(rateLimiter);

// Our simple custom middleware
app.use((req, res, next) => {
    console. log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
});

app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

// Start server after DB connection is established
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started on port', PORT);
    });
})

// download mangodb local
// understand whole code
