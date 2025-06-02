
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, MessageSquare, DollarSign } from 'lucide-react';

export const AllAgentsOverview = () => {
  const agents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@luxuryrealty.com',
      plan: 'Professional',
      status: 'active',
      revenue: '$69',
      leads: 45,
      conversations: 234,
      joinDate: '2024-01-15',
      smsEnabled: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@realestate.com',
      plan: 'Starter',
      status: 'active',
      revenue: '$49',
      leads: 23,
      conversations: 156,
      joinDate: '2024-02-03',
      smsEnabled: false
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      email: 'lisa.r@homesellers.net',
      plan: 'Professional',
      status: 'active',
      revenue: '$69',
      leads: 67,
      conversations: 389,
      joinDate: '2024-01-08',
      smsEnabled: true
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@properties.com',
      plan: 'Enterprise',
      status: 'active',
      revenue: '$299',
      leads: 123,
      conversations: 567,
      joinDate: '2023-12-20',
      smsEnabled: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-green-600">+12.5% this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pro Plan Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,649</div>
            <p className="text-xs text-blue-600">58% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">SMS Enabled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,423</div>
            <p className="text-xs text-orange-600">86% of Pro users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Revenue/Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$63.45</div>
            <p className="text-xs text-green-600">+8.2% vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
          <CardDescription>Manage and monitor all agent accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Agent</th>
                  <th className="text-left py-3 px-2">Plan</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Revenue</th>
                  <th className="text-left py-3 px-2">Leads</th>
                  <th className="text-left py-3 px-2">Conversations</th>
                  <th className="text-left py-3 px-2">SMS</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div>
                        <div className="font-medium text-gray-900">{agent.name}</div>
                        <div className="text-gray-500 text-xs">{agent.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant={agent.plan === 'Professional' ? 'default' : agent.plan === 'Enterprise' ? 'secondary' : 'outline'}>
                        {agent.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 font-medium">{agent.revenue}</td>
                    <td className="py-3 px-2">{agent.leads}</td>
                    <td className="py-3 px-2">{agent.conversations}</td>
                    <td className="py-3 px-2">
                      <Badge variant={agent.smsEnabled ? 'default' : 'outline'} className="text-xs">
                        {agent.smsEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Mail size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare size={14} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
