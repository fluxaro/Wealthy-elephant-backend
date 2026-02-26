// Vercel serverless function entry point
import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://www.wealthyelephant.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
];

export default async (req: VercelRequest, res: VercelResponse) => {
  const origin = req.headers.origin as string;
  
  // Set CORS headers for allowed origins
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Pass to Express app
  return app(req as any, res as any);
};
