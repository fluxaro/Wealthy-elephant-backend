import { z } from 'zod';

// Contact Inquiry Schema
export const contactInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  inquiryType: z.enum(['general', 'support', 'partnership', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

// Klin Request Schema
export const klinRequestSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20),
  propertyType: z.enum(['apartment', 'house', 'condo', 'studio', 'other']),
  location: z.string().min(2).max(200),
  budget: z.string().min(1).max(50),
  moveInDate: z.string().optional(),
  additionalNotes: z.string().max(1000).optional(),
});

// Klin Intelligence Check Schema
export const klinIntelligenceSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  propertyAddress: z.string().min(5).max(300),
  checkType: z.enum(['background', 'credit', 'rental-history', 'comprehensive']),
  urgency: z.enum(['normal', 'urgent', 'asap']).default('normal'),
  additionalInfo: z.string().max(1000).optional(),
});

// Klin Partnership Schema
export const klinPartnershipSchema = z.object({
  companyName: z.string().min(2).max(150),
  contactPerson: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  partnershipType: z.enum(['property-owner', 'agent', 'vendor', 'investor', 'other']),
  description: z.string().min(20).max(2000),
  website: z.string().url().optional().or(z.literal('')),
});

// Kaizen Project Schema
export const kaizenProjectSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  projectType: z.enum(['residential', 'commercial', 'renovation', 'new-build', 'other']),
  projectScope: z.enum(['small', 'medium', 'large', 'enterprise']),
  budget: z.string().min(1).max(50),
  timeline: z.string().min(1).max(50),
  description: z.string().min(20).max(2000),
  location: z.string().max(200).optional(),
});

// Build Planner Schema
export const buildPlannerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  projectType: z.enum(['residential', 'commercial', 'mixed-use', 'industrial']),
  propertySize: z.string().min(1).max(50),
  budget: z.string().min(1).max(50),
  startDate: z.string().optional(),
  features: z.string().min(10).max(2000),
  additionalNotes: z.string().max(1000).optional(),
});

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2).max(100).optional(),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
export type KlinRequestInput = z.infer<typeof klinRequestSchema>;
export type KlinIntelligenceInput = z.infer<typeof klinIntelligenceSchema>;
export type KlinPartnershipInput = z.infer<typeof klinPartnershipSchema>;
export type KaizenProjectInput = z.infer<typeof kaizenProjectSchema>;
export type BuildPlannerInput = z.infer<typeof buildPlannerSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
