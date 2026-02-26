-- Newsletter Campaigns Table
CREATE TABLE IF NOT EXISTS "NewsletterCampaign" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "subject" VARCHAR(200) NOT NULL,
  "previewText" VARCHAR(200),
  "fromName" VARCHAR(100) DEFAULT 'Wealthy Elephant',
  "content" JSONB NOT NULL,
  "status" VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, scheduled, sending, sent, failed
  "scheduledDate" TIMESTAMP,
  "sentDate" TIMESTAMP,
  "totalSent" INTEGER DEFAULT 0,
  "totalOpens" INTEGER DEFAULT 0,
  "totalClicks" INTEGER DEFAULT 0,
  "unsubscribes" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Campaign Analytics (Track individual opens/clicks)
CREATE TABLE IF NOT EXISTS "CampaignAnalytics" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "campaignId" UUID NOT NULL REFERENCES "NewsletterCampaign"("id") ON DELETE CASCADE,
  "subscriberId" UUID NOT NULL REFERENCES "NewsletterSubscriber"("id") ON DELETE CASCADE,
  "eventType" VARCHAR(20) NOT NULL, -- open, click, unsubscribe
  "eventData" JSONB, -- For clicks: {url: "https://..."}
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_campaign_status" ON "NewsletterCampaign"("status");
CREATE INDEX IF NOT EXISTS "idx_campaign_sent_date" ON "NewsletterCampaign"("sentDate");
CREATE INDEX IF NOT EXISTS "idx_analytics_campaign" ON "CampaignAnalytics"("campaignId");
CREATE INDEX IF NOT EXISTS "idx_analytics_subscriber" ON "CampaignAnalytics"("subscriberId");
CREATE INDEX IF NOT EXISTS "idx_analytics_event_type" ON "CampaignAnalytics"("eventType");

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

COMMENT ON TABLE "NewsletterCampaign" IS 'Stores newsletter campaigns with content and analytics';
COMMENT ON TABLE "CampaignAnalytics" IS 'Tracks individual subscriber interactions with campaigns';
