import { resend } from '../config/resend';
import { emailTemplates } from './emailTemplates';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'wealthyelephant@gmail.com';
const FROM_EMAIL = 'Wealthy Elephant <noreply@wealthyelephant.com>';

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    // Don't throw - log error but continue
    return null;
  }
};

export const sendContactInquiryEmails = async (data: any) => {
  try {
    const userEmail = emailTemplates.contactInquiry.user(data.name);
    
    // Only send to client
    await sendEmail(data.email, userEmail.subject, userEmail.html);
  } catch (error) {
    console.error('Error sending contact inquiry emails:', error);
    // Don't throw - emails are optional
  }
};

export const sendKlinRequestEmails = async (data: any) => {
  try {
    const userEmail = emailTemplates.klinRequest.user(data.name);
    
    // Only send to client
    await sendEmail(data.email, userEmail.subject, userEmail.html);
  } catch (error) {
    console.error('Error sending klin request emails:', error);
  }
};

export const sendKlinIntelligenceEmails = async (data: any) => {
  try {
    const userEmail = emailTemplates.klinIntelligence.user(data.name);
    
    // Only send to client
    await sendEmail(data.email, userEmail.subject, userEmail.html);
  } catch (error) {
    console.error('Error sending klin intelligence emails:', error);
  }
};

export const sendKlinPartnershipEmails = async (data: any) => {
  try {
    const userEmail = emailTemplates.klinPartnership.user(data.contactPerson);
    
    // Only send to client
    await sendEmail(data.email, userEmail.subject, userEmail.html);
  } catch (error) {
    console.error('Error sending klin partnership emails:', error);
  }
};

export const sendKaizenProjectEmails = async (data: any) => {
  try {
    const userEmail = emailTemplates.kaizenProject.user(data.name);
    
    // Only send to client
    await sendEmail(data.email, userEmail.subject, userEmail.html);
  } catch (error) {
    console.error('Error sending kaizen project emails:', error);
  }
};

export const sendBuildPlannerEmails = async (data: any) => {
  try {
    const userEmail = emailTemplates.buildPlanner.user(data.name, data);
    
    // Only send to client
    await sendEmail(data.email, userEmail.subject, userEmail.html);
  } catch (error) {
    console.error('Error sending build planner emails:', error);
  }
};

export const sendNewsletterWelcomeEmail = async (email: string, name?: string) => {
  try {
    const welcomeEmail = emailTemplates.newsletter.user(email, name);
    await sendEmail(email, welcomeEmail.subject, welcomeEmail.html);
  } catch (error) {
    console.error('Error sending newsletter welcome email:', error);
  }
};
