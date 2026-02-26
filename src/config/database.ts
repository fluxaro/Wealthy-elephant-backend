import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const db = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database helper functions
export const dbHelpers = {
  // Contact Inquiry
  async createContactInquiry(data: any) {
    const { data: result, error } = await db
      .from('ContactInquiry')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  // Klin Request
  async createKlinRequest(data: any) {
    const { data: result, error } = await db
      .from('KlinRequest')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  // Klin Intelligence Check
  async createKlinIntelligenceCheck(data: any) {
    const { data: result, error } = await db
      .from('KlinIntelligenceCheck')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  // Klin Partnership
  async createKlinPartnership(data: any) {
    const { data: result, error } = await db
      .from('KlinPartnership')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  // Kaizen Project
  async createKaizenProject(data: any) {
    const { data: result, error } = await db
      .from('KaizenProject')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  // Build Planner Submission
  async createBuildPlannerSubmission(data: any) {
    const { data: result, error } = await db
      .from('BuildPlannerSubmission')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  // Newsletter Subscriber
  async findNewsletterSubscriber(email: string) {
    const { data, error } = await db
      .from('NewsletterSubscriber')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data;
  },

  async createNewsletterSubscriber(data: any) {
    const { data: result, error } = await db
      .from('NewsletterSubscriber')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  async updateNewsletterSubscriber(email: string, data: any) {
    const { data: result, error } = await db
      .from('NewsletterSubscriber')
      .update(data)
      .eq('email', email)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },
};
