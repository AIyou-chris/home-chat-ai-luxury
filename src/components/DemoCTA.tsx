
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const DemoCTA = () => {
  const handleStartListing = () => {
    window.location.href = '/realtor-submit';
  };

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-30">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 shadow-lg border border-orange-400/20">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="text-white" size={20} />
          <span className="text-white font-semibold text-sm">Demo Mode</span>
        </div>
        <h3 className="text-white font-bold text-lg mb-1">Love what you see?</h3>
        <p className="text-orange-100 text-sm mb-3">Get your own AI-powered listing with voice chat!</p>
        <Button 
          onClick={handleStartListing}
          className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold"
        >
          Start Your Listing
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
};
