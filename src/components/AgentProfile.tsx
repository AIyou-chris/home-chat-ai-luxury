
import { Card } from '@/components/ui/card';
import { AgentInfo } from './agent/AgentInfo';
import { AgentStats } from './agent/AgentStats';
import { AgentContact } from './agent/AgentContact';
import { AgentActions } from './agent/AgentActions';

export const AgentProfile = () => {
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
      </Card>
    </section>
  );
};
