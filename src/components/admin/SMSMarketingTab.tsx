
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, MessageSquare, Users, TrendingUp, Plus, FileText } from 'lucide-react';

export const SMSMarketingTab = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message: '',
    targetAudience: 'all'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCampaigns();
    fetchTemplates();
  }, []);

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('sms_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching campaigns:', error);
    } else {
      setCampaigns(data || []);
    }
  };

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('sms_templates')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching templates:', error);
    } else {
      setTemplates(data || []);
    }
  };

  const createCampaign = async () => {
    if (!newCampaign.name || !newCampaign.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in campaign name and message",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sms_campaigns')
        .insert({
          name: newCampaign.name,
          message_template: newCampaign.message,
          target_audience: { type: newCampaign.targetAudience },
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Campaign Created",
        description: "SMS campaign has been created successfully"
      });

      setNewCampaign({ name: '', message: '', targetAudience: 'all' });
      fetchCampaigns();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendTestSMS = async (message: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          to: '+15093004366', // Your phone number for testing
          message: `[TEST] ${message}`,
          recipientName: 'Test User'
        }
      });

      if (error) throw error;

      toast({
        title: "Test SMS Sent",
        description: "Check your phone for the test message"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const campaignStats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalSent: campaigns.reduce((sum, c) => sum + (c.total_recipients || 0), 0),
    totalResponses: campaigns.reduce((sum, c) => sum + (c.response_count || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold">{campaignStats.totalCampaigns}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-green-600">{campaignStats.activeCampaigns}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold">{campaignStats.totalSent}</p>
              </div>
              <Send className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Responses</p>
                <p className="text-2xl font-bold text-orange-600">{campaignStats.totalResponses}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>SMS Campaigns</CardTitle>
              <CardDescription>Manage your SMS marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No campaigns created yet</p>
                ) : (
                  campaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{campaign.message_template}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Recipients: {campaign.total_recipients || 0}</span>
                        <span>Responses: {campaign.response_count || 0}</span>
                        <span>Created: {new Date(campaign.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>SMS Templates</CardTitle>
              <CardDescription>Reusable message templates for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No templates created yet</p>
                ) : (
                  templates.map((template) => (
                    <div key={template.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{template.name}</h3>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.template_content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Used {template.usage_count || 0} times</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendTestSMS(template.template_content)}
                          disabled={loading}
                        >
                          Test Send
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>Set up a new SMS marketing campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Campaign Name</label>
                <Input
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="Enter campaign name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Target Audience</label>
                <Select
                  value={newCampaign.targetAudience}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, targetAudience: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="leads">Active Leads</SelectItem>
                    <SelectItem value="hot">Hot Prospects</SelectItem>
                    <SelectItem value="past_clients">Past Clients</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Message Content</label>
                <Textarea
                  value={newCampaign.message}
                  onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                  placeholder="Enter your SMS message (160 characters recommended)"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {newCampaign.message.length}/160
                </p>
              </div>

              <div className="flex space-x-2">
                <Button onClick={createCampaign} disabled={loading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => sendTestSMS(newCampaign.message)}
                  disabled={loading || !newCampaign.message}
                >
                  Send Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
