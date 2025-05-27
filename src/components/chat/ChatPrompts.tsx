
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ChatPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export const ChatPrompts = ({ onPromptSelect }: ChatPromptsProps) => {
  const generalPrompts = [
    "Tell me about the neighborhood",
    "What are the best features?",
    "Can I schedule a tour?"
  ];

  const restraintPrompts = [
    "What are the HOA rules and fees?",
    "Can I renovate or add onto this home?"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs text-gray-500 px-2">General questions:</p>
        <div className="grid grid-cols-1 gap-2">
          {generalPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onPromptSelect(prompt)}
              className="justify-start text-left bg-white border-gray-200 hover:bg-gray-50 text-gray-700 h-auto py-2 px-3"
            >
              <span className="text-xs">{prompt}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 px-2">
          <AlertTriangle size={14} className="text-amber-500" />
          <p className="text-xs text-amber-700 font-medium">Legal & regulatory questions:</p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {restraintPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onPromptSelect(prompt)}
              className="justify-start text-left bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800 h-auto py-2 px-3"
            >
              <span className="text-xs">{prompt}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
