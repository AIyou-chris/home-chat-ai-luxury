
import { Button } from '@/components/ui/button';
import { Play, Globe } from 'lucide-react';
import { useState } from 'react';

export const DemoSection = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const demoImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=2940&auto=format&fit=crop"
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            Experience our AI-powered property chat yourself. Try it with your actual listing or use our sample property.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Demo Preview with Gallery */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-orange-500 p-4 flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm sm:text-base">Live Demo: $4.75M Beverly Hills Estate</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                {/* Main Image */}
                <img 
                  src={demoImages[selectedImage]}
                  alt="Luxury Property Demo"
                  className="w-full h-32 sm:h-48 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => window.location.href = '/demo'}
                />
                
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {demoImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded overflow-hidden transition-all duration-300 ${
                        selectedImage === index
                          ? 'ring-2 ring-orange-400 scale-105'
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-400 text-sm font-medium">Visitor</span>
                      <span className="text-gray-400 text-xs">2:31 PM</span>
                    </div>
                    <p className="text-white text-sm">"What's the neighborhood like for families?"</p>
                  </div>
                  
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">AI Assistant</span>
                      <span className="text-orange-100 text-xs">2:31 PM</span>
                    </div>
                    <p className="text-white text-sm">"This Beverly Hills location is excellent for families! You're within walking distance of top-rated schools, family parks, and safe neighborhood streets. Would you like me to schedule a family-friendly tour?"</p>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-400 text-sm font-medium">Visitor</span>
                      <span className="text-gray-400 text-xs">2:32 PM</span>
                    </div>
                    <p className="text-white text-sm">"Yes, how about this Saturday morning?"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Details */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Try Our Full-Featured Demo
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Experience our AI system with your actual listing or use our sample property. 
                Chat with the AI, ask questions about the property, schedule appointments, and see how it captures leads.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Ask about property features, neighborhood, schools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Experience voice chat capabilities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">See automatic appointment scheduling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Watch lead capture in action</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.location.href = '/demo-scraping'}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
              >
                <Globe className="mr-2" size={20} />
                Try with Your Listing
              </Button>
              
              <Button
                onClick={() => window.location.href = '/demo'}
                variant="outline"
                size="lg"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl flex-1"
              >
                <Play className="mr-2" size={20} />
                Use Sample Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
