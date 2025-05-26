
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ value, onChange, onSend, isLoading }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex space-x-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about features, restrictions, HOA rules, zoning..."
          className="flex-1 border-gray-300 focus:border-blue-500"
          disabled={isLoading}
        />
        <Button 
          onClick={onSend} 
          disabled={!value.trim() || isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Send size={16} />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Powered by AI • Expert knowledge on property restrictions & regulations
      </p>
    </div>
  );
};
