
import React, { useState } from 'react';
import { PropertyDetails } from '@/components/PropertyDetails';
import { PropertyGallery } from '@/components/PropertyGallery';
import { PropertyKnowledgeBase } from '@/components/PropertyKnowledgeBase';
import { NeighborhoodInfo } from '@/components/NeighborhoodInfo';
import { AgentProfile } from '@/components/AgentProfile';
import { ContactSection } from '@/components/ContactSection';
import { BottomNavigation } from '@/components/BottomNavigation';
import { FloatingChatWidget } from '@/components/FloatingChatWidget';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { DemoCTA } from '@/components/DemoCTA';
import { Hero } from '@/components/Hero';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);
  
  // Sample property data since useSampleProperty is not working properly
  const property = {
    id: '1',
    title: 'Luxury Modern Estate',
    address: '1247 Beverly Hills Drive, Beverly Hills, CA 90210',
    price: '$4,750,000',
    beds: 5,
    baths: 6,
    sqft: '6,200',
    yearBuilt: '2018',
    lotSize: '0.8 acres',
    type: 'Single Family',
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
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop'
    ],
    neighborhood_data: {
      schools: ['Beverly Hills High School (9/10)', 'Hawthorne Elementary (10/10)'],
      nearby: ['Rodeo Drive (2 miles)', 'Beverly Hills Hotel (1.5 miles)', 'Century City Mall (3 miles)'],
      walkScore: 85,
      demographics: 'Affluent residential area with median income $150k+'
    },
    agent: {
      name: 'Michael Sterling',
      email: 'michael.sterling@luxuryrealty.com',
      phone: '(310) 555-0123'
    },
    lastUpdated: new Date().toISOString()
  };

  const handleOpenVoiceChat = () => {
    console.log('Opening voice chat...');
    setIsVoiceChatOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6 pb-20">
            <Hero 
              property={property} 
              onChatOpen={handleOpenVoiceChat}
            />
            <PropertyDetails 
              property={property} 
              onOpenVoiceChat={handleOpenVoiceChat}
            />
            
            <QRCodeGenerator property={{
              title: property.title,
              address: property.address
            }} />
            <DemoCTA />
          </div>
        );
      case 'gallery':
        return (
          <div className="pb-20">
            <PropertyGallery images={property.images} />
          </div>
        );
      case 'knowledge':
        return (
          <div className="pb-20">
            <PropertyKnowledgeBase propertyId={property.id} />
          </div>
        );
      case 'neighborhood':
        return (
          <div className="pb-20">
            <NeighborhoodInfo />
          </div>
        );
      case 'agent':
        return (
          <div className="pb-20">
            <AgentProfile />
          </div>
        );
      case 'contact':
        return (
          <div className="pb-20">
            <ContactSection property={property} />
          </div>
        );
      default:
        return (
          <div className="pb-20">
            <Hero 
              property={property} 
              onChatOpen={handleOpenVoiceChat}
            />
            <PropertyDetails 
              property={property} 
              onOpenVoiceChat={handleOpenVoiceChat}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        {renderContent()}
      </div>
      
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <FloatingChatWidget 
        property={property} 
        isOpen={isVoiceChatOpen}
        onClose={() => setIsVoiceChatOpen(false)}
      />
    </div>
  );
};

export default Demo;
