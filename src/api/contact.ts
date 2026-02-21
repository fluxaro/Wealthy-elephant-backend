import { Router, Request, Response, NextFunction } from 'express';
import { dbHelpers } from '../config/database';
import { contactInquirySchema } from '../middleware/validation';
import { sendContactInquiryEmails } from '../utils/emailService';
import { formSubmissionLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post(
  '/',
  formSubmissionLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = contactInquirySchema.parse(req.body);

      const inquiry = await dbHelpers.createContactInquiry(validatedData);

      await sendContactInquiryEmails(validatedData);

      res.status(201).json({
        success: true,
        message: 'Contact inquiry submitted successfully',
        data: { id: inquiry.id },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
