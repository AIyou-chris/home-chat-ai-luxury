
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
    const { systemPrompt } = await req.json();
    
    const ultravoxApiKey = Deno.env.get('ULTRAVOX_API_KEY');
    if (!ultravoxApiKey) {
      throw new Error('ULTRAVOX_API_KEY not configured');
    }

    // Create a new Ultravox session
    const response = await fetch('https://api.ultravox.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ultravoxApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemPrompt: systemPrompt || 'You are a helpful AI assistant.',
        voice: 'terrence', // You can customize this
        model: 'fixie-ai/ultravox-v0_3',
        temperature: 0.7,
        maxDuration: 1800, // 30 minutes max
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ultravox API error:', errorText);
      throw new Error(`Ultravox API error: ${response.status}`);
    }

    const session = await response.json();
    
    return new Response(JSON.stringify({
      sessionId: session.callId,
      websocketUrl: session.joinUrl,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating Ultravox session:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
