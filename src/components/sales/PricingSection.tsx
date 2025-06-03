import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Shield, CreditCard, Zap, Globe } from 'lucide-react';

export const PricingSection = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4 inline-block">
            <Zap className="mr-1" size={14} />
            Simplified Pricing - Everything Included
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            One Price. Everything Included.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            No more choosing between features. Get everything you need to turn your listing into a lead machine for one simple price.
          </p>
          
          {/* Payment methods */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/cb12bb65-883d-4a31-97ea-4169a51747eb.png" 
                alt="PayPal" 
                className="h-8 w-auto"
              />
              <span className="text-gray-600 font-medium">Secure PayPal Billing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="text-blue-600" size={24} />
              <span className="text-gray-600 font-medium">All Major Credit Cards</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Plan */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-500 relative overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Complete AI Solution</h3>
                <p className="text-gray-600 text-lg mb-6">Turn your listing into a lead machine</p>
                
                <div className="mb-8">
                  <span className="text-5xl sm:text-6xl font-bold text-gray-900">$59</span>
                  <span className="text-gray-500 text-xl ml-2">/month</span>
                </div>

                <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-6 py-3 mb-8">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-800 font-medium">No setup fees • No upsells • Cancel anytime</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">🤖 AI Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Unlimited AI-powered listings</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Voice chat capabilities</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">24/7 automated responses</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Smart appointment scheduling</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">📱 Mobile & Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Real-time SMS notifications</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Mobile-optimized interface</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">QR code generation & analytics</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Lead capture & management</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">📊 Analytics & Support</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Detailed analytics dashboard</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Priority email support</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Regular feature updates</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">🚀 Premium Benefits</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">CRM integration ready</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Custom branding options</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">Unlimited usage</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  onClick={() => window.location.href = '/submit'}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-lg md:text-xl px-4 sm:px-6"
                  size="lg"
                >
                  <span className="block sm:hidden">Start AI Listing</span>
                  <span className="hidden sm:block">Start Your AI Listing - $59/month</span>
                </Button>

                <Button
                  onClick={() => window.location.href = '/demo-scraping'}
                  variant="outline"
                  className="px-6 py-4 text-lg border-orange-500 text-orange-600 hover:bg-orange-50"
                  size="lg"
                >
                  <Globe className="mr-2" size={18} />
                  <span className="hidden sm:inline">Try with Your Listing</span>
                  <span className="sm:hidden">Try Demo</span>
                </Button>
              </div>

              <p className="text-center text-gray-500 text-sm mt-4">
                Everything included • No hidden fees • 15-day money back guarantee
              </p>
            </div>
          </div>

          {/* Enterprise Option */}
          <div className="mt-8 bg-gray-900 rounded-xl p-6 text-center">
            <h3 className="text-white font-bold text-xl mb-2">Need White-Label or Custom Solutions?</h3>
            <p className="text-gray-300 mb-4">Perfect for agencies, brokerages, and enterprise teams</p>
            <Button
              onClick={() => window.location.href = '/submit'}
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
            >
              Contact Enterprise Sales
            </Button>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex items-center space-x-3 bg-green-50 border-2 border-green-200 rounded-full px-8 py-4">
            <Shield className="text-green-600" size={24} />
            <span className="text-green-800 font-bold text-lg">15-day satisfaction guarantee • Secure PayPal billing • Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};
