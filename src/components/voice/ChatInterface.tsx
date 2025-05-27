
import { Button } from '@/components/ui/button';
import { MessageSquare, Mic, X } from 'lucide-react';
import { PropertyChatBot } from '../PropertyChatBot';

interface ChatInterfaceProps {
  property: any;
  onSwitchToVoice: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const ChatInterface = ({ 
  property, 
  onSwitchToVoice, 
  onClose, 
  isOpen 
}: ChatInterfaceProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 safe-area-top">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <MessageSquare size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Text Chat</h3>
              <p className="text-sm text-gray-500">Ask questions about the property</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSwitchToVoice}
              className="text-gray-600 hover:bg-gray-100"
            >
              <Mic size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Chat Component */}
        <div className="h-[calc(100vh-80px)] safe-area-bottom">
          <PropertyChatBot 
            property={property} 
            pendingVoiceMessage=""
            onVoiceMessageSent={() => {}}
            onAIResponse={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
