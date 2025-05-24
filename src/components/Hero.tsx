
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, MapPin } from 'lucide-react';

interface HeroProps {
  property: any;
  onChatOpen: () => void;
}

export const Hero = ({ property, onChatOpen }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [property.images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {property.images.map((image: string, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`${property.title} - View ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
        {/* Top Section with Logo */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/048050fe-4c91-45f2-b375-e5ec05e397c5.png" 
              alt="Home Listing AI" 
              className="h-12 md:h-16 w-auto"
            />
            <Badge variant="secondary" className="bg-white/80 text-gray-800 border-gray-300 backdrop-blur-md">
              New Listing
            </Badge>
          </div>
          <div className="flex space-x-2">
            {property.images.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white/90">
              <MapPin size={16} />
              <span className="text-sm">{property.address}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-light leading-tight text-white">
              {property.title}
            </h1>
            
            <div className="text-3xl md:text-4xl font-light text-orange-400">
              {property.price}
            </div>

            <div className="flex space-x-6 text-sm text-white">
              <span>{property.beds} beds</span>
              <span>{property.baths} baths</span>
              <span>{property.sqft} sq ft</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onChatOpen}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="mr-2" size={20} />
            Talk with this Home
          </Button>
        </div>
      </div>
    </div>
  );
};
