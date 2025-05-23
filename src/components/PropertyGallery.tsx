
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyGalleryProps {
  images: string[];
}

export const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-light mb-4">Property Gallery</h2>
        <p className="text-gray-400">Explore every detail of this exceptional home</p>
      </div>

      {/* Main Image */}
      <div className="relative group mb-6">
        <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-900">
          <img
            src={images[selectedImage]}
            alt={`Property view ${selectedImage + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </Button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
              selectedImage === index
                ? 'ring-2 ring-amber-400 scale-105'
                : 'hover:scale-105 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
};
