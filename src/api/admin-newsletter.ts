import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { authenticateJWT } from '../middleware/jwtAuth';
import { z } from 'zod';
import { sendNewsletterCampaign, sendTestNewsletter } from '../utils/newsletterService';

const router = Router();

// Apply JWT authentication
router.use(authenticateJWT);

// Campaign schema
const campaignSchema = z.object({
  subject: z.string().min(1).max(200),
  previewText: z.string().max(200).optional(),
  fromName: z.string().max(100).default('Wealthy Elephant'),
  content: z.object({
    blocks: z.array(z.any()),
  }),
  status: z.enum(['draft', 'scheduled', 'sent']).default('draft'),
  scheduledDate: z.string().optional(),
});

// GET /api/admin/newsletter/stats - Newsletter dashboard stats
router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count: totalSubscribers } = await db
      .from('NewsletterSubscriber')
      .select('*', { count: 'exact', head: true });

    const { count: activeSubscribers } = await db
      .from('NewsletterSubscriber')
      .select('*', { count: 'exact', head: true })
      .eq('isActive', true);

    const { count: unsubscribed } = await db
      .from('NewsletterSubscriber')
      .select('*', { count: 'exact', head: true })
      .eq('isActive', false);

    const { data: lastCampaign } = await db
      .from('NewsletterCampaign')
      .select('*')
      .eq('status', 'sent')
      .order('sentDate', { ascending: false })
      .limit(1)
      .single();

    const lastCampaignData = lastCampaign ? {
      id: lastCampaign.id,
      subject: lastCampaign.subject,
      sentDate: lastCampaign.sentDate,
      openRate: lastCampaign.totalSent > 0
        ? parseFloat(((lastCampaign.totalOpens / lastCampaign.totalSent) * 100).toFixed(1))
        : 0,
      clickRate: lastCampaign.totalSent > 0
        ? parseFloat(((lastCampaign.totalClicks / lastCampaign.totalSent) * 100).toFixed(1))
        : 0,
      totalSent: lastCampaign.totalSent,
    } : null;

    res.json({
      success: true,
      data: {
        totalSubscribers: totalSubscribers || 0,
        activeSubscribers: activeSubscribers || 0,
        unsubscribed: unsubscribed || 0,
        lastCampaign: lastCampaignData,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/newsletter/campaigns - Get all campaigns
router.get('/campaigns', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const { data: campaigns, count, error } = await db
      .from('NewsletterCampaign')
      .select('*', { count: 'exact' })
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const formattedCampaigns = (campaigns || []).map(campaign => ({
      id: campaign.id,
      subject: campaign.subject,
      status: campaign.status,
      sentDate: campaign.sentDate,
      scheduledDate: campaign.scheduledDate,
      createdAt: campaign.createdAt,
      openRate: campaign.totalSent > 0
        ? parseFloat(((campaign.totalOpens / campaign.totalSent) * 100).toFixed(1))
        : 0,
      clickRate: campaign.totalSent > 0
        ? parseFloat(((campaign.totalClicks / campaign.totalSent) * 100).toFixed(1))
        : 0,
      totalSent: campaign.totalSent,
    }));

    res.json({
      success: true,
      data: {
        campaigns: formattedCampaigns,
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

// GET /api/admin/newsletter/campaigns/:id - Get single campaign
router.get('/campaigns/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data: campaign, error } = await db
      .from('NewsletterCampaign')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/newsletter/campaigns - Create campaign
router.post('/campaigns', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = campaignSchema.parse(req.body);

    const { data: campaign, error } = await db
      .from('NewsletterCampaign')
      .insert(validatedData)
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/newsletter/campaigns/:id - Update campaign
router.put('/campaigns/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = campaignSchema.parse(req.body);

    const { data: campaign, error } = await db
      .from('NewsletterCampaign')
      .update({ ...validatedData, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/newsletter/campaigns/:id - Delete campaign
router.delete('/campaigns/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { error } = await db
      .from('NewsletterCampaign')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Campaign deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/newsletter/campaigns/:id/duplicate - Duplicate campaign
router.post('/campaigns/:id/duplicate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data: original, error: fetchError } = await db
      .from('NewsletterCampaign')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    const { data: duplicate, error: insertError } = await db
      .from('NewsletterCampaign')
      .insert({
        subject: `Copy of ${original.subject}`,
        previewText: original.previewText,
        fromName: original.fromName,
        content: original.content,
        status: 'draft',
      })
      .select()
      .single();

    if (insertError) throw insertError;

    res.status(201).json({
      success: true,
      message: 'Campaign duplicated successfully',
      data: duplicate,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/newsletter/campaigns/:id/test - Send test email
router.post('/campaigns/:id/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required',
      });
    }

    const { data: campaign, error } = await db
      .from('NewsletterCampaign')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    await sendTestNewsletter(campaign, email);

    res.json({
      success: true,
      message: 'Test email sent successfully',
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/newsletter/campaigns/:id/send - Send campaign
router.post('/campaigns/:id/send', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { sendType, scheduledDate } = req.body;

    const { data: campaign, error: fetchError } = await db
      .from('NewsletterCampaign')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    if (sendType === 'scheduled') {
      // Schedule for later
      const { error: updateError } = await db
        .from('NewsletterCampaign')
        .update({
          status: 'scheduled',
          scheduledDate,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      res.json({
        success: true,
        message: 'Campaign scheduled successfully',
      });
    } else {
      // Send now
      const { error: updateError } = await db
        .from('NewsletterCampaign')
        .update({ status: 'sending' })
        .eq('id', id);

      if (updateError) throw updateError;

      // Send in background (don't await)
      sendNewsletterCampaign(campaign).catch(console.error);

      res.json({
        success: true,
        message: 'Campaign is being sent',
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/newsletter/campaigns/:id/analytics - Get campaign analytics
router.get('/campaigns/:id/analytics', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data: campaign, error: campaignError } = await db
      .from('NewsletterCampaign')
      .select('*')
      .eq('id', id)
      .single();

    if (campaignError) throw campaignError;

    // Get top clicked links
    const { data: clickAnalytics } = await db
      .from('CampaignAnalytics')
      .select('eventData')
      .eq('campaignId', id)
      .eq('eventType', 'click');

    const linkClicks: { [key: string]: number } = {};
    (clickAnalytics || []).forEach((event: any) => {
      const url = event.eventData?.url;
      if (url) {
        linkClicks[url] = (linkClicks[url] || 0) + 1;
      }
    });

    const topLinks = Object.entries(linkClicks)
      .map(([url, clicks]) => ({ url, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    res.json({
      success: true,
      data: {
        subject: campaign.subject,
        sentDate: campaign.sentDate,
        totalSent: campaign.totalSent,
        openRate: campaign.totalSent > 0
          ? parseFloat(((campaign.totalOpens / campaign.totalSent) * 100).toFixed(1))
          : 0,
        clickRate: campaign.totalSent > 0
          ? parseFloat(((campaign.totalClicks / campaign.totalSent) * 100).toFixed(1))
          : 0,
        unsubscribes: campaign.unsubscribes,
        topLinks,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/newsletter/subscribers - Get all subscribers
router.get('/subscribers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = db.from('NewsletterSubscriber').select('*', { count: 'exact' });

    if (status === 'active') {
      query = query.eq('isActive', true);
    } else if (status === 'inactive') {
      query = query.eq('isActive', false);
    }

    const { data: subscribers, count, error } = await query
      .order('subscribedAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        subscribers: (subscribers || []).map(sub => ({
          id: sub.id,
          email: sub.email,
          name: sub.name,
          status: sub.isActive ? 'active' : 'inactive',
          subscribedAt: sub.subscribedAt,
        })),
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

// GET /api/admin/newsletter/subscribers/search - Search subscribers
router.get('/subscribers/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const { data: subscribers, error } = await db
      .from('NewsletterSubscriber')
      .select('*')
      .or(`email.ilike.%${query}%,name.ilike.%${query}%`)
      .limit(50);

    if (error) throw error;

    res.json({
      success: true,
      data: {
        subscribers: (subscribers || []).map(sub => ({
          id: sub.id,
          email: sub.email,
          name: sub.name,
          status: sub.isActive ? 'active' : 'inactive',
          subscribedAt: sub.subscribedAt,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/newsletter/subscribers/export - Export subscribers as CSV
router.get('/subscribers/export', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data: subscribers, error } = await db
      .from('NewsletterSubscriber')
      .select('*')
      .eq('isActive', true)
      .order('subscribedAt', { ascending: false });

    if (error) throw error;

    // Generate CSV
    const csv = [
      'Email,Name,Subscribed At',
      ...(subscribers || []).map(sub =>
        `${sub.email},"${sub.name || ''}",${sub.subscribedAt}`
      ),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
});

export default router;
