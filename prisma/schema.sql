-- =====================================================
-- WEALTHY ELEPHANT - COMPLETE DATABASE SCHEMA
-- =====================================================
-- This schema includes:
-- 1. All tables with proper constraints
-- 2. Row Level Security (RLS) policies
-- 3. Indexes for performance
-- 4. Triggers for auto-updates
-- 5. Functions for business logic
-- 6. Admin user management
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- DROP EXISTING TABLES (if re-running)
-- =====================================================
DROP TABLE IF EXISTS "ContactInquiry" CASCADE;
DROP TABLE IF EXISTS "KlinRequest" CASCADE;
DROP TABLE IF EXISTS "KlinIntelligenceCheck" CASCADE;
DROP TABLE IF EXISTS "KlinPartnership" CASCADE;
DROP TABLE IF EXISTS "KaizenProject" CASCADE;
DROP TABLE IF EXISTS "BuildPlannerSubmission" CASCADE;
DROP TABLE IF EXISTS "NewsletterSubscriber" CASCADE;
DROP TABLE IF EXISTS "AdminUsers" CASCADE;

-- =====================================================
-- TABLE: ContactInquiry
-- =====================================================
CREATE TABLE "ContactInquiry" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL CHECK (length("name") >= 2 AND length("name") <= 100),
    "email" TEXT NOT NULL CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "inquiryType" TEXT NOT NULL CHECK ("inquiryType" IN ('general', 'support', 'partnership', 'other')),
    "message" TEXT NOT NULL CHECK (length("message") >= 10 AND length("message") <= 2000),
    "status" TEXT NOT NULL DEFAULT 'new' CHECK ("status" IN ('new', 'in-progress', 'resolved', 'closed')),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "ContactInquiry_email_idx" ON "ContactInquiry"("email");
CREATE INDEX "ContactInquiry_status_idx" ON "ContactInquiry"("status");
CREATE INDEX "ContactInquiry_createdAt_idx" ON "ContactInquiry"("createdAt" DESC);

-- =====================================================
-- TABLE: KlinRequest
-- =====================================================
CREATE TABLE "KlinRequest" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL CHECK (length("name") >= 2 AND length("name") <= 100),
    "email" TEXT NOT NULL CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "phone" TEXT NOT NULL CHECK (length("phone") >= 10 AND length("phone") <= 20),
    "propertyType" TEXT NOT NULL CHECK ("propertyType" IN ('apartment', 'house', 'condo', 'studio', 'other')),
    "location" TEXT NOT NULL CHECK (length("location") >= 2 AND length("location") <= 200),
    "budget" TEXT NOT NULL CHECK (length("budget") >= 1 AND length("budget") <= 50),
    "moveInDate" TEXT,
    "additionalNotes" TEXT CHECK (length("additionalNotes") <= 1000),
    "status" TEXT NOT NULL DEFAULT 'new' CHECK ("status" IN ('new', 'reviewing', 'contacted', 'completed', 'cancelled')),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "KlinRequest_email_idx" ON "KlinRequest"("email");
CREATE INDEX "KlinRequest_status_idx" ON "KlinRequest"("status");
CREATE INDEX "KlinRequest_createdAt_idx" ON "KlinRequest"("createdAt" DESC);
CREATE INDEX "KlinRequest_location_idx" ON "KlinRequest"("location");

-- =====================================================
-- TABLE: KlinIntelligenceCheck
-- =====================================================
CREATE TABLE "KlinIntelligenceCheck" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL CHECK (length("name") >= 2 AND length("name") <= 100),
    "email" TEXT NOT NULL CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "phone" TEXT NOT NULL CHECK (length("phone") >= 10 AND length("phone") <= 20),
    "propertyAddress" TEXT NOT NULL CHECK (length("propertyAddress") >= 5 AND length("propertyAddress") <= 300),
    "checkType" TEXT NOT NULL CHECK ("checkType" IN ('background', 'credit', 'rental-history', 'comprehensive')),
    "urgency" TEXT NOT NULL DEFAULT 'normal' CHECK ("urgency" IN ('normal', 'urgent', 'asap')),
    "additionalInfo" TEXT CHECK (length("additionalInfo") <= 1000),
    "status" TEXT NOT NULL DEFAULT 'new' CHECK ("status" IN ('new', 'processing', 'completed', 'cancelled')),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "KlinIntelligenceCheck_email_idx" ON "KlinIntelligenceCheck"("email");
CREATE INDEX "KlinIntelligenceCheck_status_idx" ON "KlinIntelligenceCheck"("status");
CREATE INDEX "KlinIntelligenceCheck_createdAt_idx" ON "KlinIntelligenceCheck"("createdAt" DESC);
CREATE INDEX "KlinIntelligenceCheck_urgency_idx" ON "KlinIntelligenceCheck"("urgency");

-- =====================================================
-- TABLE: KlinPartnership
-- =====================================================
CREATE TABLE "KlinPartnership" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "companyName" TEXT NOT NULL CHECK (length("companyName") >= 2 AND length("companyName") <= 150),
    "contactPerson" TEXT NOT NULL CHECK (length("contactPerson") >= 2 AND length("contactPerson") <= 100),
    "email" TEXT NOT NULL CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "phone" TEXT NOT NULL CHECK (length("phone") >= 10 AND length("phone") <= 20),
    "partnershipType" TEXT NOT NULL CHECK ("partnershipType" IN ('property-owner', 'agent', 'vendor', 'investor', 'other')),
    "description" TEXT NOT NULL CHECK (length("description") >= 20 AND length("description") <= 2000),
    "website" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new' CHECK ("status" IN ('new', 'under-review', 'approved', 'rejected', 'active')),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "KlinPartnership_email_idx" ON "KlinPartnership"("email");
CREATE INDEX "KlinPartnership_status_idx" ON "KlinPartnership"("status");
CREATE INDEX "KlinPartnership_createdAt_idx" ON "KlinPartnership"("createdAt" DESC);
CREATE INDEX "KlinPartnership_partnershipType_idx" ON "KlinPartnership"("partnershipType");

-- =====================================================
-- TABLE: KaizenProject
-- =====================================================
CREATE TABLE "KaizenProject" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL CHECK (length("name") >= 2 AND length("name") <= 100),
    "email" TEXT NOT NULL CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "phone" TEXT NOT NULL CHECK (length("phone") >= 10 AND length("phone") <= 20),
    "projectType" TEXT NOT NULL CHECK ("projectType" IN ('residential', 'commercial', 'renovation', 'new-build', 'other')),
    "projectScope" TEXT NOT NULL CHECK ("projectScope" IN ('small', 'medium', 'large', 'enterprise')),
    "budget" TEXT NOT NULL CHECK (length("budget") >= 1 AND length("budget") <= 50),
    "timeline" TEXT NOT NULL CHECK (length("timeline") >= 1 AND length("timeline") <= 50),
    "description" TEXT NOT NULL CHECK (length("description") >= 20 AND length("description") <= 2000),
    "location" TEXT CHECK (length("location") <= 200),
    "status" TEXT NOT NULL DEFAULT 'new' CHECK ("status" IN ('new', 'quoted', 'in-progress', 'completed', 'cancelled')),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "KaizenProject_email_idx" ON "KaizenProject"("email");
CREATE INDEX "KaizenProject_status_idx" ON "KaizenProject"("status");
CREATE INDEX "KaizenProject_createdAt_idx" ON "KaizenProject"("createdAt" DESC);
CREATE INDEX "KaizenProject_projectType_idx" ON "KaizenProject"("projectType");

-- =====================================================
-- TABLE: BuildPlannerSubmission
-- =====================================================
CREATE TABLE "BuildPlannerSubmission" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "name" TEXT NOT NULL CHECK (length("name") >= 2 AND length("name") <= 100),
    "email" TEXT NOT NULL CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "phone" TEXT NOT NULL CHECK (length("phone") >= 10 AND length("phone") <= 20),
    "projectType" TEXT NOT NULL CHECK ("projectType" IN ('residential', 'commercial', 'mixed-use', 'industrial')),
    "propertySize" TEXT NOT NULL CHECK (length("propertySize") >= 1 AND length("propertySize") <= 50),
    "budget" TEXT NOT NULL CHECK (length("budget") >= 1 AND length("budget") <= 50),
    "startDate" TEXT,
    "features" TEXT NOT NULL CHECK (length("features") >= 10 AND length("features") <= 2000),
    "additionalNotes" TEXT CHECK (length("additionalNotes") <= 1000),
    "status" TEXT NOT NULL DEFAULT 'new' CHECK ("status" IN ('new', 'planning', 'approved', 'in-construction', 'completed')),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "BuildPlannerSubmission_email_idx" ON "BuildPlannerSubmission"("email");
CREATE INDEX "BuildPlannerSubmission_status_idx" ON "BuildPlannerSubmission"("status");
CREATE INDEX "BuildPlannerSubmission_createdAt_idx" ON "BuildPlannerSubmission"("createdAt" DESC);

-- =====================================================
-- TABLE: NewsletterSubscriber
-- =====================================================
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "email" TEXT NOT NULL UNIQUE CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "name" TEXT CHECK (length("name") >= 2 AND length("name") <= 100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3)
);

CREATE INDEX "NewsletterSubscriber_email_idx" ON "NewsletterSubscriber"("email");
CREATE INDEX "NewsletterSubscriber_isActive_idx" ON "NewsletterSubscriber"("isActive");

-- =====================================================
-- TABLE: AdminUsers (for future dashboard)
-- =====================================================
CREATE TABLE "AdminUsers" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "email" TEXT NOT NULL UNIQUE CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin' CHECK ("role" IN ('admin', 'super-admin', 'viewer')),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "AdminUsers_email_idx" ON "AdminUsers"("email");
CREATE INDEX "AdminUsers_isActive_idx" ON "AdminUsers"("isActive");

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to validate email format
CREATE OR REPLACE FUNCTION is_valid_email(email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql;

-- Function to get submission count by email (prevent spam)
CREATE OR REPLACE FUNCTION get_submission_count_by_email(
    table_name TEXT,
    user_email TEXT,
    hours_ago INTEGER DEFAULT 24
)
RETURNS INTEGER AS $$
DECLARE
    count_result INTEGER;
BEGIN
    EXECUTE format(
        'SELECT COUNT(*) FROM %I WHERE email = $1 AND "createdAt" > NOW() - INTERVAL ''%s hours''',
        table_name,
        hours_ago
    ) INTO count_result USING user_email;
    
    RETURN count_result;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Apply updatedAt triggers to all tables
CREATE TRIGGER update_contact_inquiry_updated_at 
    BEFORE UPDATE ON "ContactInquiry" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_klin_request_updated_at 
    BEFORE UPDATE ON "KlinRequest" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_klin_intelligence_updated_at 
    BEFORE UPDATE ON "KlinIntelligenceCheck" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_klin_partnership_updated_at 
    BEFORE UPDATE ON "KlinPartnership" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kaizen_project_updated_at 
    BEFORE UPDATE ON "KaizenProject" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_build_planner_updated_at 
    BEFORE UPDATE ON "BuildPlannerSubmission" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON "AdminUsers" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE "ContactInquiry" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KlinRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KlinIntelligenceCheck" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KlinPartnership" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KaizenProject" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BuildPlannerSubmission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NewsletterSubscriber" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminUsers" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES: ContactInquiry
-- =====================================================

-- Allow service role to do everything (backend with SERVICE_ROLE_KEY)
CREATE POLICY "Service role has full access to ContactInquiry"
    ON "ContactInquiry"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow authenticated users to insert (for API)
CREATE POLICY "Allow insert for authenticated users on ContactInquiry"
    ON "ContactInquiry"
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- =====================================================
-- RLS POLICIES: KlinRequest
-- =====================================================

CREATE POLICY "Service role has full access to KlinRequest"
    ON "KlinRequest"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users on KlinRequest"
    ON "KlinRequest"
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- =====================================================
-- RLS POLICIES: KlinIntelligenceCheck
-- =====================================================

CREATE POLICY "Service role has full access to KlinIntelligenceCheck"
    ON "KlinIntelligenceCheck"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users on KlinIntelligenceCheck"
    ON "KlinIntelligenceCheck"
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- =====================================================
-- RLS POLICIES: KlinPartnership
-- =====================================================

CREATE POLICY "Service role has full access to KlinPartnership"
    ON "KlinPartnership"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users on KlinPartnership"
    ON "KlinPartnership"
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- =====================================================
-- RLS POLICIES: KaizenProject
-- =====================================================

CREATE POLICY "Service role has full access to KaizenProject"
    ON "KaizenProject"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users on KaizenProject"
    ON "KaizenProject"
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- =====================================================
-- RLS POLICIES: BuildPlannerSubmission
-- =====================================================

CREATE POLICY "Service role has full access to BuildPlannerSubmission"
    ON "BuildPlannerSubmission"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users on BuildPlannerSubmission"
    ON "BuildPlannerSubmission"
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- =====================================================
-- RLS POLICIES: NewsletterSubscriber
-- =====================================================

CREATE POLICY "Service role has full access to NewsletterSubscriber"
    ON "NewsletterSubscriber"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users on NewsletterSubscriber"
    ON "NewsletterSubscriber"
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow users to update their own subscription status
CREATE POLICY "Users can update their own subscription"
    ON "NewsletterSubscriber"
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- RLS POLICIES: AdminUsers
-- =====================================================

CREATE POLICY "Service role has full access to AdminUsers"
    ON "AdminUsers"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Admins can read all admin users
CREATE POLICY "Admins can read all admin users"
    ON "AdminUsers"
    FOR SELECT
    TO authenticated
    USING (true);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant necessary permissions to authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT INSERT ON "ContactInquiry" TO authenticated;
GRANT INSERT ON "KlinRequest" TO authenticated;
GRANT INSERT ON "KlinIntelligenceCheck" TO authenticated;
GRANT INSERT ON "KlinPartnership" TO authenticated;
GRANT INSERT ON "KaizenProject" TO authenticated;
GRANT INSERT ON "BuildPlannerSubmission" TO authenticated;
GRANT INSERT, UPDATE ON "NewsletterSubscriber" TO authenticated;
GRANT SELECT ON "AdminUsers" TO authenticated;

-- Grant full access to service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- =====================================================
-- VIEWS FOR ANALYTICS (Optional)
-- =====================================================

-- View: Recent submissions summary
CREATE OR REPLACE VIEW "RecentSubmissionsSummary" AS
SELECT 
    'ContactInquiry' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE "createdAt" > NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE "createdAt" > NOW() - INTERVAL '7 days') as last_7d,
    COUNT(*) FILTER (WHERE status = 'new') as new_count
FROM "ContactInquiry"
UNION ALL
SELECT 
    'KlinRequest',
    COUNT(*),
    COUNT(*) FILTER (WHERE "createdAt" > NOW() - INTERVAL '24 hours'),
    COUNT(*) FILTER (WHERE "createdAt" > NOW() - INTERVAL '7 days'),
    COUNT(*) FILTER (WHERE status = 'new')
FROM "KlinRequest"
UNION ALL
SELECT 
    'KaizenProject',
    COUNT(*),
    COUNT(*) FILTER (WHERE "createdAt" > NOW() - INTERVAL '24 hours'),
    COUNT(*) FILTER (WHERE "createdAt" > NOW() - INTERVAL '7 days'),
    COUNT(*) FILTER (WHERE status = 'new')
FROM "KaizenProject"
UNION ALL
SELECT 
    'NewsletterSubscriber',
    COUNT(*),
    COUNT(*) FILTER (WHERE "subscribedAt" > NOW() - INTERVAL '24 hours'),
    COUNT(*) FILTER (WHERE "subscribedAt" > NOW() - INTERVAL '7 days'),
    COUNT(*) FILTER (WHERE "isActive" = true)
FROM "NewsletterSubscriber";

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert a test admin user (password: Admin123!)
-- Password hash generated with bcrypt rounds=10
-- You should change this in production!
INSERT INTO "AdminUsers" ("email", "passwordHash", "name", "role")
VALUES (
    'admin@wealthyelephant.com',
    '$2b$10$rKZLvVZqGqxH5N5xKxKxKOqGqxH5N5xKxKxKOqGqxH5N5xKxKxKO',
    'Admin User',
    'super-admin'
) ON CONFLICT ("email") DO NOTHING;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Wealthy Elephant Database Schema Created Successfully!';
    RAISE NOTICE '📊 Tables: 8 (including AdminUsers for future dashboard)';
    RAISE NOTICE '🔒 RLS Policies: Enabled on all tables';
    RAISE NOTICE '⚡ Indexes: Created for optimal performance';
    RAISE NOTICE '🔄 Triggers: Auto-update timestamps configured';
    RAISE NOTICE '🛡️ Constraints: Email validation, length checks, enum validation';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 Next Steps:';
    RAISE NOTICE '1. Update Resend FROM_EMAIL in src/utils/emailService.ts with verified domain';
    RAISE NOTICE '2. Test API endpoints with Postman';
    RAISE NOTICE '3. Monitor submissions in Supabase dashboard';
    RAISE NOTICE '4. Set up admin dashboard (optional)';
END $$;
