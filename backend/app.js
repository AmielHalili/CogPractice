import express from 'express';
import cors from 'cors';
//import userRoutes from './routes/userRoutes.js';
//import { errorHandler } from './middleware/error.middleware.js';
import bankRoutes from './routes/bankRoutes.js';

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/bank', bankRoutes);

// Global Error Handler Middleware
//app.use(errorHandler);

export default app;