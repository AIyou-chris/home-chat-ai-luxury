
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const AgentProfile = () => {
  return (
    <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-light mb-8 text-center">Your Luxury Real Estate Expert</h2>
      
      <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 p-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Agent Photo */}
          <div className="relative">
            <div className="w-48 h-48 mx-auto md:w-full md:h-64 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-1">
              <div className="w-full h-full rounded-2xl bg-gray-800 flex items-center justify-center">
                <div className="text-6xl">👨‍💼</div>
              </div>
            </div>
          </div>

          {/* Agent Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-light mb-2">Michael Sterling</h3>
              <p className="text-amber-400 font-medium mb-4">Luxury Real Estate Specialist</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="border-amber-400/30 text-amber-400">
                  Top 1% Agent
                </Badge>
                <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                  15+ Years Experience
                </Badge>
                <Badge variant="outline" className="border-green-400/30 text-green-400">
                  Beverly Hills Expert
                </Badge>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                Specializing in luxury properties in Beverly Hills and the greater Los Angeles area. 
                With over $500M in sales and a track record of exceptional client service, 
                I'm committed to making your real estate dreams a reality.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">$500M+</div>
                <p className="text-sm text-gray-400">Sales Volume</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">150+</div>
                <p className="text-sm text-gray-400">Homes Sold</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">4.9★</div>
                <p className="text-sm text-gray-400">Client Rating</p>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-amber-400 hover:bg-amber-500 text-black font-medium">
                Schedule Private Tour
              </Button>
              <Button variant="outline" className="border-gray-600 hover:bg-gray-800">
                Call (310) 555-0123
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
