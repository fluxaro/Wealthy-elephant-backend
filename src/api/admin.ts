import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { authenticateJWT } from '../middleware/jwtAuth';

const router = Router();

// Apply JWT authentication to all admin routes
router.use(authenticateJWT);

// GET /api/admin/stats - Dashboard overview stats
router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get counts for contacts
    const { count: totalContacts } = await db
      .from('ContactInquiry')
      .select('*', { count: 'exact', head: true });

    const { count: newContacts } = await db
      .from('ContactInquiry')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    const { count: pendingContacts } = await db
      .from('ContactInquiry')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get counts for Klin requests (all types)
    const { count: totalKlinRequests } = await db
      .from('KlinRequest')
      .select('*', { count: 'exact', head: true });

    const { count: pendingKlinRequests } = await db
      .from('KlinRequest')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: completedKlinRequests } = await db
      .from('KlinRequest')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Get counts for Kaizen projects (including build planner)
    const { count: totalKaizenProjects } = await db
      .from('KaizenProject')
      .select('*', { count: 'exact', head: true });

    const { count: pendingKaizenProjects } = await db
      .from('KaizenProject')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    const { count: completedKaizenProjects } = await db
      .from('KaizenProject')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Get newsletter stats
    const { count: totalSubscribers } = await db
      .from('NewsletterSubscriber')
      .select('*', { count: 'exact', head: true });

    const { count: activeSubscribers } = await db
      .from('NewsletterSubscriber')
      .select('*', { count: 'exact', head: true })
      .eq('isActive', true);

    res.json({
      success: true,
      data: {
        contacts: {
          total: totalContacts || 0,
          new: newContacts || 0,
          pending: pendingContacts || 0,
        },
        klinRequests: {
          total: totalKlinRequests || 0,
          pending: pendingKlinRequests || 0,
          completed: completedKlinRequests || 0,
        },
        kaizenProjects: {
          total: totalKaizenProjects || 0,
          pending: pendingKaizenProjects || 0,
          completed: completedKaizenProjects || 0,
        },
        newsletter: {
          totalSubscribers: totalSubscribers || 0,
          activeSubscribers: activeSubscribers || 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/contacts - Get all contacts with pagination
router.get('/contacts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = db.from('ContactInquiry').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: contacts, count, error } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        contacts: contacts || [],
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

// PUT /api/admin/contacts/:id - Update contact status
router.put('/contacts/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const { data, error } = await db
      .from('ContactInquiry')
      .update({ status, adminNotes })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
