
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';

export const DemoSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our AI-powered property chat yourself. This is a real listing with full AI capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Preview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-orange-500 p-4 flex items-center justify-between">
                <h3 className="text-white font-semibold">Live Demo: $4.75M Beverly Hills Estate</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="p-6">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop"
                  alt="Luxury Property Demo"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <div className="space-y-3">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-400 text-sm font-medium">Visitor</span>
                      <span className="text-gray-400 text-xs">2:31 PM</span>
                    </div>
                    <p className="text-white">"What's the neighborhood like for families?"</p>
                  </div>
                  
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">AI Assistant</span>
                      <span className="text-orange-100 text-xs">2:31 PM</span>
                    </div>
                    <p className="text-white">"This Beverly Hills location is excellent for families! You're within walking distance of top-rated schools, family parks, and safe neighborhood streets. Would you like me to schedule a family-friendly tour?"</p>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-400 text-sm font-medium">Visitor</span>
                      <span className="text-gray-400 text-xs">2:32 PM</span>
                    </div>
                    <p className="text-white">"Yes, how about this Saturday morning?"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Try Our Full-Featured Demo
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                This isn't a fake demo - it's our actual AI system running on a real luxury property listing. 
                Chat with the AI, ask questions about the property, schedule appointments, and see how it captures your information.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Ask about property features, neighborhood, schools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Experience voice chat capabilities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">See automatic appointment scheduling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Watch lead capture in action</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.location.href = '/'}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="mr-2" size={20} />
                Try Live Demo
              </Button>
              
              <Button
                onClick={() => window.open('/', '_blank')}
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <ExternalLink className="mr-2" size={20} />
                Open in New Tab
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
