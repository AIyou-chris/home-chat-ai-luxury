
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X } from 'lucide-react';
import { PropertyChatBot } from './PropertyChatBot';
import { ProBadge } from './ProBadge';

interface FloatingChatWidgetProps {
  property: any;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FloatingChatWidget = ({ property, isOpen: externalIsOpen, onClose: externalOnClose }: FloatingChatWidgetProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnClose ? externalOnClose : () => setInternalIsOpen(false);
  const handleOpen = () => {
    if (externalIsOpen === undefined) {
      setInternalIsOpen(true);
    }
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" style={{ zIndex: 9999 }}>
        <div className="absolute inset-0 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-800">AI Property Assistant</h3>
                  <ProBadge size="sm" />
                </div>
                <p className="text-sm text-gray-500">Ask me anything about this property</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={setIsOpen} 
              className="text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Chat Component */}
          <div className="h-[calc(100vh-80px)]">
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
  }

  return (
    <div className="fixed bottom-32 right-6 z-40">
      <Button
        onClick={handleOpen}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        size="lg"
      >
        <Bot size={28} />
      </Button>
    </div>
  );
};
