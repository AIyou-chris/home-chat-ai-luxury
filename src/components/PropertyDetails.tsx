
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
            <p className="text-gray-600 leading-relaxed text-lg">
              {property.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-amber-600">Premium Features</h3>
            <ul className="space-y-3">
              {property.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specifications */}
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

          {/* Price Breakdown */}
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-sm p-6">
            <h4 className="text-lg font-medium mb-4 text-amber-700">Investment Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">List Price</span>
                <span className="font-medium text-gray-800">{property.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per sq ft</span>
                <span className="font-medium text-gray-800">$766</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Est. Monthly Payment</span>
                <span className="font-medium text-gray-800">$22,847</span>
              </div>
            </div>
            <Badge className="mt-4 bg-amber-100 text-amber-700 border-amber-200">
              Financing Available
            </Badge>
          </Card>
        </div>
      </div>
    </section>
  );
};
