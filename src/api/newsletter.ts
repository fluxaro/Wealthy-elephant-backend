import { Router, Request, Response, NextFunction } from 'express';
import { dbHelpers, db } from '../config/database';
import { newsletterSchema } from '../middleware/validation';
import { sendNewsletterWelcomeEmail } from '../utils/emailService';
import { newsletterLimiter } from '../middleware/rateLimiter';
import { AppError } from '../middleware/errorHandler';

const router = Router();

router.post(
  '/',
  newsletterLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = newsletterSchema.parse(req.body);

      // Check if email already exists
      const existing = await dbHelpers.findNewsletterSubscriber(validatedData.email);

      if (existing) {
        if (existing.isActive) {
          throw new AppError('Email already subscribed', 400);
        } else {
          // Reactivate subscription
          await dbHelpers.updateNewsletterSubscriber(validatedData.email, {
            isActive: true,
            name: validatedData.name || existing.name,
            unsubscribedAt: null,
          });

          await sendNewsletterWelcomeEmail(validatedData.email, validatedData.name);

          return res.status(200).json({
            success: true,
            message: 'Newsletter subscription reactivated successfully',
          });
        }
      }

      // Create new subscription
      await dbHelpers.createNewsletterSubscriber(validatedData);

      await sendNewsletterWelcomeEmail(validatedData.email, validatedData.name);

      res.status(201).json({
        success: true,
        message: 'Successfully subscribed to newsletter',
      });
    } catch (error) {
      next(error);
    }
  }
);

// Unsubscribe endpoint
router.get('/unsubscribe', async (req: Request, res: Response) => {
  try {
    const subscriberId = req.query.id as string;

    if (!subscriberId) {
      return res.status(400).send('Invalid unsubscribe link');
    }

    const { error } = await db
      .from('NewsletterSubscriber')
      .update({ isActive: false })
      .eq('id', subscriberId);

    if (error) throw error;

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Unsubscribed</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #333; }
          p { color: #666; }
        </style>
      </head>
      <body>
        <h1>You've been unsubscribed</h1>
        <p>We're sorry to see you go. You will no longer receive emails from us.</p>
        <p><a href="${process.env.FRONTEND_URL || 'https://www.wealthyelephant.com'}">Return to homepage</a></p>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('An error occurred while unsubscribing');
  }
});

export default router;
