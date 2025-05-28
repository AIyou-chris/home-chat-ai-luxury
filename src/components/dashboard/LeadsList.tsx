
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface LeadsListProps {
  agentId: string;
}

export const LeadsList = ({ agentId }: LeadsListProps) => {
  const { data: leads, isLoading } = useQuery({
    queryKey: ['agent-leads', agentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          properties (title, address, price)
        `)
        .in('property_id', 
          supabase
            .from('properties')
            .select('id')
            .eq('agent_id', agentId)
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!agentId
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading leads...</div>;
  }

  if (!leads?.length) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">No Leads Yet</h3>
        <p className="text-gray-600">Leads will appear here when visitors interact with your properties</p>
      </Card>
    );
  }

  const getInterestLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <Card key={lead.id} className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="h-4 w-4" />
                <span className="font-semibold">
                  {lead.contact_info?.name || `Lead #${lead.id.slice(0, 8)}`}
                </span>
                <Badge className={getInterestLevelColor(lead.interest_level || 'low')}>
                  {lead.interest_level || 'Low'} Interest
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                Property: {lead.properties?.title || 'Unknown Property'}
              </p>
            </div>
            <div className="text-right text-sm text-gray-500">
              {format(new Date(lead.created_at), 'MMM d, yyyy')}
            </div>
          </div>

          {lead.contact_info && (
            <div className="space-y-2 mb-3">
              {lead.contact_info.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {lead.contact_info.email}
                </div>
              )}
              {lead.contact_info.phone && (
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {lead.contact_info.phone}
                </div>
              )}
            </div>
          )}

          {lead.notes && (
            <div className="mb-3">
              <p className="text-sm text-gray-700">{lead.notes}</p>
            </div>
          )}

          <div className="flex gap-2">
            {lead.contact_info?.email && (
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
            )}
            {lead.contact_info?.phone && (
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
            )}
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
