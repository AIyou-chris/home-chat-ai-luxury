
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
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
    const { message, propertyId, sessionId } = await req.json();

    // Get property data for context
    const { data: property } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propertyId)
      .single();

    // Get recent conversation history
    const { data: conversations } = await supabase
      .from('conversations')
      .select('user_message, ai_response')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(5);

    // Build conversation context
    let conversationHistory = '';
    if (conversations && conversations.length > 0) {
      conversationHistory = conversations.reverse().map(conv => 
        `Human: ${conv.user_message}\nAssistant: ${conv.ai_response}`
      ).join('\n\n');
    }

    // Create property context
    const propertyContext = property ? `
PROPERTY DETAILS:
- Title: ${property.title}
- Address: ${property.address}
- Price: ${property.price}
- Beds: ${property.beds}
- Baths: ${property.baths}
- Square Feet: ${property.sqft}
- Description: ${property.description}
- Features: ${property.features?.join(', ') || 'No features listed'}
- Neighborhood Data: ${JSON.stringify(property.neighborhood_data || {})}
- Market Data: ${JSON.stringify(property.market_data || {})}
    ` : '';

    const systemPrompt = `You are an AI real estate assistant representing this specific property. Your goal is to:

1. Answer questions about the property using the provided details
2. Highlight the property's best features and benefits
3. Address concerns and objections professionally
4. Guide conversations toward scheduling tours or contacting the agent
5. Qualify leads by understanding their needs, timeline, and budget
6. Create excitement and urgency about the property

${propertyContext}

CONVERSATION GUIDELINES:
- Be enthusiastic but professional
- Ask qualifying questions naturally in conversation
- Suggest next steps like tours, agent contact, or neighborhood visits
- Use the property's specific details in your responses
- If you don't have specific information, acknowledge it and offer to connect them with the agent

LEAD QUALIFICATION FOCUS:
- Timeline for purchasing
- Budget range
- Specific needs/requirements
- Current housing situation
- Interest level in this property

Previous conversation:
${conversationHistory}

Respond as the voice of this property, helping the potential buyer while gathering lead information.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const aiData = await response.json();
    const aiResponse = aiData.choices[0].message.content;

    // Store conversation in database
    await supabase.from('conversations').insert({
      property_id: propertyId,
      session_id: sessionId,
      user_message: message,
      ai_response: aiResponse,
      lead_score: calculateLeadScore(message), // Simple scoring
    });

    // Check if this looks like a qualified lead
    const isQualifiedLead = checkForLeadSignals(message, aiResponse);
    if (isQualifiedLead) {
      await supabase.from('leads').upsert({
        property_id: propertyId,
        session_id: sessionId,
        interest_level: 'high',
        qualified_status: 'qualified',
        notes: `Qualified through chat: ${message.substring(0, 100)}...`
      }, {
        onConflict: 'session_id'
      });
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      leadScore: calculateLeadScore(message)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function calculateLeadScore(message: string): number {
  let score = 0;
  const lowerMessage = message.toLowerCase();
  
  // Interest indicators
  if (lowerMessage.includes('tour') || lowerMessage.includes('visit') || lowerMessage.includes('see')) score += 20;
  if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) score += 25;
  if (lowerMessage.includes('move') || lowerMessage.includes('relocat')) score += 15;
  if (lowerMessage.includes('budget') || lowerMessage.includes('afford') || lowerMessage.includes('price')) score += 10;
  if (lowerMessage.includes('timeline') || lowerMessage.includes('when')) score += 10;
  if (lowerMessage.includes('mortgage') || lowerMessage.includes('financing')) score += 15;
  
  return Math.min(score, 100);
}

function checkForLeadSignals(userMessage: string, aiResponse: string): boolean {
  const signals = ['tour', 'visit', 'contact', 'agent', 'buy', 'purchase', 'serious', 'interested'];
  const combined = (userMessage + ' ' + aiResponse).toLowerCase();
  return signals.some(signal => combined.includes(signal));
}
