
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, TrendingUp } from 'lucide-react';

export const SalesHero = () => {
  const handleDemoClick = () => {
    window.location.href = '/';
  };

  const handleGetStartedClick = () => {
    window.location.href = '/realtor-submit';
  };

  return (
    <div className="relative min-h-screen overflow-hidden w-full">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/lovable-uploads/8fee2013-89fc-47e0-ba14-1795e366cdc3.png)`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      <div className="relative z-10 min-h-screen flex flex-col w-full">
        {/* Header with Left-Justified Bigger Logo */}
        <div className="w-full px-4 py-6">
          <div className="w-full flex justify-start">
            <img 
              src="/lovable-uploads/cb12bb65-883d-4a31-97ea-4169a51747eb.png" 
              alt="Home Listing AI" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full">
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4 sm:mb-6 inline-block text-xs sm:text-sm">
                🚀 Revolutionary AI Technology for Real Estate
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-4 sm:mb-6">
                Turn Every Listing Into a 
                <span className="text-orange-500 block">24/7 Sales Agent</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 sm:mb-8 max-w-4xl">
                Stop losing leads after hours. Our AI-powered chat system answers buyer questions instantly, 
                schedules appointments, and captures leads while you sleep.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Button
                  onClick={handleDemoClick}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <Play className="mr-2" size={18} />
                  See Live Demo
                </Button>
                
                <Button
                  onClick={handleGetStartedClick}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-400" size={18} />
                  <span className="text-sm text-gray-300">300% more leads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">24/7 availability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Voice & text chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Preview Card - Hidden on mobile, visible on large screens */}
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 hidden xl:block">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-sm">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
              <h3 className="text-white font-semibold">Live Property Chat Demo</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-xl max-w-xs text-sm">
                  "Is the kitchen recently renovated?"
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-xl max-w-xs text-sm">
                  "Yes! The kitchen was completely renovated in 2023 with Italian marble countertops and premium appliances."
                </div>
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={handleDemoClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm"
                >
                  Try It Yourself →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
