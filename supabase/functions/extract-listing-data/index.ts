
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ListingExtractionRequest {
  submissionId: string;
  listingUrl: string;
  agentEmail: string;
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

    const { submissionId, listingUrl, agentEmail }: ListingExtractionRequest = await req.json();

    console.log('Starting extraction for:', listingUrl);

    // Update submission status to processing
    await supabase
      .from('realtor_submissions')
      .update({ 
        processing_status: 'processing',
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId);

    // Fetch the listing page
    const response = await fetch(listingUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch listing: ${response.status}`);
    }

    const html = await response.text();

    // Extract property data using regex patterns
    const extractData = (pattern: RegExp, text: string, defaultValue: string = '') => {
      const match = text.match(pattern);
      return match ? match[1].trim() : defaultValue;
    };

    // Common property data extraction patterns
    const title = extractData(/<title[^>]*>([^<]+)<\/title>/i, html) || 
                  extractData(/property[_-]?title[\"']?\s*:\s*[\"']([^\"']+)[\"']/i, html) ||
                  'Extracted Property';

    const price = extractData(/\$[\d,]+/g, html) || '$0';
    
    const beds = extractData(/(\d+)\s*bed/i, html) || 
                 extractData(/beds?[\"']?\s*:\s*[\"']?(\d+)/i, html) || '0';
    
    const baths = extractData(/(\d+(?:\.\d+)?)\s*bath/i, html) || 
                  extractData(/baths?[\"']?\s*:\s*[\"']?(\d+(?:\.\d+)?)/i, html) || '0';
    
    const sqft = extractData(/(\d{1,3}(?:,\d{3})*)\s*sq\.?\s*ft/i, html) || 
                 extractData(/sqft[\"']?\s*:\s*[\"']?(\d{1,3}(?:,\d{3})*)/i, html) || '0';

    // Extract images
    const imageMatches = html.match(/<img[^>]+src=[\"']([^\"']+)[\"'][^>]*>/g) || [];
    const images = imageMatches
      .map(img => {
        const srcMatch = img.match(/src=[\"']([^\"']+)[\"']/);
        return srcMatch ? srcMatch[1] : null;
      })
      .filter(src => src && (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png') || src.includes('.webp')))
      .filter(src => !src.includes('logo') && !src.includes('icon'))
      .slice(0, 6);

    // Extract address
    const address = extractData(/address[\"']?\s*:\s*[\"']([^\"']+)[\"']/i, html) ||
                   extractData(/<address[^>]*>([^<]+)<\/address>/i, html) ||
                   'Address not found';

    // Extract description
    const description = extractData(/<meta[^>]+name=[\"']description[\"'][^>]+content=[\"']([^\"']+)[\"']/i, html) ||
                       extractData(/description[\"']?\s*:\s*[\"']([^\"']+)[\"']/i, html) ||
                       'Property description not available';

    // Create property record
    const propertyData = {
      title: title.replace(/[^\w\s-]/g, '').trim(),
      listing_url: listingUrl,
      address: address,
      price: price,
      beds: parseInt(beds) || null,
      baths: parseFloat(baths) || null,
      sqft: sqft.replace(/,/g, ''),
      description: description.substring(0, 500),
      features: [
        'Recently extracted from listing',
        'Automated data collection',
        'Contact agent for full details'
      ],
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop'
      ],
      neighborhood_data: {
        schools: ['Contact agent for school information'],
        nearby: ['Contact agent for nearby amenities'],
        walkScore: 50,
        demographics: 'Contact agent for demographic details'
      },
      market_data: {
        pricePerSqft: Math.round((parseInt(price.replace(/[$,]/g, '')) || 0) / (parseInt(sqft.replace(/,/g, '')) || 1)),
        daysOnMarket: 0,
        priceHistory: 'Recently listed',
        comparables: 'Contact agent for comparable properties'
      }
    };

    // Insert property into database
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();

    if (propertyError) {
      console.error('Property insert error:', propertyError);
      throw propertyError;
    }

    // Update submission status to completed
    await supabase
      .from('realtor_submissions')
      .update({ 
        processing_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId);

    console.log('Successfully extracted and created property:', property.id);

    return new Response(JSON.stringify({ 
      success: true, 
      propertyId: property.id,
      extractedData: propertyData 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in extract-listing-data:', error);
    
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
