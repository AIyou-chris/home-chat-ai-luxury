import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/Hero';
import { PropertyDetails } from '@/components/PropertyDetails';
import { PropertyGallery } from '@/components/PropertyGallery';
import { PropertyKnowledgeBase } from '@/components/PropertyKnowledgeBase';
import { NeighborhoodInfo } from '@/components/NeighborhoodInfo';
import { ContactSection } from '@/components/ContactSection';
import { FloatingChatWidget } from '@/components/FloatingChatWidget';
import { BottomNavigation } from '@/components/BottomNavigation';
import { DemoCTA } from '@/components/DemoCTA';
import { AgentProfile } from '@/components/AgentProfile';
import { PropertyMap } from '@/components/PropertyMap';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { ShareButton } from '@/components/ShareButton';
import { LiveUpdatesTag } from '@/components/LiveUpdatesTag';

const Index = () => {
  const [activeTab, setActiveTab] = useState('details');

  // Sample property data with fixed images
  const sampleProperty = {
    id: '1',
    title: 'Luxury Modern Estate',
    address: '1247 Beverly Hills Drive, Beverly Hills, CA 90210',
    price: '$4,750,000',
    beds: '6',
    baths: '7',
    sqft: '8,500',
    yearBuilt: '2021',
    lotSize: '0.5 acres',
    type: 'Single Family Home',
    lastUpdated: '2024-06-01',
    description: 'This stunning modern estate represents the pinnacle of luxury living in Beverly Hills. Featuring floor-to-ceiling windows, an open-concept design, and premium finishes throughout, this home offers breathtaking city and canyon views. The gourmet kitchen boasts top-of-the-line appliances and a spacious island perfect for entertaining.',
    features: [
      'Gourmet chef\'s kitchen with premium appliances',
      'Infinity pool with city views',
      'Smart home automation system',
      'Home theater with Dolby Atmos sound',
      'Wine cellar with temperature control',
      'Three-car garage with EV charging',
      'Private gym and spa facilities',
      'Rooftop terrace with outdoor kitchen'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop'
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <PropertyDetails property={sampleProperty} />;
      case 'gallery':
        return <PropertyGallery images={sampleProperty.images} />;
      case 'knowledge':
        return <PropertyKnowledgeBase propertyId={sampleProperty.id} isAgent={false} />;
      case 'neighborhood':
        return <NeighborhoodInfo />;
      case 'agent':
        return <AgentProfile />;
      case 'contact':
        return <ContactSection property={sampleProperty} />;
      default:
        return <PropertyDetails property={sampleProperty} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Luxury Modern Estate - Beverly Hills | $4.75M</title>
        <meta name="description" content="Stunning 6BR/7BA modern estate in prime Beverly Hills. Features include chef's kitchen, infinity pool, smart home technology, and panoramic city views." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 pb-32">
        <Hero property={sampleProperty} />
        
        {/* Property Metadata */}
        <div className="container mx-auto px-4 py-4 border-b border-gray-200 bg-white">
          <div className="text-center">
            <LiveUpdatesTag lastUpdated={sampleProperty.lastUpdated} className="mb-3" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{sampleProperty.title}</h1>
            <p className="text-gray-600 mb-1">{sampleProperty.address}</p>
            <p className="text-sm text-gray-500">Last updated: June 1, 2024</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {renderTabContent()}
        </div>
        
        <PropertyMap address={sampleProperty.address} title={sampleProperty.title} />
        <QRCodeGenerator property={sampleProperty} />
        
        {/* Share Button - moved to bottom */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <ShareButton property={sampleProperty} />
          </div>
        </div>
        
        <DemoCTA />
        <FloatingChatWidget property={sampleProperty} />
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
};

export default Index;
