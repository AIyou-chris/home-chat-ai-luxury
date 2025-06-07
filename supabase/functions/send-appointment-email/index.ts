
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
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
    const { appointmentId, type } = await req.json();

    // Get appointment details
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    if (appointmentError) throw appointmentError;

    // Get property details
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('title, address')
      .eq('id', appointment.property_id)
      .single();

    if (propertyError) throw propertyError;

    let subject = '';
    let htmlContent = '';

    if (type === 'confirmation') {
      subject = `Appointment Confirmed - ${property.title}`;
      htmlContent = `
        <h2>Your Property Showing is Confirmed!</h2>
        <p>Dear ${appointment.contact_name},</p>
        <p>Your appointment to view <strong>${property.title}</strong> has been confirmed.</p>
        
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Property:</strong> ${property.title}</li>
          <li><strong>Address:</strong> ${property.address}</li>
          <li><strong>Date:</strong> ${new Date(appointment.appointment_date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${appointment.appointment_time}</li>
          <li><strong>Type:</strong> ${appointment.showing_type === 'in-person' ? 'In-Person Tour' : 'Virtual Tour'}</li>
        </ul>
        
        <p>An agent will contact you shortly to finalize the details.</p>
        <p>If you need to reschedule or have any questions, please contact us at (310) 555-0123.</p>
        
        <p>Best regards,<br>The Real Estate Team</p>
      `;
    } else if (type === '24hr') {
      subject = `Reminder: Property Showing Tomorrow - ${property.title}`;
      htmlContent = `
        <h2>Reminder: Your Property Showing is Tomorrow!</h2>
        <p>Dear ${appointment.contact_name},</p>
        <p>This is a friendly reminder that you have a scheduled appointment to view <strong>${property.title}</strong> tomorrow.</p>
        
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Property:</strong> ${property.title}</li>
          <li><strong>Address:</strong> ${property.address}</li>
          <li><strong>Date:</strong> ${new Date(appointment.appointment_date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${appointment.appointment_time}</li>
          <li><strong>Type:</strong> ${appointment.showing_type === 'in-person' ? 'In-Person Tour' : 'Virtual Tour'}</li>
        </ul>
        
        <p>We look forward to seeing you tomorrow!</p>
        <p>If you need to reschedule, please contact us at (310) 555-0123.</p>
        
        <p>Best regards,<br>The Real Estate Team</p>
      `;
    } else if (type === '1hr') {
      subject = `Reminder: Property Showing in 1 Hour - ${property.title}`;
      htmlContent = `
        <h2>Your Property Showing is in 1 Hour!</h2>
        <p>Dear ${appointment.contact_name},</p>
        <p>This is a reminder that your appointment to view <strong>${property.title}</strong> is in 1 hour.</p>
        
        <h3>Appointment Details:</h3>
        <ul>
          <li><strong>Property:</strong> ${property.title}</li>
          <li><strong>Address:</strong> ${property.address}</li>
          <li><strong>Time:</strong> ${appointment.appointment_time}</li>
          <li><strong>Type:</strong> ${appointment.showing_type === 'in-person' ? 'In-Person Tour' : 'Virtual Tour'}</li>
        </ul>
        
        <p>See you soon!</p>
        <p>Contact: (310) 555-0123</p>
        
        <p>Best regards,<br>The Real Estate Team</p>
      `;
    }

    if (appointment.contact_email) {
      const { error: emailError } = await resend.emails.send({
        from: 'Real Estate Team <onboarding@resend.dev>',
        to: [appointment.contact_email],
        subject: subject,
        html: htmlContent,
      });

      if (emailError) throw emailError;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending appointment email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
