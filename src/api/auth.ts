import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../config/database';

const router = Router();

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Validation middleware
const validateLogin = (req: Request, res: Response, next: Function) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors?.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
  }
};

// Login endpoint
router.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find admin user
    const { data: admin, error } = await db
      .from('AdminUsers')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Update last login
    await db
      .from('AdminUsers')
      .update({ lastLogin: new Date().toISOString() })
      .eq('id', admin.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
});

// Verify token endpoint
router.get('/verify', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Get fresh user data
    const { data: admin, error } = await db
      .from('AdminUsers')
      .select('id, email, name, role')
      .eq('id', decoded.id)
      .single();

    if (error || !admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    res.json({
      success: true,
      data: {
        user: admin,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
});

export default router;
