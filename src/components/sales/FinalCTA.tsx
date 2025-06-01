
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Clock, Shield, Zap, Mail, Phone } from 'lucide-react';

export const FinalCTA = () => {
  const [email, setEmail] = useState('');

  const handleStartListing = () => {
    window.location.href = '/realtor-submit';
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact email:', email);
    setEmail('');
  };

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
              onClick={handleStartListing}
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Start Your Listing in 5 Minutes
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="text-white" size={20} />
              <span className="text-white font-medium">Money Back Guarantee 15 Days</span>
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

          {/* Contact Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Contact Us</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4">
              <div className="flex items-center space-x-2 text-white">
                <Phone className="text-orange-200" size={20} />
                <span className="font-medium">206-755-1047</span>
              </div>
              <form onSubmit={handleContactSubmit} className="flex gap-2 w-full sm:w-auto">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-white/70 w-full sm:w-64"
                  required
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 whitespace-nowrap"
                >
                  <Mail className="mr-1" size={16} />
                  Contact
                </Button>
              </form>
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
