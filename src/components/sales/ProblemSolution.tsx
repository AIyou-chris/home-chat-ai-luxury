
import { AlertCircle, CheckCircle, Clock, Users, TrendingDown, TrendingUp } from 'lucide-react';

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

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
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

        {/* Results Banner */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 sm:p-8 text-white text-center">
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
