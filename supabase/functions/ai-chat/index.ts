
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

    // Create comprehensive property context including restraints
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

NEIGHBORHOOD & RESTRAINTS DATA:
${property.neighborhood_data?.restraints ? `
HOA INFORMATION:
- HOA Name: ${property.neighborhood_data.restraints.hoa?.name}
- Monthly Fee: ${property.neighborhood_data.restraints.hoa?.monthlyFee}
- Yearly Fee: ${property.neighborhood_data.restraints.hoa?.yearlyFee}
- HOA Rules: ${property.neighborhood_data.restraints.hoa?.rules?.join('; ') || 'None specified'}
- HOA Amenities: ${property.neighborhood_data.restraints.hoa?.amenities?.join('; ') || 'None specified'}

ZONING INFORMATION:
- Zoning: ${property.neighborhood_data.restraints.zoning?.designation}
- Description: ${property.neighborhood_data.restraints.zoning?.description}
- Zoning Restrictions: ${property.neighborhood_data.restraints.zoning?.restrictions?.join('; ') || 'None specified'}
- Allowed Uses: ${property.neighborhood_data.restraints.zoning?.allowedUses?.join('; ') || 'None specified'}

DEED RESTRICTIONS:
${property.neighborhood_data.restraints.deedRestrictions?.join('; ') || 'None specified'}

BUILDING CODES & PERMITS:
- Required Permits: ${property.neighborhood_data.restraints.buildingCodes?.permits?.join('; ') || 'None specified'}
- Code Requirements: ${property.neighborhood_data.restraints.buildingCodes?.requirements?.join('; ') || 'None specified'}

ENVIRONMENTAL CONSIDERATIONS:
${property.neighborhood_data.restraints.environmental?.join('; ') || 'None specified'}
` : 'Detailed restraint information not available'}

- Other Neighborhood Data: ${JSON.stringify(property.neighborhood_data || {})}
- Market Data: ${JSON.stringify(property.market_data || {})}
    ` : '';

    const systemPrompt = `You are an expert AI real estate assistant with comprehensive knowledge about this specific property and all its legal, regulatory, and community restraints. Your goal is to:

1. Answer detailed questions about property restrictions, HOA rules, zoning laws, and deed restrictions
2. Explain what buyers can and cannot do with the property
3. Highlight important legal and regulatory considerations
4. Guide conversations toward scheduling tours or contacting the agent
5. Qualify leads by understanding their needs, timeline, and budget
6. Create excitement about the property while being transparent about restrictions

IMPORTANT LEGAL DISCLAIMER: Always remind users that property restrictions can change and should be verified with professionals including real estate attorneys, title companies, and local planning departments before making decisions.

${propertyContext}

RESTRAINTS EXPERTISE:
- Provide specific details about HOA fees, rules, and amenities
- Explain zoning restrictions and what can be built on the property
- Discuss deed restrictions and their implications
- Clarify permit requirements for modifications
- Address environmental considerations and disclosures
- Always recommend professional verification of restrictions

CONVERSATION GUIDELINES:
- Be thorough and specific when discussing restraints and restrictions
- Use the exact details from the property data
- Explain complex legal concepts in simple terms
- Always include the legal disclaimer when discussing restrictions
- Ask qualifying questions naturally in conversation
- If asked about restrictions not in the data, clearly state what information is missing

LEAD QUALIFICATION FOCUS:
- Timeline for purchasing
- Budget range and financing plans
- Specific renovation or modification plans
- Understanding of HOA requirements
- Comfort level with property restrictions

Previous conversation:
${conversationHistory}

Respond as the expert voice for this property, providing comprehensive restraint information while helping potential buyers and gathering lead information.`;

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
        max_tokens: 600
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
      lead_score: calculateLeadScore(message),
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
  
  // Restraint-related interest indicators
  if (lowerMessage.includes('hoa') || lowerMessage.includes('restrictions') || lowerMessage.includes('rules')) score += 12;
  if (lowerMessage.includes('renovate') || lowerMessage.includes('modify') || lowerMessage.includes('build')) score += 18;
  if (lowerMessage.includes('zoning') || lowerMessage.includes('permits')) score += 10;
  
  return Math.min(score, 100);
}

function checkForLeadSignals(userMessage: string, aiResponse: string): boolean {
  const signals = ['tour', 'visit', 'contact', 'agent', 'buy', 'purchase', 'serious', 'interested', 'renovate', 'modify'];
  const combined = (userMessage + ' ' + aiResponse).toLowerCase();
  return signals.some(signal => combined.includes(signal));
}
