
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse Twilio webhook data
    const formData = await req.formData();
    const messageSid = formData.get('MessageSid') as string;
    const messageStatus = formData.get('MessageStatus') as string;
    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;

    console.log('Twilio webhook received:', {
      messageSid,
      messageStatus,
      from,
      body: body?.substring(0, 100) // Log first 100 chars
    });

    // Handle delivery status updates
    if (messageSid && messageStatus) {
      const updateData: any = {
        delivery_status: messageStatus,
        updated_at: new Date().toISOString()
      };

      if (messageStatus === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      } else if (messageStatus === 'failed') {
        updateData.error_message = formData.get('ErrorMessage') || 'Delivery failed';
      }

      const { error: updateError } = await supabaseClient
        .from('sms_messages')
        .update(updateData)
        .eq('twilio_sid', messageSid);

      if (updateError) {
        console.error('Error updating message status:', updateError);
      }
    }

    // Handle incoming SMS replies
    if (from && body) {
      // Find the original message to link the response
      const { data: originalMessage } = await supabaseClient
        .from('sms_messages')
        .select('*')
        .eq('recipient_phone', from)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (originalMessage) {
        const { error: responseError } = await supabaseClient
          .from('sms_messages')
          .update({
            response_content: body,
            response_received_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', originalMessage.id);

        if (responseError) {
          console.error('Error logging SMS response:', responseError);
        }

        // Update campaign response count if applicable
        if (originalMessage.campaign_id) {
          const { error: campaignError } = await supabaseClient
            .rpc('increment_campaign_responses', {
              campaign_id: originalMessage.campaign_id
            });

          if (campaignError) {
            console.error('Error updating campaign response count:', campaignError);
          }
        }
      }
    }

    return new Response('OK', { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
