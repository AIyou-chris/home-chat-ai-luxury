
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, MessageSquare, Clock, TrendingUp, ArrowRight } from 'lucide-react';

export const MobileSalesSection = () => {
  return (
    <div className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4 inline-block">
                <Smartphone className="mr-1" size={14} />
                Mobile-First Solution
              </Badge>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Everything is now on your phone.
                <span className="text-blue-600 block">
                  You've got a sales agent right in your pocket.
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your AI sales agent works 24/7 from any device. Capture leads, schedule appointments, 
                and close deals whether you're at the office, showing properties, or relaxing at home.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Instant Response Anywhere</h3>
                    <p className="text-gray-600">Get SMS notifications the moment someone interacts with your listing. Respond instantly or let AI handle it.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Never Miss a Lead</h3>
                    <p className="text-gray-600">Your pocket sales agent captures leads 24/7, even when you're sleeping or showing other properties.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 rounded-full p-2 flex-shrink-0">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manage Multiple Listings</h3>
                    <p className="text-gray-600">Handle unlimited properties from one mobile dashboard. Scale your business without scaling your workload.</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => window.location.href = '/submit'}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Your Pocket Sales Agent
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>

            {/* Right Visual */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative max-w-sm mx-auto">
                {/* Phone mockup */}
                <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    {/* Phone screen content */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white text-center">
                      <h4 className="font-semibold">Home Listing AI</h4>
                      <p className="text-sm text-orange-100">3 active listings</p>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      {/* Notification cards */}
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

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3 shadow-lg animate-bounce">
                  <MessageSquare size={20} />
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-full p-3 shadow-lg animate-pulse">
                  <TrendingUp size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
