
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
    const { appointmentId } = await req.json();

    // Get appointment details
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('appointment_date, appointment_time')
      .eq('id', appointmentId)
      .single();

    if (appointmentError) throw appointmentError;

    // Parse appointment datetime
    const appointmentDateTime = new Date(`${appointment.appointment_date}T${convertTo24Hour(appointment.appointment_time)}`);
    
    // Calculate reminder times
    const oneDayBefore = new Date(appointmentDateTime.getTime() - 24 * 60 * 60 * 1000);
    const oneHourBefore = new Date(appointmentDateTime.getTime() - 60 * 60 * 1000);

    // Schedule reminders
    const reminders = [
      {
        appointment_id: appointmentId,
        reminder_type: '24hr',
        scheduled_for: oneDayBefore.toISOString()
      },
      {
        appointment_id: appointmentId,
        reminder_type: '1hr',
        scheduled_for: oneHourBefore.toISOString()
      }
    ];

    const { error: reminderError } = await supabase
      .from('reminders')
      .insert(reminders);

    if (reminderError) throw reminderError;

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error scheduling reminders:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  
  return `${hours.padStart(2, '0')}:${minutes}:00`;
}
