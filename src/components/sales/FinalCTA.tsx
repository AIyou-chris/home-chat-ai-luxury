
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Ready to 3x Your Real Estate Leads?
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-orange-100 mb-6 sm:mb-8 leading-relaxed">
            Join the AI revolution in real estate. Start capturing leads 24/7 and never miss another opportunity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12">
            <Button
              onClick={() => window.location.href = '/realtor-submit'}
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2" size={20} />
            </Button>
            
            <Button
              onClick={() => window.location.href = '/'}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              See Live Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="text-white" size={20} />
              <span className="text-white font-medium">14-Day Free Trial</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Shield className="text-white" size={20} />
              <span className="text-white font-medium">Secure PayPal Billing</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Zap className="text-white" size={20} />
              <span className="text-white font-medium">Setup in 5 Minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 sm:mt-16 border-t border-orange-400/30 pt-6 sm:pt-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/fb2afea8-edfe-40f9-b8ce-9728d6cd7f40.png" 
              alt="Home Listing AI" 
              className="h-12 sm:h-14 w-auto"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-orange-100 text-center sm:text-left">
            <a href="/agent-dashboard" className="hover:text-white transition-colors">Agent Dashboard</a>
            <a href="mailto:support@homelistingai.com" className="hover:text-white transition-colors">Support</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
};
