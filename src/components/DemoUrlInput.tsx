
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Globe, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

export const DemoUrlInput = ({ onDataScraped, onSkip }: DemoUrlInputProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      console.log('Scraping URL:', url);
      
      const { data, error } = await supabase.functions.invoke('scrape-listing', {
        body: { url }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to scrape website');
      }

      console.log('Scraped data:', data.data);
      setSuccess(true);
      
      // Wait a moment to show success, then proceed
      setTimeout(() => {
        onDataScraped(data.data);
      }, 1000);

    } catch (err: any) {
      console.error('Scraping error:', err);
      setError(err.message || 'Failed to scrape website. Please try a different URL or skip to use the demo.');
    } finally {
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
              <p className="text-green-800 font-medium">Successfully extracted your listing data!</p>
              <p className="text-green-600 text-sm">Preparing your personalized demo...</p>
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
              onClick={onSkip}
              disabled={isLoading}
              className="px-8"
            >
              Skip - Use Demo
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
