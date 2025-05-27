
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
    console.log('=== Ultravox Session Creation Started ===');
    
    const requestBody = await req.json();
    console.log('Request body received:', JSON.stringify(requestBody, null, 2));
    
    const { systemPrompt, voiceId } = requestBody;
    
    const ultravoxApiKey = Deno.env.get('ULTRAVOX_API_KEY');
    if (!ultravoxApiKey) {
      console.error('❌ ULTRAVOX_API_KEY not found in environment');
      throw new Error('ULTRAVOX_API_KEY not configured');
    }
    
    console.log('✅ ULTRAVOX_API_KEY found');
    console.log('📞 Creating Ultravox session with voice:', voiceId || 'default');

    const requestPayload = {
      systemPrompt: systemPrompt || 'You are a helpful AI assistant.',
      voice: voiceId || 'terrence',
      model: 'fixie-ai/ultravox-v0_3',
      temperature: 0.7,
      maxDuration: 1800,
      recordingEnabled: false,
    };
    
    console.log('📤 Sending request to Ultravox API:', JSON.stringify(requestPayload, null, 2));

    // Create a new Ultravox session
    const response = await fetch('https://api.ultravox.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ultravoxApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    console.log('📥 Ultravox API response status:', response.status);
    console.log('📥 Ultravox API response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Ultravox API error details:', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText
      });
      throw new Error(`Ultravox API error: ${response.status} - ${errorText}`);
    }

    const session = await response.json();
    console.log('✅ Ultravox session created successfully:', {
      callId: session.callId,
      joinUrl: session.joinUrl ? 'URL present' : 'URL missing',
      sessionKeys: Object.keys(session)
    });
    
    // Validate session response
    if (!session.callId) {
      console.error('❌ Missing callId in session response');
      throw new Error('Invalid session response: missing callId');
    }
    
    if (!session.joinUrl) {
      console.error('❌ Missing joinUrl in session response');
      throw new Error('Invalid session response: missing joinUrl');
    }
    
    const responseData = {
      sessionId: session.callId,
      websocketUrl: session.joinUrl,
    };
    
    console.log('✅ Returning session data:', {
      sessionId: responseData.sessionId,
      websocketUrl: responseData.websocketUrl ? 'URL present' : 'URL missing'
    });
    
    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Fatal error in ultravox-session function:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
