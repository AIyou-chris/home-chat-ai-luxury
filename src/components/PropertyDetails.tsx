
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare, Mic } from 'lucide-react';

interface PropertyDetailsProps {
  property: any;
  onOpenVoiceChat?: () => void;
}

export const PropertyDetails = ({ property, onOpenVoiceChat }: PropertyDetailsProps) => {
  const specs = [
    { label: 'Bedrooms', value: property.beds },
    { label: 'Bathrooms', value: property.baths },
    { label: 'Square Feet', value: property.sqft },
    { label: 'Year Built', value: property.yearBuilt },
    { label: 'Lot Size', value: property.lotSize },
    { label: 'Property Type', value: property.type }
  ];

  return (
    <section className="py-8 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header with Talk to Button */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-2 break-words">{property.title}</h1>
          <p className="text-lg md:text-xl text-gray-600 break-words">{property.address}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mt-2">{property.price}</p>
        </div>
        {onOpenVoiceChat && (
          <Button
            onClick={onOpenVoiceChat}
            className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-4 md:px-6 py-3 text-sm md:text-lg w-full sm:w-auto justify-center transition-all duration-300 hover:scale-105"
          >
            <Mic size={20} className="flex-shrink-0" />
            <span>Talk to This Home</span>
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
        {/* Description */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-4 text-gray-800">About This Home</h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg text-left break-words">
              {property.description}
            </p>
          </div>

          {/* Voice Chat CTA */}
          {onOpenVoiceChat && (
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-800 mb-1">Talk to This Home</h4>
                  <p className="text-sm text-orange-600">Ask questions about features, neighborhood, and more</p>
                </div>
                <Button
                  onClick={onOpenVoiceChat}
                  className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-4 py-2 w-full sm:w-auto justify-center"
                >
                  <Mic size={16} className="flex-shrink-0" />
                  <span>Start Voice Chat</span>
                </Button>
              </div>
            </div>
          )}

          {/* Features */}
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-4 text-blue-600 text-left">Premium Features</h3>
            <ul className="space-y-3">
              {property.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start space-x-3 text-left">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600 text-left text-sm md:text-base break-words">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specifications & Agent Contact */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-light text-gray-800">Property Specifications</h3>
          
          <Card className="bg-gray-50 border-gray-200 shadow-sm p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {specs.map((spec, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs md:text-sm text-gray-500">{spec.label}</p>
                  <p className="text-base md:text-lg font-medium text-gray-800 break-words">{spec.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Agent Contact Card */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop" 
                    alt="Michael Sterling" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-semibold">Michael Sterling</h4>
                <p className="text-blue-100">Luxury Real Estate Specialist</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-blue-100">
                <Phone size={16} className="flex-shrink-0" />
                <span className="text-sm break-all">(310) 555-0123</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-blue-100">
                <Mail size={16} className="flex-shrink-0" />
                <span className="text-sm break-all">michael.sterling@luxuryrealty.com</span>
              </div>
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none transition-all duration-300 hover:scale-105">
              <MessageSquare className="mr-2" size={16} />
              Inquire about this home
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
