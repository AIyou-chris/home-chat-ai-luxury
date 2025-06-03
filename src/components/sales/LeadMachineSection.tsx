
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingUp, Clock, Users, MessageSquare, Calendar } from 'lucide-react';

export const LeadMachineSection = () => {
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
              <span className="text-orange-500 block">Lead Machine</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stop letting potential buyers slip away. Our AI transforms every property visit 
              into a lead capture opportunity with intelligent conversations and instant follow-ups.
            </p>
          </div>

          {/* Before vs After Comparison */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Before - Traditional */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 p-4 text-center">
                <h3 className="font-bold text-lg text-gray-700">Traditional Listing</h3>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-600">Visitors browse and leave</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-600">No way to capture interest</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-600">Questions go unanswered</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-600">Appointments missed after hours</span>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">~5%</div>
                  <div className="text-gray-600">Visitor to Lead Conversion</div>
                </div>
              </div>
            </div>

            {/* After - AI Powered */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-500 overflow-hidden relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white px-4 py-1">
                  <Zap className="mr-1" size={14} />
                  AI Powered
                </Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-center">
                <h3 className="font-bold text-lg text-white">AI Lead Machine</h3>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">AI engages every visitor</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Instant lead capture forms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">24/7 intelligent responses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Automatic appointment booking</span>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">~40%</div>
                  <div className="text-gray-600">Visitor to Lead Conversion</div>
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
