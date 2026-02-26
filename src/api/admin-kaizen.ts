import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { authenticateJWT } from '../middleware/jwtAuth';

const router = Router();

// Apply JWT authentication
router.use(authenticateJWT);

// GET /api/admin/kaizen/projects - Get all Kaizen projects
router.get('/projects', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = db.from('KaizenProject').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: projects, count, error } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        projects: projects || [],
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

// PUT /api/admin/kaizen/projects/:id - Update project status
router.put('/projects/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const { data, error } = await db
      .from('KaizenProject')
      .update({ status, adminNotes })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Project updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/kaizen/buildplanner - Get build planner submissions
router.get('/buildplanner', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = db.from('BuildPlannerSubmission').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: submissions, count, error } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        submissions: submissions || [],
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
