
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageSquare, Mic, MicOff } from 'lucide-react';
import { PropertyChatBot } from './PropertyChatBot';
import { useVoiceChat } from '@/hooks/useVoiceChat';
import { VoiceControls } from './voice/VoiceControls';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export const AIChat = ({ isOpen, onClose, property }: AIChatProps) => {
  const [pendingVoiceMessage, setPendingVoiceMessage] = useState<string>('');

  const {
    isListening,
    isSpeaking,
    isSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    availableVoices,
    voiceSettings,
    updateVoiceSettings
  } = useVoiceChat({
    onTranscript: (text) => {
      setPendingVoiceMessage(text);
    },
    onSpeakText: (text) => {
      console.log('Speaking:', text);
    }
  });

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleTestVoice = () => {
    speak("Hello! This is how my voice sounds with the current settings. You can adjust the speed, pitch, and voice to your preference.");
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
                {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'AI Assistant'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600 hover:bg-gray-100">
            <X size={20} />
          </Button>
        </div>

        {/* Voice Controls */}
        {isSupported && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button
                onClick={handleVoiceToggle}
                className={`flex-1 py-4 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                <span className="ml-2">
                  {isListening ? 'Stop Listening' : 'Start Voice Input'}
                </span>
              </Button>
            </div>

            <VoiceControls
              isSupported={isSupported}
              isSpeaking={isSpeaking}
              availableVoices={availableVoices}
              settings={voiceSettings}
              onSettingsChange={updateVoiceSettings}
              onStop={stopSpeaking}
              onTestVoice={handleTestVoice}
            />
            
            {pendingVoiceMessage && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Voice Input:</strong> {pendingVoiceMessage}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setPendingVoiceMessage('');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Send
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setPendingVoiceMessage('')}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
            
            <p className="text-center text-sm text-orange-600 mt-2">
              {isSupported 
                ? 'Enhanced voice chat enabled • Customize settings above' 
                : 'Voice chat not supported in this browser'
              }
            </p>
          </div>
        )}

        {/* Chat Component */}
        <div className="h-[calc(100vh-140px)] safe-area-bottom">
          <PropertyChatBot 
            property={property} 
            pendingVoiceMessage={pendingVoiceMessage}
            onVoiceMessageSent={() => setPendingVoiceMessage('')}
            onAIResponse={(text) => {
              // Auto-speak AI responses when voice mode is active
              if (isListening || isSpeaking) {
                speak(text);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
