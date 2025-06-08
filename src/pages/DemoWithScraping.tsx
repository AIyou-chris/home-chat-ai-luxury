import React, { useState } from "react";
import { DemoUrlInput } from "../components/DemoUrlInput";
import { ScrapedResultsPreview } from "../components/ScrapedResultsPreview";
import { useSampleProperty } from "../hooks/useSampleProperty";
import PropertyAIChat from "../PropertyAIChat.jsx";

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
  const [currentStep, setCurrentStep] = useState<'input' | 'preview' | 'chat'>('input');
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  // Debug logging
  console.log('🔍 DemoWithScraping render - currentStep:', currentStep, 'scrapedData:', scrapedData, 'showDemo:', showDemo);

  // Use the useSampleProperty hook with scraped data when available
  useSampleProperty(scrapedData);

  const handleDataScraped = (data: ScrapedData) => {
    console.log('Data scraped successfully:', data);
    setScrapedData(data);
    setCurrentStep('preview');
  };

  const handleSkipToDemo = () => {
    console.log('Skipping to demo mode');
    setShowDemo(true);
    setCurrentStep('chat');
  };

  const handleContinueToChat = () => {
    console.log('Continuing to chat with scraped data');
    setCurrentStep('chat');
  };

  const handleTryAgain = () => {
    console.log('Trying again with new URL');
    setScrapedData(null);
    setCurrentStep('input');
  };

  // Show the URL input form
  if (currentStep === 'input') {
    return (
      <DemoUrlInput 
        onDataScraped={handleDataScraped}
        onSkip={handleSkipToDemo}
      />
    );
  }

  // Show the scraped results preview
  if (currentStep === 'preview' && scrapedData) {
    return (
      <ScrapedResultsPreview
        scrapedData={scrapedData}
        onContinue={handleContinueToChat}
        onTryAgain={handleTryAgain}
      />
    );
  }

  // Show the chat interface
  if (currentStep === 'chat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        {showDemo && (
          <div className="bg-blue-600 text-white text-center py-2 px-4">
            <p className="font-medium">Demo Mode Active! Using sample property data for demonstration.</p>
          </div>
        )}
        {scrapedData && !showDemo && (
          <div className="bg-green-600 text-white text-center py-2 px-4">
            <p className="font-medium">Using your real property data from URL scraping!</p>
          </div>
        )}
        <PropertyAIChat />
      </div>
    );
  }

  // Fallback - should never reach here
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-red-600 mb-4">Debug: Unexpected State</h2>
        <p>CurrentStep: {currentStep}</p>
        <p>ScrapedData: {scrapedData ? 'Yes' : 'No'}</p>
        <p>ShowDemo: {showDemo ? 'Yes' : 'No'}</p>
        <button 
          onClick={() => {
            setCurrentStep('input');
            setScrapedData(null);
            setShowDemo(false);
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Reset to Input
        </button>
      </div>
    </div>
  );
};

export default DemoWithScraping;
