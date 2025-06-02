
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface LiveUpdatesTagProps {
  lastUpdated?: string | Date;
  className?: string;
}

export const LiveUpdatesTag = ({ lastUpdated, className = "" }: LiveUpdatesTagProps) => {
  if (!lastUpdated) return null;

  const updateDate = new Date(lastUpdated);
  const now = new Date();
  const hoursDiff = Math.abs(now.getTime() - updateDate.getTime()) / (1000 * 60 * 60);
  
  // Show "Recently Updated" badge if updated within 48 hours
  const isRecentlyUpdated = hoursDiff <= 48;
  
  if (!isRecentlyUpdated) return null;

  const timeAgo = hoursDiff < 1 
    ? 'Just updated' 
    : hoursDiff < 24 
    ? `${Math.floor(hoursDiff)} hours ago`
    : `${Math.floor(hoursDiff / 24)} days ago`;

  return (
    <Badge 
      variant="secondary" 
      className={`bg-green-100 text-green-800 border-green-300 animate-pulse ${className}`}
    >
      <Clock size={12} className="mr-1" />
      Recently Updated • {timeAgo}
    </Badge>
  );
};
