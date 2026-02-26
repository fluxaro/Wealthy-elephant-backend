import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { authenticateJWT } from '../middleware/jwtAuth';

const router = Router();

// Apply JWT authentication
router.use(authenticateJWT);

// GET /api/admin/klin/requests - Get all Klin requests
router.get('/requests', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = db.from('KlinRequest').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: requests, count, error } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        requests: requests || [],
        pagination: {
          total: count || 0,
          page,
          pages: Math.ceil((count || 0) / limit),
          limit,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/klin/requests/:id - Update request status
router.put('/requests/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const { data, error } = await db
      .from('KlinRequest')
      .update({ status, adminNotes })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Request updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/klin/intelligence - Get intelligence checks
router.get('/intelligence', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = db.from('KlinIntelligenceCheck').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: checks, count, error } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        checks: checks || [],
        pagination: {
          total: count || 0,
          page,
          pages: Math.ceil((count || 0) / limit),
          limit,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/klin/partnerships - Get partnerships
router.get('/partnerships', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = db.from('KlinPartnership').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: partnerships, count, error } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        partnerships: partnerships || [],
        pagination: {
          total: count || 0,
          page,
          pages: Math.ceil((count || 0) / limit),
          limit,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
