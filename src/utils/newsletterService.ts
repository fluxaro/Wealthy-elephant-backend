import { resend } from '../config/resend';
import { db } from '../config/database';

interface NewsletterCampaign {
  id: string;
  subject: string;
  previewText?: string;
  fromName: string;
  content: {
    blocks: any[];
  };
}

// Convert blocks to HTML
function blocksToHtml(blocks: any[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case 'text':
        return block.content || '';
      
      case 'image':
        const imgHtml = `<img src="${block.url}" alt="${block.alt || ''}" style="max-width: 100%; height: auto;" />`;
        return block.link ? `<a href="${block.link}">${imgHtml}</a>` : imgHtml;
      
      case 'button':
        const buttonStyle = block.style === 'primary'
          ? 'background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;'
          : 'background-color: #f0f0f0; color: #333; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;';
        return `<div style="text-align: center; margin: 20px 0;"><a href="${block.link}" style="${buttonStyle}">${block.text}</a></div>`;
      
      default:
        return '';
    }
  }).join('\n');
}

// Generate email HTML template
function generateEmailHtml(campaign: NewsletterCampaign, trackingId?: string): string {
  const contentHtml = blocksToHtml(campaign.content.blocks);
  const baseUrl = process.env.FRONTEND_URL || 'https://www.wealthyelephant.com';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${campaign.subject}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
    <h1 style="color: #0066cc; margin-top: 0;">${campaign.fromName}</h1>
    ${contentHtml}
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
    <p style="font-size: 12px; color: #666; text-align: center;">
      You're receiving this email because you subscribed to ${campaign.fromName} newsletter.<br/>
      <a href="${baseUrl}/unsubscribe?id=${trackingId || ''}" style="color: #0066cc;">Unsubscribe</a>
    </p>
  </div>
  ${trackingId ? `<img src="${baseUrl}/api/newsletter/track/open/${trackingId}" width="1" height="1" alt="" />` : ''}
</body>
</html>
  `.trim();
}

// Send test newsletter
export async function sendTestNewsletter(campaign: NewsletterCampaign, testEmail: string): Promise<void> {
  const html = generateEmailHtml(campaign);

  await resend.emails.send({
    from: `${campaign.fromName} <${process.env.ADMIN_EMAIL || 'noreply@wealthyelephant.com'}>`,
    to: testEmail,
    subject: `[TEST] ${campaign.subject}`,
    html,
  });
}

// Send newsletter campaign to all active subscribers
export async function sendNewsletterCampaign(campaign: NewsletterCampaign): Promise<void> {
  try {
    // Get all active subscribers
    const { data: subscribers, error } = await db
      .from('NewsletterSubscriber')
      .select('*')
      .eq('isActive', true);

    if (error) throw error;

    if (!subscribers || subscribers.length === 0) {
      throw new Error('No active subscribers found');
    }

    let successCount = 0;
    let failCount = 0;

    // Send emails in batches
    const batchSize = 50;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (subscriber) => {
          try {
            const html = generateEmailHtml(campaign, subscriber.id);

            await resend.emails.send({
              from: `${campaign.fromName} <${process.env.ADMIN_EMAIL || 'noreply@wealthyelephant.com'}>`,
              to: subscriber.email,
              subject: campaign.subject,
              html,
            });

            successCount++;
          } catch (error) {
            console.error(`Failed to send to ${subscriber.email}:`, error);
            failCount++;
          }
        })
      );

      // Small delay between batches to avoid rate limits
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update campaign status
    await db
      .from('NewsletterCampaign')
      .update({
        status: 'sent',
        sentDate: new Date().toISOString(),
        totalSent: successCount,
      })
      .eq('id', campaign.id);

    console.log(`Campaign sent: ${successCount} success, ${failCount} failed`);
  } catch (error) {
    // Mark campaign as failed
    await db
      .from('NewsletterCampaign')
      .update({ status: 'failed' })
      .eq('id', campaign.id);

    throw error;
  }
}

// Track email open
export async function trackEmailOpen(subscriberId: string, campaignId: string): Promise<void> {
  try {
    // Check if already tracked
    const { data: existing } = await db
      .from('CampaignAnalytics')
      .select('id')
      .eq('subscriberId', subscriberId)
      .eq('campaignId', campaignId)
      .eq('eventType', 'open')
      .single();

    if (!existing) {
      // Record open event
      await db.from('CampaignAnalytics').insert({
        subscriberId,
        campaignId,
        eventType: 'open',
      });

      // Increment campaign open count
      const { data: campaign } = await db
        .from('NewsletterCampaign')
        .select('totalOpens')
        .eq('id', campaignId)
        .single();

      if (campaign) {
        await db
          .from('NewsletterCampaign')
          .update({ totalOpens: (campaign.totalOpens || 0) + 1 })
          .eq('id', campaignId);
      }
    }
  } catch (error) {
    console.error('Error tracking email open:', error);
  }
}

// Track email click
export async function trackEmailClick(subscriberId: string, campaignId: string, url: string): Promise<void> {
  try {
    // Record click event
    await db.from('CampaignAnalytics').insert({
      subscriberId,
      campaignId,
      eventType: 'click',
      eventData: { url },
    });

    // Increment campaign click count
    const { data: campaign } = await db
      .from('NewsletterCampaign')
      .select('totalClicks')
      .eq('id', campaignId)
      .single();

    if (campaign) {
      await db
        .from('NewsletterCampaign')
        .update({ totalClicks: (campaign.totalClicks || 0) + 1 })
        .eq('id', campaignId);
    }
  } catch (error) {
    console.error('Error tracking email click:', error);
  }
}
