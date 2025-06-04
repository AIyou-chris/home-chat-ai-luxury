
import { Badge } from '@/components/ui/badge';
import { Clock, Wifi } from 'lucide-react';

interface LiveUpdatesTagProps {
  lastUpdated?: string | Date;
  className?: string;
  showAutoScan?: boolean;
}

export const LiveUpdatesTag = ({ lastUpdated, className = "", showAutoScan = false }: LiveUpdatesTagProps) => {
  if (!lastUpdated) return null;

  const updateDate = new Date(lastUpdated);
  const now = new Date();
  const hoursDiff = Math.abs(now.getTime() - updateDate.getTime()) / (1000 * 60 * 60);
  
  // Show "Recently Updated" badge if updated within 48 hours
  const isRecentlyUpdated = hoursDiff <= 48;
  
  if (!isRecentlyUpdated && !showAutoScan) return null;

  const timeAgo = hoursDiff < 1 
    ? 'Just updated' 
    : hoursDiff < 24 
    ? `${Math.floor(hoursDiff)} hours ago`
    : `${Math.floor(hoursDiff / 24)} days ago`;

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {isRecentlyUpdated && (
        <Badge 
          variant="secondary" 
          className={`bg-green-100 text-green-800 border-green-300 animate-pulse ${className}`}
        >
          <Clock size={12} className="mr-1" />
          Recently Updated • {timeAgo}
        </Badge>
      )}
      
      {showAutoScan && (
        <Badge 
          variant="secondary" 
          className={`bg-blue-100 text-blue-800 border-blue-300 ${className}`}
        >
          <Wifi size={12} className="mr-1" />
          Auto-scan: Every 48hrs
        </Badge>
      )}
    </div>
  );
};
