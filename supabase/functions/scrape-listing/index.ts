
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

    // Enhanced extraction functions
    const extractData = (patterns: RegExp[], text: string, defaultValue: string = '', cleanFunction?: (value: string) => string) => {
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
          const value = match[1].trim();
          return cleanFunction ? cleanFunction(value) : value;
        }
      }
      return defaultValue;
    };

    const cleanPrice = (price: string) => {
      // Extract price and format consistently
      const priceMatch = price.match(/\$[\d,]+/);
      return priceMatch ? priceMatch[0] : price;
    };

    const cleanTitle = (title: string) => {
      // Remove extra whitespace and common suffixes
      return title.replace(/\s*[-|]\s*.*/g, '').replace(/\s+/g, ' ').trim().substring(0, 100);
    };

    // Enhanced property information extraction
    const titlePatterns = [
      /<title[^>]*>([^<]+)<\/title>/i,
      /<h1[^>]*>([^<]+)<\/h1>/i,
      /property[_-]?title[\"']?\s*:\s*[\"']([^\"']+)[\"']/i,
      /listing[_-]?title[\"']?\s*:\s*[\"']([^\"']+)[\"']/i,
      /"title"\s*:\s*"([^"]+)"/i
    ];

    const pricePatterns = [
      /\$[\d,]+(?:\.\d{2})?/g,
      /price[\"']?\s*:\s*[\"']?(\$[\d,]+)[\"']?/i,
      /listing[_-]?price[\"']?\s*:\s*[\"']?(\$[\d,]+)[\"']?/i
    ];

    const bedsPatterns = [
      /(\d+)\s*bed(?:room)?s?/i,
      /beds?[\"']?\s*:\s*[\"']?(\d+)/i,
      /bedroom[s]?[\"']?\s*:\s*[\"']?(\d+)/i
    ];

    const bathsPatterns = [
      /(\d+(?:\.\d+)?)\s*bath(?:room)?s?/i,
      /baths?[\"']?\s*:\s*[\"']?(\d+(?:\.\d+)?)/i,
      /bathroom[s]?[\"']?\s*:\s*[\"']?(\d+(?:\.\d+)?)/i
    ];

    const sqftPatterns = [
      /(\d{1,3}(?:,\d{3})*)\s*sq\.?\s*ft/i,
      /sqft[\"']?\s*:\s*[\"']?(\d{1,3}(?:,\d{3})*)/i,
      /square[_-]?feet[\"']?\s*:\s*[\"']?(\d{1,3}(?:,\d{3})*)/i
    ];

    const addressPatterns = [
      /<address[^>]*>([^<]+)<\/address>/i,
      /address[\"']?\s*:\s*[\"']([^\"']+)[\"']/i,
      /property[_-]?address[\"']?\s*:\s*[\"']([^\"']+)[\"']/i,
      /location[\"']?\s*:\s*[\"']([^\"']+)[\"']/i
    ];

    // Extract property information using enhanced patterns
    const title = extractData(titlePatterns, html + content, 'Beautiful Property', cleanTitle);
    const priceMatches = content.match(pricePatterns[0]) || [];
    const price = priceMatches.length > 0 ? cleanPrice(priceMatches[0]) : '$750,000';
    const beds = extractData(bedsPatterns, content, '3');
    const baths = extractData(bathsPatterns, content, '2');
    const sqft = extractData(sqftPatterns, content, '2,200');
    const address = extractData(addressPatterns, html + content, 'Contact agent for address');

    // Enhanced image extraction
    const imageMatches = html.match(/<img[^>]+src=[\"']([^\"']+)[\"'][^>]*>/g) || [];
    const extractedImages = imageMatches
      .map(img => {
        const srcMatch = img.match(/src=[\"']([^\"']+)[\"']/);
        return srcMatch ? srcMatch[1] : null;
      })
      .filter(src => src && (
        src.includes('.jpg') || src.includes('.jpeg') || 
        src.includes('.png') || src.includes('.webp')
      ))
      .filter(src => 
        !src.includes('logo') && 
        !src.includes('icon') && 
        !src.includes('avatar') &&
        !src.includes('profile') &&
        src.length > 20 // Filter out very short URLs which are likely icons
      )
      .map(src => {
        // Convert relative URLs to absolute
        if (src.startsWith('//')) return 'https:' + src;
        if (src.startsWith('/')) {
          const urlObj = new URL(url);
          return urlObj.origin + src;
        }
        return src;
      })
      .slice(0, 6);

    // Use extracted images if we found good ones, otherwise fallback to demo images
    const images = extractedImages.length > 0 ? extractedImages : [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop'
    ];

    // Enhanced description extraction
    const descriptionPatterns = [
      /<meta[^>]+name=[\"']description[\"'][^>]+content=[\"']([^\"']+)[\"']/i,
      /<meta[^>]+property=[\"']og:description[\"'][^>]+content=[\"']([^\"']+)[\"']/i,
      /description[\"']?\s*:\s*[\"']([^\"']+)[\"']/i,
      /<p[^>]*class=[\"'][^\"']*description[^\"']*[\"'][^>]*>([^<]+)<\/p>/i
    ];

    const description = extractData(descriptionPatterns, html + content, 
      'Beautiful property with modern amenities and great location.');

    // Enhanced agent information extraction
    const agentNamePatterns = [
      /agent[_-]?name[\"']?\s*:\s*[\"']([^\"']+)[\"']/i,
      /listing[_-]?agent[\"']?\s*:\s*[\"']([^\"']+)[\"']/i,
      /realtor[_-]?name[\"']?\s*:\s*[\"']([^\"']+)[\"']/i,
      /<span[^>]*class=[\"'][^\"']*agent[^\"']*[\"'][^>]*>([^<]+)<\/span>/i
    ];

    const agentPhonePatterns = [
      /phone[\"']?\s*:\s*[\"']?([\(\d\)\s\-\.]{10,})[\"']?/i,
      /call[\"']?\s*:\s*[\"']?([\(\d\)\s\-\.]{10,})[\"']?/i,
      /contact[_-]?phone[\"']?\s*:\s*[\"']?([\(\d\)\s\-\.]{10,})[\"']?/i
    ];

    const agentEmailPatterns = [
      /email[\"']?\s*:\s*[\"']?([^\s,\n\"']+@[^\s,\n\"']+)[\"']?/i,
      /contact[_-]?email[\"']?\s*:\s*[\"']?([^\s,\n\"']+@[^\s,\n\"']+)[\"']?/i,
      /agent[_-]?email[\"']?\s*:\s*[\"']?([^\s,\n\"']+@[^\s,\n\"']+)[\"']?/i
    ];

    const agentName = extractData(agentNamePatterns, content, 'Professional Agent');
    const agentPhone = extractData(agentPhonePatterns, content, '(555) 123-4567');
    const agentEmail = extractData(agentEmailPatterns, content, 'agent@realestate.com');

    // Look for agent photos
    const agentPhoto = images.find(img => 
      img.toLowerCase().includes('agent') || 
      img.toLowerCase().includes('realtor') ||
      img.toLowerCase().includes('headshot') ||
      img.toLowerCase().includes('profile')
    ) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400';

    const scrapedData: ScrapedData = {
      title: title.substring(0, 100),
      price: price,
      beds: beds,
      baths: baths,
      sqft: sqft,
      description: description.substring(0, 500),
      images: images,
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
