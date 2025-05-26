
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageSquare, Mic, MicOff, Volume2 } from 'lucide-react';
import { PropertyChatBot } from './PropertyChatBot';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export const AIChat = ({ isOpen, onClose, property }: AIChatProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const startVoiceChat = async () => {
    try {
      setIsListening(true);
      setIsConnected(true);
      // TODO: Initialize Ultravox SDK for voice
      console.log('Starting voice chat...');
    } catch (error) {
      console.error('Failed to start voice chat:', error);
      setIsListening(false);
      setIsConnected(false);
    }
  };

  const stopVoiceChat = () => {
    setIsListening(false);
    setIsConnected(false);
    console.log('Stopping voice chat...');
  };

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
              <h3 className="font-medium text-gray-800">Talk with Home</h3>
              <p className="text-sm text-gray-500">
                {isConnected ? 'Voice connected' : 'AI Assistant'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600 hover:bg-gray-100">
            <X size={20} />
          </Button>
        </div>

        {/* Voice Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={isListening ? stopVoiceChat : startVoiceChat}
              className={`flex-1 py-4 rounded-xl transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              <span className="ml-2">
                {isListening ? 'Stop Voice Chat' : 'Start Voice Chat'}
              </span>
            </Button>
            {isConnected && (
              <Button variant="outline" size="icon" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                <Volume2 size={20} />
              </Button>
            )}
          </div>
          {isConnected && (
            <p className="text-center text-sm text-orange-600 mt-2">
              Voice chat coming soon • Use text chat below
            </p>
          )}
        </div>

        {/* Chat Component */}
        <div className="h-[calc(100vh-140px)] safe-area-bottom">
          <PropertyChatBot property={property} />
        </div>
      </div>
    </div>
  );
};
