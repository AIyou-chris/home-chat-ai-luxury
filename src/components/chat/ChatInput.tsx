
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  voiceMessage?: string;
  onSendVoiceMessage?: () => void;
}

export const ChatInput = ({ 
  value, 
  onChange, 
  onSend, 
  isLoading,
  voiceMessage,
  onSendVoiceMessage
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  const handleSend = () => {
    if (voiceMessage && onSendVoiceMessage) {
      onSendVoiceMessage();
    } else {
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      {voiceMessage && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Mic size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Voice Input:</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">{voiceMessage}</p>
        </div>
      )}
      
      <div className="flex space-x-2">
        <Input
          value={voiceMessage || value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about features, restrictions, HOA rules, zoning..."
          className="flex-1 border-gray-300 focus:border-blue-500"
          disabled={isLoading || !!voiceMessage}
        />
        <Button 
          onClick={handleSend} 
          disabled={(!value.trim() && !voiceMessage) || isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Send size={16} />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Powered by AI • Expert knowledge on property restrictions & regulations
        {voiceMessage && " • Voice input ready to send"}
      </p>
    </div>
  );
};
