
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SocialMediaData {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  virtualTour?: string;
  videoWalkthrough?: string;
}

interface SubmissionRequest {
  agentEmail: string;
  listingUrl: string;
  additionalNotes?: string;
  socialMedia?: SocialMediaData;
  customBuildInterest?: boolean;
  contactPhone?: string;
  callTime?: string;
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

    const { 
      agentEmail, 
      listingUrl, 
      additionalNotes, 
      socialMedia, 
      customBuildInterest, 
      contactPhone, 
      callTime 
    }: SubmissionRequest = await req.json();

    console.log('Processing submission for:', agentEmail, listingUrl);
    console.log('Custom build interest:', customBuildInterest);
    console.log('Social media data:', socialMedia);

    // Create submission record with new fields
    const { data: submission, error: submissionError } = await supabase
      .from('realtor_submissions')
      .insert({
        agent_email: agentEmail,
        listing_url: listingUrl,
        additional_notes: additionalNotes,
        processing_status: 'pending',
        // Store social media and consultation data as JSON
        social_media_links: socialMedia || {},
        custom_build_interest: customBuildInterest || false,
        contact_phone: contactPhone || null,
        preferred_call_time: callTime || null
      })
      .select()
      .single();

    if (submissionError) {
      console.error('Submission error:', submissionError);
      throw submissionError;
    }

    console.log('Submission created with ID:', submission.id);

    // If custom build consultation is requested, log this for follow-up
    if (customBuildInterest && contactPhone && callTime) {
      console.log('Scheduling builder consultation for:', {
        agentEmail,
        phone: contactPhone,
        preferredTime: callTime,
        submissionId: submission.id
      });
      
      // Here you could integrate with a calendar system, CRM, or send notifications
      // For now, we'll just log it for manual follow-up
    }

    // Trigger listing data extraction
    const extractionResponse = await supabase.functions.invoke('extract-listing-data', {
      body: {
        submissionId: submission.id,
        listingUrl: listingUrl,
        agentEmail: agentEmail,
        socialMedia: socialMedia
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

    const responseMessage = customBuildInterest 
      ? 'Submission received and processing started. A builder will reach out to discuss custom options!'
      : 'Submission received and processing started';

    return new Response(JSON.stringify({ 
      success: true, 
      submissionId: submission.id,
      message: responseMessage,
      customBuildScheduled: customBuildInterest && contactPhone && callTime
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
