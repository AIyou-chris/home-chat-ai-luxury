
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export const AgentInfo = () => {
  return (
    <>
      {/* Agent Photo */}
      <div className="relative">
        <div className="w-48 h-48 mx-auto md:w-full md:h-64 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 p-1">
          <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop" 
              alt="Michael Sterling" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Agent Info */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h3 className="text-2xl font-light mb-2 text-gray-800">Michael Sterling</h3>
          <p className="text-orange-600 font-medium mb-4">Luxury Real Estate Specialist</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="border-orange-400/30 text-orange-600 bg-orange-50">
              <Check size={12} className="mr-1" /> Top 1% Agent
            </Badge>
            <Badge variant="outline" className="border-blue-400/30 text-blue-600 bg-blue-50">
              <Check size={12} className="mr-1" /> 15+ Years Experience
            </Badge>
            <Badge variant="outline" className="border-green-400/30 text-green-600 bg-green-50">
              <Check size={12} className="mr-1" /> Beverly Hills Expert
            </Badge>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            Specializing in luxury properties in Beverly Hills and the greater Los Angeles area. 
            With over $500M in sales and a track record of exceptional client service, 
            I'm committed to making your real estate dreams a reality.
          </p>
        </div>
      </div>
    </>
  );
};
