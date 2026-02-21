import rateLimit from 'express-rate-limit';

// General rate limiter for all POST requests
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for form submissions
export const formSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 form submissions per hour
  message: {
    success: false,
    message: 'Too many submissions from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Newsletter subscription limiter
export const newsletterLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // Limit each IP to 5 newsletter subscriptions per day
  message: {
    success: false,
    message: 'Too many subscription attempts, please try again tomorrow.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
