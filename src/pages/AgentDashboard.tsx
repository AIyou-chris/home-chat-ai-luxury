
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { PropertyList } from '@/components/dashboard/PropertyList';
import { LeadsList } from '@/components/dashboard/LeadsList';
import { SubmissionsList } from '@/components/dashboard/SubmissionsList';
import { useToast } from '@/hooks/use-toast';

const AgentDashboard = () => {
  const [agentEmail, setAgentEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<any>(null);
  const { toast } = useToast();

  const handleAgentLogin = async () => {
    if (!agentEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if agent exists or create one
      const { data: agent, error } = await supabase
        .from('agents')
        .select('*')
        .eq('email', agentEmail)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      let agentData = agent;
      if (!agent) {
        // Create new agent
        const { data: newAgent, error: createError } = await supabase
          .from('agents')
          .insert({
            email: agentEmail,
            name: agentEmail.split('@')[0],
            status: 'active'
          })
          .select()
          .single();

        if (createError) throw createError;
        agentData = newAgent;
      }

      setCurrentAgent(agentData);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Welcome to your dashboard!",
      });
    } catch (error: any) {
      console.error('Agent login error:', error);
      toast({
        title: "Error",
        description: "Failed to access dashboard",
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Agent Dashboard</h1>
              <p className="text-gray-600">Enter your email to access your dashboard</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={agentEmail}
                onChange={(e) => setAgentEmail(e.target.value)}
                placeholder="agent@example.com"
                onKeyPress={(e) => e.key === 'Enter' && handleAgentLogin()}
              />
            </div>
            <Button onClick={handleAgentLogin} className="w-full">
              Access Dashboard
            </Button>
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
              <p className="text-gray-600">Welcome back, {currentAgent?.name}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAuthenticated(false);
                setCurrentAgent(null);
                setAgentEmail('');
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <DashboardStats agentId={currentAgent?.id} />
        
        <Tabs defaultValue="properties" className="mt-6">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDashboard;
