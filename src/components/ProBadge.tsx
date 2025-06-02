
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';

interface ProBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProBadge = ({ className = "", size = 'sm' }: ProBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 10,
    md: 12,
    lg: 14
  };

  return (
    <Badge 
      variant="secondary" 
      className={`bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-400 font-semibold ${sizeClasses[size]} ${className}`}
    >
      <Crown size={iconSizes[size]} className="mr-1" />
      PRO
    </Badge>
  );
};
