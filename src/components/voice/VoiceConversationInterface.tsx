
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { VoiceAnimation } from './VoiceAnimation';
import { VoiceControls } from './VoiceControls';
import { VoiceSelectionPopup } from './VoiceSelectionPopup';
import { useEnhancedVoiceChat } from '@/hooks/useEnhancedVoiceChat';
import { PropertyChatBot } from '../PropertyChatBot';
import { ProBadge } from '../ProBadge';

interface VoiceConversationInterfaceProps {
  property: any;
  onSwitchToChat: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const VoiceConversationInterface = ({ 
  property, 
  onSwitchToChat, 
  onClose, 
  isOpen 
}: VoiceConversationInterfaceProps) => {
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [showVoiceSelection, setShowVoiceSelection] = useState(false);
  const [pendingVoiceMessage, setPendingVoiceMessage] = useState('');

  const handleTranscript = useCallback((text: string) => {
    setTranscript(text);
    setPendingVoiceMessage(text);
  }, []);

  const handleAIResponse = useCallback((text: string) => {
    setAIResponse(text);
  }, []);

  const {
    isListening,
    isSpeaking,
    isConnected,
    isSupported,
    error,
    startListening,
    stopListening,
    voiceMode,
    switchVoiceMode,
    availableVoices,
  } = useEnhancedVoiceChat({
    onTranscript: handleTranscript,
    onAIResponse: handleAIResponse,
    property,
    useUltravox: false,
    voiceId: 'alloy'
  });

  const handleVoiceMessageSent = useCallback(() => {
    setPendingVoiceMessage('');
    setTranscript('');
  }, []);

  if (!isOpen) return null;

  if (!isSupported) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="absolute right-0 top-0 h-full w-full bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <VolumeX size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Voice Not Supported</h3>
                <p className="text-sm text-gray-500">Your browser doesn't support voice features</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-600 mb-4">
              Voice chat is not supported in your current browser. Please try using Chrome, Safari, or Edge for the best experience.
            </p>
            <Button onClick={onSwitchToChat} className="bg-orange-500 hover:bg-orange-600 text-white">
              Switch to Text Chat
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Volume2 size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-800">Voice Chat</h3>
                <ProBadge size="sm" />
              </div>
              <p className="text-sm text-gray-500">
                {isConnected ? 'Talk naturally about the property' : 'Connecting...'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSwitchToChat}
              className="text-gray-600 hover:bg-gray-100"
            >
              <MessageSquare size={20} />
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

        {/* Voice Interface Content */}
        <div className="flex flex-col h-[calc(100vh-80px)]">
          {/* Voice Animation and Controls */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
            <VoiceAnimation 
              isListening={isListening}
              isSpeaking={isSpeaking}
            />
            
            <VoiceControls
              isListening={isListening}
              isSpeaking={isSpeaking}
              isSupported={isSupported}
              onStartListening={startListening}
              onStopListening={stopListening}
              onOpenVoiceSettings={() => setShowVoiceSelection(true)}
            />

            {transcript && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md text-center">
                <p className="text-sm text-gray-600 mb-1">You said:</p>
                <p className="text-blue-800 font-medium">"{transcript}"</p>
              </div>
            )}

            {aiResponse && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md text-center">
                <p className="text-sm text-gray-600 mb-1">AI Response:</p>
                <p className="text-green-800 font-medium">"{aiResponse}"</p>
              </div>
            )}
          </div>

          {/* Chat Component for message history */}
          <div className="h-64 border-t border-gray-200">
            <PropertyChatBot 
              property={property}
              pendingVoiceMessage={pendingVoiceMessage}
              onVoiceMessageSent={handleVoiceMessageSent}
              onAIResponse={handleAIResponse}
            />
          </div>
        </div>

        {/* Voice Selection Popup */}
        {showVoiceSelection && (
          <VoiceSelectionPopup 
            isOpen={showVoiceSelection}
            onClose={() => setShowVoiceSelection(false)}
            availableVoices={availableVoices || [
              { id: 'alloy', name: 'Alloy', description: 'Neutral and balanced' },
              { id: 'echo', name: 'Echo', description: 'Deep and resonant' },
              { id: 'fable', name: 'Fable', description: 'Expressive and dynamic' },
              { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative' },
              { id: 'nova', name: 'Nova', description: 'Warm and engaging' },
              { id: 'shimmer', name: 'Shimmer', description: 'Bright and cheerful' }
            ]}
            currentVoice="alloy"
            onVoiceSelect={(voiceId) => {
              console.log('Voice selected:', voiceId);
              setShowVoiceSelection(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
