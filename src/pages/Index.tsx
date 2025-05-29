import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { PropertyGallery } from '@/components/PropertyGallery';
import { AIChat } from '@/components/AIChat';
import { PropertyDetails } from '@/components/PropertyDetails';
import { NeighborhoodInfo } from '@/components/NeighborhoodInfo';
import { AgentProfile } from '@/components/AgentProfile';
import { ContactSection } from '@/components/ContactSection';
import { BottomNavigation } from '@/components/BottomNavigation';
import { DemoCTA } from '@/components/DemoCTA';
import { useSampleProperty } from '@/hooks/useSampleProperty';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  // Initialize sample property data
  useSampleProperty();

  const propertyData = {
    id: 'sample-property-id', // This will be replaced with real ID from database
    title: 'Luxury Modern Estate',
    price: '$4,750,000',
    address: '1247 Beverly Hills Drive, Beverly Hills, CA 90210',
    beds: 5,
    baths: 6,
    sqft: '6,200',
    yearBuilt: 2021,
    lotSize: '0.75 acres',
    type: 'Single Family Home',
    description: 'Discover the epitome of modern luxury living in this architectural masterpiece. This stunning estate seamlessly blends contemporary design with timeless elegance, featuring soaring ceilings, floor-to-ceiling windows, and premium finishes throughout.',
    features: [
      'Gourmet chef\'s kitchen with Italian marble countertops',
      'Master suite with private terrace and spa-like bathroom',
      'Resort-style backyard with infinity pool and spa',
      'Home theater and wine cellar',
      'Smart home automation system',
      '3-car garage with Tesla charging station'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2940&auto=format&fit=crop'
    ]
  };

  const handleOpenLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
    setLightboxOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero 
              property={propertyData} 
              onChatOpen={() => setIsChatOpen(true)} 
            />
            <div className="relative z-10 pb-20">
              <PropertyGallery 
                images={propertyData.images} 
                onImageClick={handleOpenLightbox} 
              />
              <PropertyDetails property={propertyData} />
              <DemoCTA />
            </div>
          </>
        );
      case 'gallery':
        return (
          <div className="pt-4 pb-20">
            <PropertyGallery 
              images={propertyData.images} 
              onImageClick={handleOpenLightbox} 
            />
          </div>
        );
      case 'details':
        return (
          <div className="pt-4 pb-20">
            <NeighborhoodInfo />
            <AgentProfile />
          </div>
        );
      case 'contact':
        return (
          <div className="pt-4 pb-20">
            <ContactSection property={propertyData} />
          </div>
        );
      case 'agent':
        // This case handles navigation to agent dashboard
        window.location.href = '/agent-dashboard';
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      {renderContent()}
      
      <DemoCTA />
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onChatOpen={() => setIsChatOpen(true)}
      />

      <AIChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        property={propertyData}
      />

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox 
          imageUrl={lightboxImage} 
          onClose={() => setLightboxOpen(false)} 
        />
      )}
    </div>
  );
};

export default Index;

// Create a Lightbox component inline
const Lightbox = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative max-w-7xl max-h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/40 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img 
          src={imageUrl}
          alt="Enlarged property view" 
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};
