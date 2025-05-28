
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Home, Users, FileText, Calendar } from 'lucide-react';

interface DashboardStatsProps {
  agentId: string;
}

export const DashboardStats = ({ agentId }: DashboardStatsProps) => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats', agentId],
    queryFn: async () => {
      // Get properties count
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('agent_id', agentId);

      // Get property IDs for the agent first
      const { data: agentProperties } = await supabase
        .from('properties')
        .select('id')
        .eq('agent_id', agentId);

      const propertyIds = agentProperties?.map(p => p.id) || [];

      // Get leads count
      const { count: leadsCount } = await supabase
        .from('leads')
        .select('property_id', { count: 'exact', head: true })
        .in('property_id', propertyIds);

      // Get submissions count
      const { count: submissionsCount } = await supabase
        .from('realtor_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('agent_id', agentId);

      // Get appointments count
      const { count: appointmentsCount } = await supabase
        .from('appointments')
        .select('property_id', { count: 'exact', head: true })
        .in('property_id', propertyIds);

      return {
        properties: propertiesCount || 0,
        leads: leadsCount || 0,
        submissions: submissionsCount || 0,
        appointments: appointmentsCount || 0
      };
    },
    enabled: !!agentId
  });

  const statCards = [
    {
      title: 'Active Properties',
      value: stats?.properties || 0,
      icon: Home,
      color: 'text-blue-600'
    },
    {
      title: 'Total Leads',
      value: stats?.leads || 0,
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Submissions',
      value: stats?.submissions || 0,
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Appointments',
      value: stats?.appointments || 0,
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
