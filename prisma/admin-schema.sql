-- Add indexes to existing tables for admin queries
CREATE INDEX IF NOT EXISTS "idx_contact_created" ON "ContactInquiry"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "idx_klin_request_created" ON "KlinRequest"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "idx_kaizen_project_created" ON "KaizenProject"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "idx_newsletter_subscriber_status" ON "NewsletterSubscriber"("isActive");
CREATE INDEX IF NOT EXISTS "idx_newsletter_subscriber_email" ON "NewsletterSubscriber"("email");

-- Add status column to existing tables if not exists (for tracking pending/completed)
ALTER TABLE "ContactInquiry" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) DEFAULT 'new';
ALTER TABLE "KlinRequest" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) DEFAULT 'pending';
ALTER TABLE "KlinIntelligenceCheck" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) DEFAULT 'pending';
ALTER TABLE "KlinPartnership" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) DEFAULT 'pending';
ALTER TABLE "KaizenProject" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) DEFAULT 'pending';
ALTER TABLE "BuildPlannerSubmission" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20) DEFAULT 'pending';

-- Create indexes for status columns
CREATE INDEX IF NOT EXISTS "idx_contact_status" ON "ContactInquiry"("status");
CREATE INDEX IF NOT EXISTS "idx_klin_request_status" ON "KlinRequest"("status");
CREATE INDEX IF NOT EXISTS "idx_klin_intelligence_status" ON "KlinIntelligenceCheck"("status");
CREATE INDEX IF NOT EXISTS "idx_klin_partnership_status" ON "KlinPartnership"("status");
CREATE INDEX IF NOT EXISTS "idx_kaizen_project_status" ON "KaizenProject"("status");
CREATE INDEX IF NOT EXISTS "idx_build_planner_status" ON "BuildPlannerSubmission"("status");

-- Add notes column for admin use
ALTER TABLE "ContactInquiry" ADD COLUMN IF NOT EXISTS "adminNotes" TEXT;
ALTER TABLE "KlinRequest" ADD COLUMN IF NOT EXISTS "adminNotes" TEXT;
ALTER TABLE "KlinIntelligenceCheck" ADD COLUMN IF NOT EXISTS "adminNotes" TEXT;
ALTER TABLE "KlinPartnership" ADD COLUMN IF NOT EXISTS "adminNotes" TEXT;
ALTER TABLE "KaizenProject" ADD COLUMN IF NOT EXISTS "adminNotes" TEXT;
ALTER TABLE "BuildPlannerSubmission" ADD COLUMN IF NOT EXISTS "adminNotes" TEXT;
