
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe } from 'lucide-react';

export const DemoCTA = () => {
  const handleStartListing = () => {
    window.location.href = '/realtor-submit';
  };

  const handleTryWithListing = () => {
    window.location.href = '/demo-scraping';
  };

  return (
    <div className="px-2 md:px-8 max-w-7xl md:mx-auto py-8">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-none md:rounded-lg p-6 shadow-lg border border-orange-400/20">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="text-white" size={20} />
          <span className="text-white font-semibold text-sm">Demo Mode</span>
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Love what you see?</h3>
        <p className="text-orange-100 text-base mb-4">Get your own AI-powered listing with voice chat!</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleStartListing}
            className="flex-1 bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3"
          >
            Start Your Listing
            <ArrowRight className="ml-2" size={16} />
          </Button>
          
          <Button 
            onClick={handleTryWithListing}
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-3 px-6"
          >
            <Globe className="mr-2" size={16} />
            Try Your Listing
          </Button>
        </div>
      </div>
    </div>
  );
};
