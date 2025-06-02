
import { useState } from 'react';
import { AdminStats } from '@/components/admin/AdminStats';
import { AllAgentsOverview } from '@/components/admin/AllAgentsOverview';
import { SystemAnalytics } from '@/components/admin/SystemAnalytics';
import { RevenueTracking } from '@/components/admin/RevenueTracking';
import { SMSMarketingTab } from '@/components/admin/SMSMarketingTab';
import { CostEstimator } from '@/components/CostEstimator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Users, TrendingUp, MessageSquare, DollarSign, Settings, Calculator } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/fb2afea8-edfe-40f9-b8ce-9728d6cd7f40.png" 
                alt="Home Listing AI" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Sales & Marketing Overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="text-gray-400" size={20} />
              <span className="text-gray-600 font-medium">Super Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 size={16} />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center space-x-2">
                <Users size={16} />
                <span>All Agents</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <TrendingUp size={16} />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="revenue" className="flex items-center space-x-2">
                <DollarSign size={16} />
                <span>Revenue</span>
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center space-x-2">
                <MessageSquare size={16} />
                <span>SMS Marketing</span>
              </TabsTrigger>
              <TabsTrigger value="costs" className="flex items-center space-x-2">
                <Calculator size={16} />
                <span>Cost Analysis</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <AdminStats />
            </TabsContent>

            <TabsContent value="agents">
              <AllAgentsOverview />
            </TabsContent>

            <TabsContent value="analytics">
              <SystemAnalytics />
            </TabsContent>

            <TabsContent value="revenue">
              <RevenueTracking />
            </TabsContent>

            <TabsContent value="sms">
              <SMSMarketingTab />
            </TabsContent>

            <TabsContent value="costs">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Operational Cost Analysis</CardTitle>
                    <CardDescription>
                      Track AI usage costs, infrastructure expenses, and per-listing profitability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CostEstimator />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
