//Package imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
//Local imports
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

//Load environment variables from .env file
dotenv.config();

//Initialize Express app
const app = express();

//Define the port to run the server on
const PORT = process.env.PORT || 5001;

//Get the directory name of the current module
const __dirname = path.resolve();


//The middlewares run in the order they are defined.

// Middleware to parse JSON bodies.

// Enable CORS for all routes if left empty but, if only specific origins are to be allowed, they can be specified as shown below.
if (process.env.NODE_ENV !== 'production') {
    app.use(
        cors({
            origin: ['http://localhost:5173'], // Allow only this origin to access the backend
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
            credentials: true, // Allow cookies to be sent
        })
    );
}
// Middleware to parse JSON bodies
app.use(express.json());
// Rate limiting middleware to limit repeated requests to public APIs and/or endpoints such as password reset.
app.use(rateLimiter);

// Simple request logger middleware, the next parameter is required to move to the next middleware/route handler.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Proceed to the next middleware or route handler, in this case notesRoutes
});

// Mount the notes routes at /api/notes. This means whenever a request comes to /api/notes, it will be handled by notesRoutes. The routes defined in notesRoutes.js will be relative to /api/notes.
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}

// Define a simple route for the root URL
// app.get("/", (req, res) => {
//     res.status(200).send("Welcome to IdeaStore 1.0 !");
// });

// This would try to connect to the database, and without waiting for the connection to be established, it would start the server.
// connectDB();
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}.`);
//     console.log(`URL: http://localhost:${PORT}/`);
// });

// Updated to ensure the server starts only after a successful database connection.
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}.`);
        console.log(`URL: http://localhost:${PORT}/`);
    })
}).catch((error) => {
    console.error("Failed to connect to the database. Server not started: ", error);
});