
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubmissionRequest {
  agentEmail: string;
  listingUrl: string;
  callLogs?: string;
  additionalNotes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { agentEmail, listingUrl, callLogs, additionalNotes }: SubmissionRequest = await req.json();

    console.log('Processing submission for:', agentEmail, listingUrl);

    // Create submission record
    const { data: submission, error: submissionError } = await supabase
      .from('realtor_submissions')
      .insert({
        agent_email: agentEmail,
        listing_url: listingUrl,
        call_logs: callLogs,
        additional_notes: additionalNotes,
        processing_status: 'pending'
      })
      .select()
      .single();

    if (submissionError) {
      console.error('Submission error:', submissionError);
      throw submissionError;
    }

    // Trigger listing data extraction
    const extractionResponse = await supabase.functions.invoke('extract-listing-data', {
      body: {
        submissionId: submission.id,
        listingUrl: listingUrl,
        agentEmail: agentEmail
      }
    });

    if (extractionResponse.error) {
      console.error('Extraction error:', extractionResponse.error);
      // Update submission status to failed
      await supabase
        .from('realtor_submissions')
        .update({ processing_status: 'failed' })
        .eq('id', submission.id);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      submissionId: submission.id,
      message: 'Submission received and processing started'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in process-realtor-submission:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
