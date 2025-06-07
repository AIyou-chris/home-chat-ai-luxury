
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  leadScore?: number;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.sender === 'user' ? 'bg-orange-500' : 'bg-blue-500'
        }`}>
          {message.sender === 'user' ? 
            <User size={16} className="text-white" /> : 
            <Bot size={16} className="text-white" />
          }
        </div>
        <Card className={`p-3 ${
          message.sender === 'user'
            ? 'bg-orange-500 text-white border-orange-500'
            : 'bg-white border-gray-200'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          {message.leadScore && message.leadScore > 0 && (
            <Badge variant="outline" className="mt-2 text-xs bg-green-50 border-green-200">
              +{message.leadScore} interest points
            </Badge>
          )}
        </Card>
      </div>
    </div>
  );
};
