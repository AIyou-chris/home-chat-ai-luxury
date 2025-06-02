
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface PropertyMapProps {
  address: string;
  title: string;
}

export const PropertyMap = ({ address, title }: PropertyMapProps) => {
  const [mapError, setMapError] = useState(false);

  // Create Google Maps URL for the address
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO7nOGPy4Y0lPo&q=${encodedAddress}`;

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <section className="py-8 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-2">Property Location</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin size={16} />
          <span>{address}</span>
        </div>
      </div>

      <Card className="overflow-hidden shadow-lg">
        {!mapError ? (
          <div className="relative">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map location for ${title}`}
              onError={handleMapError}
              className="w-full"
            />
            <div className="absolute top-4 right-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={() => window.open(googleMapsUrl, '_blank')}
              >
                <ExternalLink size={16} className="mr-2" />
                Open in Maps
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-gray-50">
            <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Interactive Map</h3>
            <p className="text-gray-600 mb-4">{address}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.open(googleMapsUrl, '_blank')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Navigation size={16} className="mr-2" />
                View on Google Maps
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(`https://maps.apple.com/?q=${encodedAddress}`, '_blank')}
              >
                View on Apple Maps
              </Button>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
};
