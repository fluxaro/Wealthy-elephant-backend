// Vercel serverless function entry point
import { Request, Response } from 'express';
import app from '../src/app';

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://www.wealthyelephant.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
];

export default (req: Request, res: Response) => {
  const origin = req.headers.origin;
  
  // Set CORS headers for allowed origins
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Pass to Express app
  return app(req, res);
};
