
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SMSRequest {
  to: string;
  message: string;
  campaignId?: string;
  recipientName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { to, message, campaignId, recipientName }: SMSRequest = await req.json();

    // Twilio credentials from environment
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      throw new Error('Twilio credentials not configured');
    }

    // Create basic auth header for Twilio API
    const auth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);

    // Send SMS via Twilio API
    const twilioResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: to,
          From: twilioPhoneNumber,
          Body: message,
        }),
      }
    );

    const twilioData = await twilioResponse.json();

    if (!twilioResponse.ok) {
      throw new Error(`Twilio API error: ${twilioData.message}`);
    }

    // Log the SMS message in our database
    const { data: smsRecord, error: dbError } = await supabaseClient
      .from('sms_messages')
      .insert({
        campaign_id: campaignId || null,
        recipient_phone: to,
        recipient_name: recipientName || null,
        message_content: message,
        twilio_sid: twilioData.sid,
        status: 'sent',
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Don't fail the SMS send if DB logging fails
    }

    console.log('SMS sent successfully:', {
      sid: twilioData.sid,
      to: to,
      status: twilioData.status
    });

    return new Response(
      JSON.stringify({
        success: true,
        sid: twilioData.sid,
        status: twilioData.status,
        messageId: smsRecord?.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('SMS sending error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
