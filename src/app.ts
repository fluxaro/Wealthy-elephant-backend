import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { corsOptions } from './config/cors';
import { errorHandler } from './middleware/errorHandler';
import { generalLimiter } from './middleware/rateLimiter';

// Import routes
import contactRouter from './api/contact';
import klinRouter from './api/klin';
import kaizenRouter from './api/kaizen';
import newsletterRouter from './api/newsletter';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply general rate limiter to all routes
app.use(generalLimiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Wealthy Elephant API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/contact', contactRouter);
app.use('/api/klin', klinRouter);
app.use('/api/kaizen', kaizenRouter);
app.use('/api/newsletter', newsletterRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
