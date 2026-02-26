import { Router, Request, Response, NextFunction } from 'express';
import { dbHelpers } from '../config/database';
import {
  klinRequestSchema,
  klinIntelligenceSchema,
  klinPartnershipSchema,
} from '../middleware/validation';
import {
  sendKlinRequestEmails,
  sendKlinIntelligenceEmails,
  sendKlinPartnershipEmails,
} from '../utils/emailService';
import { formSubmissionLimiter } from '../middleware/rateLimiter';

const router = Router();

// Klin Rental Request
router.post(
  '/request',
  formSubmissionLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = klinRequestSchema.parse(req.body);

      const request = await dbHelpers.createKlinRequest(validatedData);

      await sendKlinRequestEmails(validatedData);

      res.status(201).json({
        success: true,
        message: 'Rental request submitted successfully',
        data: { id: request.id },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Klin Intelligence Check
router.post(
  '/intelligence',
  formSubmissionLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = klinIntelligenceSchema.parse(req.body);

      const check = await dbHelpers.createKlinIntelligenceCheck(validatedData);

      await sendKlinIntelligenceEmails(validatedData);

      res.status(201).json({
        success: true,
        message: 'Intelligence check request submitted successfully',
        data: { id: check.id },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Klin Partnership
router.post(
  '/partnership',
  formSubmissionLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = klinPartnershipSchema.parse(req.body);

      const partnership = await dbHelpers.createKlinPartnership(validatedData);

      await sendKlinPartnershipEmails(validatedData);

      res.status(201).json({
        success: true,
        message: 'Partnership request submitted successfully',
        data: { id: partnership.id },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
