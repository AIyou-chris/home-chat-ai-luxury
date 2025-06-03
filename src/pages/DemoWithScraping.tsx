
import React, { useState } from 'react';
import { DemoUrlInput } from '@/components/DemoUrlInput';
import { useSampleProperty } from '@/hooks/useSampleProperty';

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

const DemoWithScraping = () => {
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  // Transform scraped data to match the demo format
  const transformedProperty = scrapedData ? {
    id: 'scraped-demo',
    title: scrapedData.title,
    address: scrapedData.address,
    price: scrapedData.price,
    beds: parseInt(scrapedData.beds) || 3,
    baths: parseFloat(scrapedData.baths) || 2,
    sqft: scrapedData.sqft.replace(/,/g, ''),
    description: scrapedData.description,
    features: [
      `${scrapedData.beds} bedrooms`,
      `${scrapedData.baths} bathrooms`,
      `${scrapedData.sqft} square feet`,
      'Recently updated',
      'Move-in ready'
    ],
    images: scrapedData.images,
    neighborhood_data: {
      schools: ['Contact agent for school information'],
      nearby: ['Contact agent for nearby amenities'],
      walkScore: 75,
      demographics: scrapedData.address
    },
    market_data: {
      pricePerSqft: Math.round((parseInt(scrapedData.price.replace(/[$,]/g, '')) || 0) / (parseInt(scrapedData.sqft.replace(/,/g, '')) || 1)),
      daysOnMarket: 12,
      priceHistory: 'Recently listed',
      comparables: 'Contact agent for comparable properties'
    },
    agent: {
      name: scrapedData.agentName || 'Professional Agent',
      photo: scrapedData.agentPhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      phone: scrapedData.agentPhone || '(555) 123-4567',
      email: scrapedData.agentEmail || 'agent@realestate.com',
      bio: `Professional real estate agent specializing in ${scrapedData.address?.split(',')[1]?.trim() || 'local'} area properties.`,
      license: 'CA DRE #12345678',
      experience: '10+ years',
      specialties: ['Luxury Properties', 'First-Time Buyers', 'Investment Properties']
    }
  } : null;

  // Use the hook to potentially insert the transformed property data
  useSampleProperty();

  const handleDataScraped = (data: ScrapedData) => {
    console.log('Data scraped:', data);
    setScrapedData(data);
    setShowDemo(true);
  };

  const handleSkip = () => {
    setShowDemo(true);
  };

  if (!showDemo) {
    return <DemoUrlInput onDataScraped={handleDataScraped} onSkip={handleSkip} />;
  }

  // Redirect to main demo page with the property data
  // This will be handled by the routing system
  window.location.href = '/demo';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Preparing Your Demo...</h2>
        <p className="text-gray-600">Loading your personalized AI assistant</p>
      </div>
    </div>
  );
};

export default DemoWithScraping;
