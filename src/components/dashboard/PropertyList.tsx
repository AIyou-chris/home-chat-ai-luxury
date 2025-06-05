
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Bed, Bath, Square } from 'lucide-react';

interface PropertyListProps {
  agentId: string;
}

export const PropertyList = ({ agentId }: PropertyListProps) => {
  const { data: properties, isLoading } = useQuery({
    queryKey: ['agent-properties', agentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!agentId
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  if (!properties?.length) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">No Properties Yet</h3>
        <p className="text-gray-600 mb-4">Submit a listing to see your properties here</p>
        <Button asChild>
          <a href="/submit">Submit Listing</a>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card key={property.id} className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={property.images?.[0] || '/placeholder.svg'}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.address}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">{property.price}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                {property.beds && (
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.beds} beds
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.baths} baths
                  </div>
                )}
                {property.sqft && (
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {property.sqft} sqft
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  Active
                </Badge>
                {property.listing_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={property.listing_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Listing
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
