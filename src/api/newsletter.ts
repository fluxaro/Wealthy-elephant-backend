import { Router, Request, Response, NextFunction } from 'express';
import { dbHelpers } from '../config/database';
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

export default router;
