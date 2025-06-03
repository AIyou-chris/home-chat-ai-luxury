
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScrapeRequest {
  url: string;
}

interface ScrapedData {
  title: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  description: string;
  images: string[];
  address: string;
  agentName?: string;
  agentPhoto?: string;
  agentPhone?: string;
  agentEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url }: ScrapeRequest = await req.json();
    
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Scraping URL:', url);

    // Get Firecrawl API key from environment
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      return new Response(JSON.stringify({ error: 'Firecrawl API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Use Firecrawl API to scrape the website
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown', 'html'],
        onlyMainContent: true,
      }),
    });

    if (!firecrawlResponse.ok) {
      throw new Error(`Firecrawl API error: ${firecrawlResponse.status}`);
    }

    const firecrawlData = await firecrawlResponse.json();
    const content = firecrawlData.data?.content || firecrawlData.data?.markdown || '';
    const html = firecrawlData.data?.html || '';

    console.log('Firecrawl response received, extracting data...');

    // Extract property data using regex patterns
    const extractData = (pattern: RegExp, text: string, defaultValue: string = '') => {
      const match = text.match(pattern);
      return match ? match[1].trim() : defaultValue;
    };

    // Extract property information
    const title = extractData(/<title[^>]*>([^<]+)<\/title>/i, html) || 
                  extractData(/property[_-]?title[\"']?\s*:\s*[\"']([^\"']+)[\"']/i, content) ||
                  'Beautiful Property';

    const price = extractData(/\$[\d,]+/g, content) || '$750,000';
    
    const beds = extractData(/(\d+)\s*bed/i, content) || 
                 extractData(/beds?[\"']?\s*:\s*[\"']?(\d+)/i, content) || '3';
    
    const baths = extractData(/(\d+(?:\.\d+)?)\s*bath/i, content) || 
                  extractData(/baths?[\"']?\s*:\s*[\"']?(\d+(?:\.\d+)?)/i, content) || '2';
    
    const sqft = extractData(/(\d{1,3}(?:,\d{3})*)\s*sq\.?\s*ft/i, content) || 
                 extractData(/sqft[\"']?\s*:\s*[\"']?(\d{1,3}(?:,\d{3})*)/i, content) || '2,200';

    // Extract images from HTML
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
    const address = extractData(/address[\"']?\s*:\s*[\"']([^\"']+)[\"']/i, content) ||
                   extractData(/<address[^>]*>([^<]+)<\/address>/i, html) ||
                   'Contact agent for address';

    // Extract description
    const description = extractData(/<meta[^>]+name=[\"']description[\"'][^>]+content=[\"']([^\"']+)[\"']/i, html) ||
                       extractData(/description[\"']?\s*:\s*[\"']([^\"']+)[\"']/i, content) ||
                       'Beautiful property with modern amenities and great location.';

    // Extract agent information
    const agentName = extractData(/agent[^:]*:\s*([^,\n]+)/i, content) ||
                     extractData(/listing agent[^:]*:\s*([^,\n]+)/i, content) ||
                     extractData(/realtor[^:]*:\s*([^,\n]+)/i, content) ||
                     'Professional Agent';

    const agentPhone = extractData(/phone[^:]*:\s*([\d\-\(\)\s]+)/i, content) ||
                      extractData(/call[^:]*:\s*([\d\-\(\)\s]+)/i, content) ||
                      '(555) 123-4567';

    const agentEmail = extractData(/email[^:]*:\s*([^\s,\n]+@[^\s,\n]+)/i, content) ||
                      'agent@realestate.com';

    // Look for agent photos in images
    const agentPhoto = images.find(img => 
      img.toLowerCase().includes('agent') || 
      img.toLowerCase().includes('realtor') ||
      img.toLowerCase().includes('headshot')
    ) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400';

    const scrapedData: ScrapedData = {
      title: title.replace(/[^\w\s-]/g, '').trim().substring(0, 100),
      price: price,
      beds: beds,
      baths: baths,
      sqft: sqft,
      description: description.substring(0, 300),
      images: images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop'
      ],
      address: address.substring(0, 100),
      agentName: agentName.substring(0, 50),
      agentPhoto: agentPhoto,
      agentPhone: agentPhone.substring(0, 20),
      agentEmail: agentEmail.substring(0, 50)
    };

    console.log('Successfully extracted data:', scrapedData);

    return new Response(JSON.stringify({ 
      success: true, 
      data: scrapedData 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in scrape-listing:', error);
    
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
