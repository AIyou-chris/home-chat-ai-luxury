
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare } from 'lucide-react';

interface PropertyDetailsProps {
  property: any;
}

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const specs = [
    { label: 'Bedrooms', value: property.beds },
    { label: 'Bathrooms', value: property.baths },
    { label: 'Square Feet', value: property.sqft },
    { label: 'Year Built', value: property.yearBuilt },
    { label: 'Lot Size', value: property.lotSize },
    { label: 'Property Type', value: property.type }
  ];

  return (
    <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Description */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-800">About This Home</h2>
            <p className="text-gray-600 leading-relaxed text-lg text-left">
              {property.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-blue-600 text-left">Premium Features</h3>
            <ul className="space-y-3">
              {property.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start space-x-3 text-left">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600 text-left">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specifications & Agent Contact */}
        <div className="space-y-6">
          <h3 className="text-2xl font-light text-gray-800">Property Specifications</h3>
          
          <Card className="bg-gray-50 border-gray-200 shadow-sm p-6">
            <div className="grid grid-cols-2 gap-6">
              {specs.map((spec, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm text-gray-500">{spec.label}</p>
                  <p className="text-lg font-medium text-gray-800">{spec.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Agent Contact Card */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop" 
                    alt="Michael Sterling" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Michael Sterling</h4>
                <p className="text-blue-100">Luxury Real Estate Specialist</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-blue-100">
                <Phone size={16} />
                <span className="text-sm">(310) 555-0123</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Mail size={16} />
                <span className="text-sm">michael.sterling@luxuryrealty.com</span>
              </div>
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none">
              <MessageSquare className="mr-2" size={16} />
              Inquire about this home
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
