
import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { PropertyGallery } from '@/components/PropertyGallery';
import { AIChat } from '@/components/AIChat';
import { PropertyDetails } from '@/components/PropertyDetails';
import { NeighborhoodInfo } from '@/components/NeighborhoodInfo';
import { AgentProfile } from '@/components/AgentProfile';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2940&auto=format&fit=crop'
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero 
        property={propertyData} 
        onChatOpen={() => setIsChatOpen(true)} 
      />
      
      <div className="relative z-10">
        <PropertyGallery images={propertyData.images} />
        <PropertyDetails property={propertyData} />
        <NeighborhoodInfo />
        <AgentProfile />
        <ContactSection property={propertyData} />
      </div>

      <AIChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        property={propertyData}
      />
    </div>
  );
};

export default Index;
