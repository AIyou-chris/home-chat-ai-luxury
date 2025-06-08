import React, { useState } from 'react';

const DemoWithScrapingSimple = () => {
  const [showDemo, setShowDemo] = useState(false);

  const handleSkip = () => {
    setShowDemo(true);
  };

  // Show simple URL input form
  if (!showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Try AI Chat with Your Real Listing
            </h1>
            <p className="text-lg text-gray-600">
              Enter your property listing URL or real estate website to see how our AI would work with your actual data.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Property Listing URL
              </label>
              <input
                id="url"
                type="url"
                placeholder="https://www.realtor.com/property/... or your MLS listing"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-2">
                Works with Realtor.com, Zillow, MLS listings, or your real estate website
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded"
              >
                Try with My Listing
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Skip - Use Demo
              </button>
            </div>
          </div>

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
        </div>
      </div>
    );
  }

  // Show demo content
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Mode Active!</h2>
        <p className="text-gray-600 mb-6">Your AI assistant is ready with sample property data</p>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">Sample Property Loaded</h3>
          <div className="text-left">
            <p><strong>Title:</strong> Luxury Modern Estate</p>
            <p><strong>Address:</strong> Beverly Hills, CA</p>
            <p><strong>Price:</strong> $4,750,000</p>
          </div>
          <button 
            onClick={() => setShowDemo(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Another Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoWithScrapingSimple; 