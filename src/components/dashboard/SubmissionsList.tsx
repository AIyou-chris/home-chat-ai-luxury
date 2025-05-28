
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, Clock, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface SubmissionsListProps {
  agentId: string;
}

export const SubmissionsList = ({ agentId }: SubmissionsListProps) => {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ['agent-submissions', agentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('realtor_submissions')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!agentId
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading submissions...</div>;
  }

  if (!submissions?.length) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">No Submissions Yet</h3>
        <p className="text-gray-600 mb-4">Submit a listing to see your submissions here</p>
        <Button asChild>
          <a href="/realtor-submit">Submit Listing</a>
        </Button>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <Card key={submission.id} className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">
                  Submission #{submission.id.slice(0, 8)}
                </span>
                <Badge className={getStatusColor(submission.processing_status)}>
                  {submission.processing_status}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ExternalLink className="h-4 w-4 mr-1" />
                <a 
                  href={submission.listing_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  {submission.listing_url}
                </a>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              {format(new Date(submission.created_at), 'MMM d, yyyy')}
            </div>
          </div>

          {submission.additional_notes && (
            <div className="mb-3">
              <p className="text-sm text-gray-700">{submission.additional_notes}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            {submission.social_media_links && Object.keys(submission.social_media_links).length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Social Media:</p>
                <div className="space-y-1">
                  {Object.entries(submission.social_media_links).map(([platform, url]) => (
                    url && (
                      <a 
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        {platform}: {url as string}
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}

            {submission.custom_build_interest && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Custom Build Interest:</p>
                <div className="flex items-center text-sm text-green-600">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Yes - Builder consultation requested
                </div>
                {submission.contact_phone && (
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Phone className="h-4 w-4 mr-1" />
                    {submission.contact_phone}
                  </div>
                )}
                {submission.preferred_call_time && (
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    Preferred time: {submission.preferred_call_time}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <a href={submission.listing_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                View Listing
              </a>
            </Button>
            {submission.custom_build_interest && submission.contact_phone && (
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Call Client
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
