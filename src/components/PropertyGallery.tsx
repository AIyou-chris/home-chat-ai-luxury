
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyGalleryProps {
  images: string[];
}

export const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = Math.abs(touchStart.y - touchEnd.y);

    // Only swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > 50 && deltaY < 100) {
      if (deltaX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    setTouchStart(null);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-light mb-2">Property Gallery</h2>
        <p className="text-gray-400 text-sm">Swipe to explore • Tap to zoom</p>
      </div>

      {/* Main Image */}
      <div className="relative group mb-4">
        <div 
          className="aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-900 cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={toggleZoom}
        >
          <img
            ref={imageRef}
            src={images[selectedImage]}
            alt={`Property view ${selectedImage + 1}`}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
            }`}
          />
        </div>
        
        {/* Navigation Arrows - Desktop */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevImage}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextImage}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </Button>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleZoom}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md rounded-full"
          >
            {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          </Button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1">
          <span className="text-sm text-white">
            {selectedImage + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(index);
              setIsZoomed(false);
            }}
            className={`aspect-square rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 ${
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
