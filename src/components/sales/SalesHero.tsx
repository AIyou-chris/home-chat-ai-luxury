
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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-24">
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/cb12bb65-883d-4a31-97ea-4169a51747eb.png" 
              alt="Home Listing AI" 
              className="h-16 md:h-20 w-auto"
            />
          </div>
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">
            🚀 Revolutionary AI Technology for Real Estate
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              Turn Every Listing Into a 
              <span className="text-orange-500 block">24/7 Sales Agent</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Stop losing leads after hours. Our AI-powered chat system answers buyer questions instantly, 
              schedules appointments, and captures leads while you sleep.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDemoClick}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="mr-2" size={20} />
                See Live Demo
              </Button>
              
              <Button
                onClick={handleGetStartedClick}
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-green-500" size={20} />
                <span className="text-sm text-gray-600">300% more leads</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">24/7 availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Voice & text chat</span>
              </div>
            </div>
          </div>

          {/* Right Column - Demo Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                <h3 className="text-white font-semibold">Live Property Chat Demo</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-xl max-w-xs">
                    "Is the kitchen recently renovated?"
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-xl max-w-xs">
                    "Yes! The kitchen was completely renovated in 2023 with Italian marble countertops, premium appliances, and custom cabinetry. Would you like to schedule a viewing?"
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-3 rounded-xl max-w-xs">
                    "Perfect! How about this Saturday?"
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button 
                    onClick={handleDemoClick}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Try It Yourself →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
