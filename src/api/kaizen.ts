import { Router, Request, Response, NextFunction } from 'express';
import { dbHelpers } from '../config/database';
import {
  kaizenProjectSchema,
  buildPlannerSchema,
} from '../middleware/validation';
import {
  sendKaizenProjectEmails,
  sendBuildPlannerEmails,
} from '../utils/emailService';
import { formSubmissionLimiter } from '../middleware/rateLimiter';

const router = Router();

// Kaizen Project Request
router.post(
  '/project',
  formSubmissionLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = kaizenProjectSchema.parse(req.body);

      const project = await dbHelpers.createKaizenProject(validatedData);

      await sendKaizenProjectEmails(validatedData);

      res.status(201).json({
        success: true,
        message: 'Project request submitted successfully',
        data: { id: project.id },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Build Planner Submission
router.post(
  '/buildplanner',
  formSubmissionLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = buildPlannerSchema.parse(req.body);

      const submission = await dbHelpers.createBuildPlannerSubmission(validatedData);

      await sendBuildPlannerEmails(validatedData);

      res.status(201).json({
        success: true,
        message: 'Build planner submission successful',
        data: { id: submission.id },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
