
import React, { useState } from 'react';
import { PropertyDetails } from '@/components/PropertyDetails';
import { PropertyGallery } from '@/components/PropertyGallery';
import { PropertyKnowledgeBase } from '@/components/PropertyKnowledgeBase';
import { NeighborhoodInfo } from '@/components/NeighborhoodInfo';
import { AgentProfile } from '@/components/AgentProfile';
import { ContactSection } from '@/components/ContactSection';
import { BottomNavigation } from '@/components/BottomNavigation';
import { FloatingChatWidget } from '@/components/FloatingChatWidget';
import { ShareButton } from '@/components/ShareButton';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { DemoCTA } from '@/components/DemoCTA';
import { useSampleProperty } from '@/hooks/useSampleProperty';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('details');
  const property = useSampleProperty();

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Demo...</h2>
          <p className="text-gray-600">Preparing your AI-powered property listing</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6 pb-20">
            <PropertyDetails property={property} />
            
            {/* Share Button - moved above QR Code */}
            <div className="px-6 md:px-8 max-w-7xl mx-auto">
              <div className="flex justify-center">
                <ShareButton property={property} />
              </div>
            </div>
            
            <QRCodeGenerator property={property} />
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
            <PropertyKnowledgeBase property={property} />
          </div>
        );
      case 'neighborhood':
        return (
          <div className="pb-20">
            <NeighborhoodInfo neighborhood={property.neighborhood_data} />
          </div>
        );
      case 'agent':
        return (
          <div className="pb-20">
            <AgentProfile agent={property.agent} />
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
            <PropertyDetails property={property} />
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
      <FloatingChatWidget property={property} />
    </div>
  );
};

export default Demo;
