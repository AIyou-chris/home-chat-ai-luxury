
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles } from 'lucide-react';

interface ChatHeaderProps {
  propertyTitle: string;
  totalLeadScore: number;
}

export const ChatHeader = ({ propertyTitle, totalLeadScore }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Property AI Assistant</h3>
          <p className="text-sm text-gray-500">Expert on features, restrictions & regulations</p>
        </div>
      </div>
      {totalLeadScore > 0 && (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Sparkles size={12} className="mr-1" />
          Interest Score: {totalLeadScore}
        </Badge>
      )}
    </div>
  );
};
