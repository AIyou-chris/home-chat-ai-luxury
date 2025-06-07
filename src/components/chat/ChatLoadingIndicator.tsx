
import { Card } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export const ChatLoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex space-x-2 max-w-[80%]">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </div>
        <Card className="p-3 bg-white border-gray-200">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </Card>
      </div>
    </div>
  );
};
