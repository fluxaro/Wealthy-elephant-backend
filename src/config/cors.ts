import { CorsOptions } from 'cors';

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://www.wealthyelephant.com',
  'http://localhost:3000', // For local development
  'http://localhost:5173', // For Vite dev server
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
