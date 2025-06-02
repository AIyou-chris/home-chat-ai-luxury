
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '@/components/Hero';
import { PropertyDetails } from '@/components/PropertyDetails';
import { PropertyGallery } from '@/components/PropertyGallery';
import { NeighborhoodInfo } from '@/components/NeighborhoodInfo';
import { ContactSection } from '@/components/ContactSection';
import { PropertyChatBot } from '@/components/PropertyChatBot';
import { BottomNavigation } from '@/components/BottomNavigation';
import { DemoCTA } from '@/components/DemoCTA';
import { AgentProfile } from '@/components/AgentProfile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <PropertyDetails />;
      case 'gallery':
        return <PropertyGallery />;
      case 'neighborhood':
        return <NeighborhoodInfo />;
      case 'agent':
        return <AgentProfile />;
      case 'contact':
        return <ContactSection />;
      default:
        return <PropertyDetails />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Luxury Modern Estate - Beverly Hills | $4.75M</title>
        <meta name="description" content="Stunning 6BR/7BA modern estate in prime Beverly Hills. Features include chef's kitchen, infinity pool, smart home technology, and panoramic city views." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Hero />
        
        <div className="container mx-auto px-4 py-8">
          {renderTabContent()}
        </div>
        
        <DemoCTA />
        <PropertyChatBot />
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
};

export default Index;
