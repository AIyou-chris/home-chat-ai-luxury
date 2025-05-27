
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { systemPrompt, voiceId } = await req.json();
    
    const ultravoxApiKey = Deno.env.get('ULTRAVOX_API_KEY');
    if (!ultravoxApiKey) {
      console.error('ULTRAVOX_API_KEY not configured');
      throw new Error('ULTRAVOX_API_KEY not configured');
    }

    console.log('Creating Ultravox session with voice:', voiceId);

    // Create a new Ultravox session
    const response = await fetch('https://api.ultravox.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ultravoxApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemPrompt: systemPrompt || 'You are a helpful AI assistant.',
        voice: voiceId || 'terrence',
        model: 'fixie-ai/ultravox-v0_3',
        temperature: 0.7,
        maxDuration: 1800, // 30 minutes max
        recordingEnabled: false, // Disable recording for privacy
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ultravox API error:', response.status, errorText);
      throw new Error(`Ultravox API error: ${response.status} - ${errorText}`);
    }

    const session = await response.json();
    console.log('Ultravox session created:', {
      callId: session.callId,
      hasJoinUrl: !!session.joinUrl
    });
    
    // Validate session response
    if (!session.callId || !session.joinUrl) {
      console.error('Invalid session response:', session);
      throw new Error('Invalid session response from Ultravox API');
    }
    
    return new Response(JSON.stringify({
      sessionId: session.callId,
      websocketUrl: session.joinUrl,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating Ultravox session:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
