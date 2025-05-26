
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = new Date();
    
    // Get pending reminders that are due
    const { data: dueReminders, error: reminderError } = await supabase
      .from('reminders')
      .select('*, appointments(*)')
      .eq('status', 'pending')
      .lte('scheduled_for', now.toISOString());

    if (reminderError) throw reminderError;

    let processedCount = 0;

    for (const reminder of dueReminders || []) {
      try {
        // Send the reminder email
        const { error: emailError } = await supabase.functions.invoke('send-appointment-email', {
          body: { 
            appointmentId: reminder.appointment_id, 
            type: reminder.reminder_type 
          }
        });

        if (emailError) {
          console.error(`Failed to send reminder ${reminder.id}:`, emailError);
          // Mark as failed
          await supabase
            .from('reminders')
            .update({ status: 'failed' })
            .eq('id', reminder.id);
        } else {
          // Mark as sent
          await supabase
            .from('reminders')
            .update({ 
              status: 'sent',
              sent_at: now.toISOString()
            })
            .eq('id', reminder.id);
          
          processedCount++;
        }
      } catch (error) {
        console.error(`Error processing reminder ${reminder.id}:`, error);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      processed: processedCount,
      total: dueReminders?.length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing reminders:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
