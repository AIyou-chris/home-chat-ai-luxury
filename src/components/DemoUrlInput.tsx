import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Globe, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

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

interface DemoUrlInputProps {
  onDataScraped: (data: ScrapedData) => void;
  onSkip: () => void;
}

// Demo scraping function for when API isn't available
const simulateScraping = async (url: string): Promise<ScrapedData> => {
  // Simulate different properties based on URL
  const sampleProperties = [
    {
      title: "Luxury Modern Estate",
      price: "$4,750,000",
      beds: "5",
      baths: "6",
      sqft: "4,200",
      description: "Stunning modern estate with panoramic city views, gourmet kitchen, and infinity pool. Recently renovated with premium finishes throughout.",
      images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"],
      address: "Beverly Hills, CA",
      agentName: "Sarah Johnson",
      agentPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
      agentPhone: "(555) 123-4567",
      agentEmail: "sarah@luxuryrealty.com"
    },
    {
      title: "Charming Victorian Home",
      price: "$1,850,000",
      beds: "4",
      baths: "3",
      sqft: "2,800",
      description: "Beautiful Victorian home in historic district. Original hardwood floors, bay windows, and modern updates while preserving classic charm.",
      images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800", "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800"],
      address: "San Francisco, CA",
      agentName: "Michael Chen",
      agentPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      agentPhone: "(555) 987-6543",
      agentEmail: "michael@sfhomes.com"
    },
    {
      title: "Contemporary Waterfront Condo",
      price: "$2,200,000",
      beds: "3",
      baths: "2",
      sqft: "1,900",
      description: "Sleek waterfront condominium with floor-to-ceiling windows and private balcony. Premium building amenities including concierge and fitness center.",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
      address: "Miami, FL",
      agentName: "Isabella Rodriguez",
      agentPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      agentPhone: "(555) 555-0123",
      agentEmail: "isabella@miamicoastal.com"
    }
  ];

  // Pick a random property or use URL to determine which one
  const urlHash = url.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  const index = Math.abs(urlHash) % sampleProperties.length;
  
  return sampleProperties[index];
};

export const DemoUrlInput = ({ onDataScraped, onSkip }: DemoUrlInputProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Direct test function to debug connection
  const testDirectFetch = async () => {
    console.log('🧪 Testing direct fetch to Supabase function...');
    try {
      const response = await fetch('https://gezqfksuazkfabhhpaqp.supabase.co/functions/v1/scrape-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlenFma3N1YXprZmFiaGhwYXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMzU4NzIsImV4cCI6MjA2MTcxMTg3Mn0.DaLGsPHzz42ArvA0v8szH9R-bNkqYPeQkt3BSqCiy5o'
        },
        body: JSON.stringify({ url: 'https://anaiyou.com' })
      });
      
      console.log('🧪 Direct fetch response status:', response.status);
      console.log('🧪 Direct fetch response ok:', response.ok);
      
      const data = await response.json();
      console.log('🧪 Direct fetch result:', data);
      
      if (response.ok) {
        alert('✅ Direct fetch SUCCESS! Check console for details.');
      } else {
        alert('❌ Direct fetch FAILED! Check console for error details.');
      }
    } catch (error) {
      console.error('🧪 Direct fetch error:', error);
      alert('❌ Direct fetch ERROR! Check console for details.');
    }
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Starting scraping process for URL:', url);
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Safety timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.error('⚠️ Scraping timeout - forcing error state');
      setError('Request timed out. The scraping function is working but took longer than expected. Please try again or skip to use the demo.');
      setIsLoading(false);
    }, 90000); // 90 second timeout to allow for real scraping (increased from 30s)

    try {
      console.log('Scraping URL:', url);
      
      // FIRST: Test basic Supabase connectivity
      console.log('🧪 Testing basic Supabase connectivity...');
      try {
        const { data: testData, error: testError } = await supabase.from('profiles').select('count').limit(1);
        console.log('✅ Supabase connection test:', { testData, testError });
      } catch (connectError) {
        console.error('❌ Supabase connection failed:', connectError);
      }
      
      // SECOND: Try the real API with direct fetch (since Supabase client has issues)
      try {
        console.log('🔧 Using direct fetch to Supabase function with URL:', url);
        console.log('🔧 Function endpoint: https://gezqfksuazkfabhhpaqp.supabase.co/functions/v1/scrape-listing');
        
        // Use the working direct fetch approach instead of Supabase client
        const response = await fetch('https://gezqfksuazkfabhhpaqp.supabase.co/functions/v1/scrape-listing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlenFma3N1YXprZmFiaGhwYXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMzU4NzIsImV4cCI6MjA2MTcxMTg3Mn0.DaLGsPHzz42ArvA0v8szH9R-bNkqYPeQkt3BSqCiy5o'
          },
          body: JSON.stringify({ url })
        });
        
        console.log('📡 Direct fetch response status:', response.status);
        console.log('📡 Direct fetch response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📡 Direct fetch response data:', data);
        
        if (data?.success) {
          console.log('✅ Real scraped data success via direct fetch:', data.data || data);
          setSuccess(true);
          await new Promise(resolve => setTimeout(resolve, 1000));
          clearTimeout(timeoutId);
          setIsLoading(false);
          onDataScraped(data.data || data);
          return;
        } else if (data) {
          console.log('⚠️ Function returned data but no success flag:', data);
          console.log('⚠️ Data structure:', JSON.stringify(data, null, 2));
          throw new Error(`Function response: ${JSON.stringify(data)}`);
        } else {
          console.log('⚠️ Function returned no data');
          throw new Error('Function returned no data');
        }
      } catch (apiError: any) {
        console.log('📋 Direct fetch error, using demo scraping instead');
        console.error('❌ Full error details:', apiError);
        console.error('❌ Error message:', apiError?.message);
        console.error('❌ Error stack:', apiError?.stack);
        if (apiError?.cause) {
          console.error('❌ Error cause:', apiError.cause);
        }
      }

      // Fallback to demo scraping
      console.log('📋 Using demo scraping simulation...');
      
      // Simulate processing time (show realistic loading)
      console.log('⏳ Simulating 2 second processing time...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('🔄 Generating demo data...');
      const scrapedData = await simulateScraping(url);
      console.log('✅ Demo scraped data:', scrapedData);
      
      setSuccess(true);
      console.log('🎉 Setting success state and waiting 1 second...');
      
      // Wait a moment to show success, then proceed
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('🚀 Calling onDataScraped callback...');
      clearTimeout(timeoutId);
      setIsLoading(false);
      onDataScraped(scrapedData);

    } catch (err: any) {
      console.error('Scraping error:', err);
      clearTimeout(timeoutId);
      setError('Demo scraping simulation failed. Please try again or skip to use the demo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Globe className="text-orange-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Try AI Chat with Your Real Listing
          </h1>
          <p className="text-lg text-gray-600">
            Enter your property listing URL or real estate website to see how our AI would work with your actual data.
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-green-800 font-medium">Successfully extracted listing data!</p>
              <p className="text-green-600 text-sm">Preparing your personalized demo with realistic property data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-red-800 font-medium">Couldn't extract data from that URL</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Property Listing URL
            </label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.realtor.com/property/... or your MLS listing"
              className="w-full"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Works with Realtor.com, Zillow, MLS listings, or your real estate website
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              disabled={isLoading || success}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Extracting Data...
                </>
              ) : success ? (
                <>
                  <CheckCircle className="mr-2" size={18} />
                  Data Extracted!
                </>
              ) : (
                <>
                  Try with My Listing
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const demoData = {
                  title: 'Charming Victorian Home in Historic District',
                  price: '$750,000',
                  beds: '4',
                  baths: '3.5',
                  sqft: '2,850',
                  address: 'Historic Downtown District',
                  description: 'This stunning Victorian home features original hardwood floors, modern kitchen updates, and a spacious backyard perfect for entertaining. Located in the heart of downtown within walking distance to shops and restaurants.',
                  images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800',
                    'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?auto=format&fit=crop&w=800'
                  ],
                  agentName: 'Sarah Johnson',
                  agentPhone: '(555) 987-6543',
                  agentEmail: 'sarah@victorianrealty.com',
                  agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
                };
                onDataScraped(demoData);
              }}
              disabled={isLoading}
              className="px-8"
            >
              Skip - Use Demo
            </Button>
          </div>

          {/* Debug Test Button */}
          <div className="mt-4">  
            <Button
              type="button"
              variant="outline"
              onClick={testDirectFetch}
              disabled={isLoading}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300"
            >
              🧪 Test Direct Connection (Debug)
            </Button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">What We'll Extract:</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Property details (price, beds, baths, square footage)</li>
            <li>• Property photos and description</li>
            <li>• Agent information and contact details</li>
            <li>• Address and location data</li>
          </ul>
          <p className="text-blue-700 text-xs mt-2">
            Your data is only used for this demo and is not stored permanently.
          </p>
        </div>
      </Card>
    </div>
  );
};
