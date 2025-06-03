
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingUp, Clock, Users, MessageSquare, Calendar, Smartphone } from 'lucide-react';

export const ValuePropositionSection = () => {
  return (
    <div className="py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-red-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4 inline-block text-lg px-4 py-2">
              <Zap className="mr-2" size={18} />
              Lead Generation Revolution
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Your Listing Into a
              <span className="text-orange-500 block">24/7 Lead Machine</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stop letting potential buyers slip away. Our AI transforms every property visit 
              into a lead capture opportunity with intelligent conversations and instant follow-ups.
            </p>
          </div>

          {/* Mobile Sales Integration */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Content */}
            <div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4 inline-block">
                <Smartphone className="mr-1" size={14} />
                Mobile-First Solution
              </Badge>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Your Sales Agent in Your Pocket
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Capture leads, schedule appointments, and close deals whether you're at the office, 
                showing properties, or relaxing at home. Your AI works 24/7 from any device.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Instant Response Anywhere</h4>
                    <p className="text-gray-600">Get SMS notifications the moment someone interacts with your listing.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Never Miss a Lead</h4>
                    <p className="text-gray-600">Your pocket sales agent captures leads 24/7, even while you sleep.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 rounded-full p-2 flex-shrink-0">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Manage Multiple Listings</h4>
                    <p className="text-gray-600">Handle unlimited properties from one mobile dashboard.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual - Mobile Mockup */}
            <div className="relative">
              <div className="relative max-w-sm mx-auto">
                <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white text-center">
                      <h4 className="font-semibold">Home Listing AI</h4>
                      <p className="text-sm text-orange-100">3 active listings</p>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-800">New Lead</span>
                        </div>
                        <p className="text-xs text-green-700">Someone is chatting about Oak Street property</p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-blue-800">Appointment Scheduled</span>
                        </div>
                        <p className="text-xs text-blue-700">Viewing set for tomorrow 2 PM</p>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm font-medium text-orange-800">Voice Chat Active</span>
                        </div>
                        <p className="text-xs text-orange-700">AI answering questions about kitchen</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3 shadow-lg animate-bounce">
                  <MessageSquare size={20} />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-full p-3 shadow-lg animate-pulse">
                  <TrendingUp size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Results Stats */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Real Results from Real Estate Agents
            </h3>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-blue-500" size={24} />
                </div>
                <div className="text-3xl font-bold text-blue-500 mb-2">300%</div>
                <div className="text-gray-600">More Leads</div>
              </div>
              <div>
                <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-green-500" size={24} />
                </div>
                <div className="text-3xl font-bold text-green-500 mb-2">24/7</div>
                <div className="text-gray-600">Availability</div>
              </div>
              <div>
                <div className="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-purple-500" size={24} />
                </div>
                <div className="text-3xl font-bold text-purple-500 mb-2">85%</div>
                <div className="text-gray-600">Response Rate</div>
              </div>
              <div>
                <div className="bg-orange-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-orange-500" size={24} />
                </div>
                <div className="text-3xl font-bold text-orange-500 mb-2">60%</div>
                <div className="text-gray-600">More Showings</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Listings?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of agents who've already turned their properties into lead-generating machines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = '/demo'}
                size="lg"
                variant="outline"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl"
              >
                See Live Demo
              </Button>
              <Button
                onClick={() => window.location.href = '/submit'}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Lead Machine
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
