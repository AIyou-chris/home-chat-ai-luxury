
import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { PropertyGallery } from '@/components/PropertyGallery';
import { AIChat } from '@/components/AIChat';
import { PropertyDetails } from '@/components/PropertyDetails';
import { NeighborhoodInfo } from '@/components/NeighborhoodInfo';
import { AgentProfile } from '@/components/AgentProfile';
import { ContactSection } from '@/components/ContactSection';
import { BottomNavigation } from '@/components/BottomNavigation';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const propertyData = {
    id: '1',
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
              <PropertyGallery images={propertyData.images} />
              <PropertyDetails property={propertyData} />
            </div>
          </>
        );
      case 'gallery':
        return (
          <div className="pt-4 pb-20">
            <PropertyGallery images={propertyData.images} />
          </div>
        );
      case 'info':
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {renderContent()}
      
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
    </div>
  );
};

export default Index;
