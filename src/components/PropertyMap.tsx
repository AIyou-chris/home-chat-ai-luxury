
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

interface PropertyMapProps {
  address: string;
  title: string;
}

export const PropertyMap = ({ address, title }: PropertyMapProps) => {
  // Create Google Maps URL for the address
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <section className="py-8 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-2">Property Location</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin size={16} />
          <span>{address}</span>
        </div>
      </div>

      <Card className="p-6 bg-gray-50">
        <div className="text-center">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">View Location</h3>
          <p className="text-gray-600 mb-4">{address}</p>
          <Button
            onClick={() => window.open(googleMapsUrl, '_blank')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Navigation size={16} className="mr-2" />
            Open in Maps
          </Button>
        </div>
      </Card>
    </section>
  );
};
