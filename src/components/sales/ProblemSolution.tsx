import { AlertCircle, CheckCircle, Clock, Users, TrendingDown, TrendingUp, DollarSign, Star, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProblemSolution = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The Real Estate Problem Every Agent Faces
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            You're losing qualified leads every day because traditional listings can't answer questions or capture interest when buyers are most engaged.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16">
          {/* Problem Side */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-red-100 rounded-full mb-4">
                <TrendingDown className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Traditional Listings Fail</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Missing After-Hours Leads</p>
                  <p className="text-gray-600">67% of property inquiries happen outside business hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Slow Response Times</p>
                  <p className="text-gray-600">Average agent response time is 6+ hours - buyers move on</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="text-red-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Limited Engagement</p>
                  <p className="text-gray-600">Static photos and descriptions can't answer specific questions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full mb-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">AI-Powered Solution</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">24/7 Instant Responses</p>
                  <p className="text-gray-600">AI answers buyer questions immediately, any time of day</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Automatic Lead Capture</p>
                  <p className="text-gray-600">Every conversation becomes a qualified lead with contact info</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Smart Appointment Booking</p>
                  <p className="text-gray-600">AI schedules viewings directly into your calendar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center mt-20 mb-16">
          <div className="pt-6 pb-4 px-4">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-500 relative overflow-visible max-w-lg mx-auto">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <Badge className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-2.5 font-semibold text-sm sm:text-lg whitespace-nowrap shadow-lg">
                  <Star className="mr-1.5" size={16} />
                  Everything Included
                </Badge>
              </div>
              
              <div className="pt-10 sm:pt-12 px-6 sm:px-8 pb-6 sm:pb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Complete AI Solution</h3>
                <p className="text-gray-600 mb-6">Turn your listing into a lead machine</p>
                
                <div className="mb-8">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">$59</span>
                  <span className="text-gray-500 text-lg ml-2">/month</span>
                </div>

                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-gray-700 text-sm">Real-time notifications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-gray-700 text-sm">CRM integration ready</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-gray-700 text-sm">Lead to close system</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-gray-700 text-sm">24/7 AI chat support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-gray-700 text-sm">Voice interaction</span>
                  </div>
                </div>

                <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-3 sm:px-4 py-2 mb-8">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-800 font-medium text-xs sm:text-sm">No setup fees • No upsells • Cancel anytime</span>
                </div>

                <Button
                  onClick={() => window.location.href = '/submit'}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  Start Your AI Listing
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 sm:p-8 text-white text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Real Results from Real Agents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">300%</div>
              <p className="text-orange-100">More qualified leads</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">24/7</div>
              <p className="text-orange-100">Lead capture availability</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">45%</div>
              <p className="text-orange-100">Faster closing times</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
