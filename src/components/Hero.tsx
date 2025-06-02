
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, MapPin, Calendar } from 'lucide-react';
import { AppointmentModal } from './appointment/AppointmentModal';
import { ShareButton } from '@/components/ShareButton';
import { LiveUpdatesTag } from '@/components/LiveUpdatesTag';

interface HeroProps {
  property: any;
  onChatOpen?: () => void;
}

export const Hero = ({ property, onChatOpen }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

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
      <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-8">
        {/* Top Section with Logo - Fixed for mobile */}
        <div className="flex justify-between items-start pt-safe">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img 
              src="/lovable-uploads/048050fe-4c91-45f2-b375-e5ec05e397c5.png" 
              alt="Home Listing AI" 
              className="h-8 md:h-12 lg:h-16 w-auto"
            />
            <Badge variant="secondary" className="bg-white/80 text-gray-800 border-gray-300 backdrop-blur-md text-xs md:text-sm">
              New Listing
            </Badge>
          </div>
          <div className="flex space-x-1 md:space-x-2">
            {property.images.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 md:space-y-6 pb-safe">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-light leading-tight text-white">
              {property.title}
            </h1>
            
            <LiveUpdatesTag lastUpdated={property.lastUpdated} />
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-white/90">
                <MapPin size={16} />
                <span className="text-sm md:text-base">{property.address}</span>
              </div>
            </div>
            
            <div className="text-2xl md:text-3xl lg:text-4xl font-light text-orange-400">
              {property.price}
            </div>

            <div className="flex space-x-4 md:space-x-6 text-sm md:text-base text-white">
              <span>{property.beds} beds</span>
              <span>{property.baths} baths</span>
              <span>{property.sqft} sq ft</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {onChatOpen && (
              <Button
                onClick={onChatOpen}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <MessageSquare className="mr-2" size={20} />
                Talk with this Home
              </Button>
            )}
            
            <Button
              onClick={() => setIsAppointmentOpen(true)}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 font-medium px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Calendar className="mr-2" size={20} />
              Schedule Showing
            </Button>

            <ShareButton property={property} />
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        property={property}
      />
    </div>
  );
};
