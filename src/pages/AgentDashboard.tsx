import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { PropertyList } from '@/components/dashboard/PropertyList';
import { LeadsList } from '@/components/dashboard/LeadsList';
import { SubmissionsList } from '@/components/dashboard/SubmissionsList';
import { QRCodeAnalytics } from '@/components/dashboard/QRCodeAnalytics';
import { DataPrivacySection } from '@/components/dashboard/DataPrivacySection';
import { useToast } from '@/hooks/use-toast';

const AgentDashboard = () => {
  const [currentAgent, setCurrentAgent] = useState<any>(null);
  const { toast } = useToast();

  // Auto-create or get demo agent on component mount
  useEffect(() => {
    const setupDemoAgent = async () => {
      try {
        // Check if demo agent exists
        const { data: agent, error } = await supabase
          .from('agents')
          .select('*')
          .eq('email', 'demo@agent.com')
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        let agentData = agent;
        if (!agent) {
          // Create demo agent
          const { data: newAgent, error: createError } = await supabase
            .from('agents')
            .insert({
              email: 'demo@agent.com',
              name: 'Demo Agent',
              phone: '(555) 123-4567',
              status: 'active'
            })
            .select()
            .single();

          if (createError) throw createError;
          agentData = newAgent;
        }

        setCurrentAgent(agentData);
      } catch (error: any) {
        console.error('Demo agent setup error:', error);
        toast({
          title: "Error",
          description: "Failed to setup demo dashboard",
          variant: "destructive"
        });
      }
    };

    setupDemoAgent();
  }, [toast]);

  if (!currentAgent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Loading Dashboard...</h1>
            <p className="text-gray-600">Setting up demo environment</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Agent Dashboard</h1>
              <p className="text-gray-600">Welcome, {currentAgent?.name} (Demo Mode)</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <DashboardStats agentId={currentAgent?.id} />
        
        <Tabs defaultValue="properties" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="qr-analytics">QR Analytics</TabsTrigger>
            <TabsTrigger value="privacy">Data & Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties">
            <PropertyList agentId={currentAgent?.id} />
          </TabsContent>
          
          <TabsContent value="leads">
            <LeadsList agentId={currentAgent?.id} />
          </TabsContent>
          
          <TabsContent value="submissions">
            <SubmissionsList agentId={currentAgent?.id} />
          </TabsContent>

          <TabsContent value="qr-analytics">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">QR Code Analytics</h2>
                <QRCodeAnalytics />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy">
            <DataPrivacySection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDashboard;
