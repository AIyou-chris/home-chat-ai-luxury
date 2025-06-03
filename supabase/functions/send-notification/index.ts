
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'lead' | 'appointment' | 'qr_scan' | 'test';
  email: string;
  data: any;
  agentId?: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const getEmailTemplate = (type: string, data: any) => {
  switch (type) {
    case 'lead':
      return {
        subject: `🏠 New Lead Alert - ${data.contact_name || 'New Contact'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🏠 New Lead Alert</h1>
            </div>
            <div style="background: white; padding: 20px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; margin-bottom: 20px;"><strong>You have a new lead!</strong></p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">Contact Information:</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${data.contact_name || 'Not provided'}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${data.contact_email || 'Not provided'}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.contact_phone || 'Not provided'}</p>
                ${data.property_address ? `<p style="margin: 5px 0;"><strong>Property:</strong> ${data.property_address}</p>` : ''}
                ${data.message ? `<p style="margin: 5px 0;"><strong>Message:</strong> ${data.message}</p>` : ''}
              </div>
              
              <p style="color: #666; font-size: 14px;">
                Time: ${new Date().toLocaleString()}<br>
                Source: Home Listing AI
              </p>
            </div>
          </div>
        `
      };

    case 'appointment':
      return {
        subject: `📅 New Appointment Booked - ${data.contact_name || 'New Contact'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">📅 New Appointment Booked</h1>
            </div>
            <div style="background: white; padding: 20px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; margin-bottom: 20px;"><strong>Someone has booked an appointment!</strong></p>
              
              <div style="background: #f0fff4; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">Appointment Details:</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${data.contact_name || 'Not provided'}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${data.contact_email || 'Not provided'}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.contact_phone || 'Not provided'}</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${data.appointment_date || 'Not specified'}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${data.appointment_time || 'Not specified'}</p>
                <p style="margin: 5px 0;"><strong>Type:</strong> ${data.showing_type || 'Not specified'}</p>
                ${data.property_address ? `<p style="margin: 5px 0;"><strong>Property:</strong> ${data.property_address}</p>` : ''}
              </div>
              
              <p style="color: #666; font-size: 14px;">
                Booked: ${new Date().toLocaleString()}<br>
                Source: Home Listing AI
              </p>
            </div>
          </div>
        `
      };

    case 'qr_scan':
      return {
        subject: `📱 QR Code Scanned - Property Viewing Alert`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">📱 QR Code Scanned</h1>
            </div>
            <div style="background: white; padding: 20px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; margin-bottom: 20px;"><strong>Someone scanned your property QR code!</strong></p>
              
              <div style="background: #fffaf0; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">Scan Details:</h3>
                ${data.property_address ? `<p style="margin: 5px 0;"><strong>Property:</strong> ${data.property_address}</p>` : ''}
                ${data.property_title ? `<p style="margin: 5px 0;"><strong>Listing:</strong> ${data.property_title}</p>` : ''}
                <p style="margin: 5px 0;"><strong>Scan Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p style="color: #666; font-size: 14px;">
                This indicates potential interest in your property listing.<br>
                Source: Home Listing AI QR Code
              </p>
            </div>
          </div>
        `
      };

    case 'test':
      return {
        subject: `🧪 Test Notification - Home Listing AI`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🧪 Test Notification</h1>
            </div>
            <div style="background: white; padding: 20px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; margin-bottom: 20px;"><strong>This is a test notification!</strong></p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0;">Your notification system is working correctly. You will receive alerts for:</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>New lead submissions</li>
                  <li>Appointment bookings</li>
                  <li>QR code scans</li>
                </ul>
              </div>
              
              <p style="color: #666; font-size: 14px;">
                Test sent: ${new Date().toLocaleString()}<br>
                From: Home Listing AI Notification System
              </p>
            </div>
          </div>
        `
      };

    default:
      return {
        subject: 'Notification from Home Listing AI',
        html: `<p>${data.message || 'You have a new notification.'}</p>`
      };
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, data, agentId }: NotificationRequest = await req.json();

    console.log('Sending notification:', { type, email, agentId });

    // Get email template
    const template = getEmailTemplate(type, data);

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Home Listing AI <notifications@resend.dev>",
      to: [email],
      subject: template.subject,
      html: template.html,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log notification event if agentId provided
    if (agentId && type !== 'test') {
      const { error: logError } = await supabase
        .from('notification_events')
        .insert({
          agent_id: agentId,
          event_type: type,
          event_data: data,
          notification_sent: true,
          notification_method: 'email',
          sent_at: new Date().toISOString()
        });

      if (logError) {
        console.error('Error logging notification event:', logError);
      }
    }

    return new Response(JSON.stringify({ success: true, ...emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
