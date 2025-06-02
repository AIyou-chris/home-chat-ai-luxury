
import { Card } from '@/components/ui/card';
import { AgentInfo } from './agent/AgentInfo';
import { AgentStats } from './agent/AgentStats';
import { AgentContact } from './agent/AgentContact';
import { AgentActions } from './agent/AgentActions';
import { ShareButton } from './ShareButton';

export const AgentProfile = () => {
  // Sample property data for sharing
  const propertyData = {
    title: 'Luxury Modern Estate',
    address: '1247 Beverly Hills Drive, Beverly Hills, CA 90210',
    price: '$4,750,000'
  };

  return (
    <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-light mb-8 text-center text-gray-800">Your Luxury Real Estate Expert</h2>
      
      <Card className="bg-white shadow-lg border-gray-200 p-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <AgentInfo />
          
          <div className="md:col-span-2 space-y-6">
            <AgentStats />
            <AgentContact />
            <AgentActions />
          </div>
        </div>
        
        {/* Share Property Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center">
            <ShareButton property={propertyData} />
          </div>
        </div>
      </Card>
    </section>
  );
};
