import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageSquare, Mic, MicOff } from 'lucide-react';
import { PropertyChatBot } from './PropertyChatBot';
import { useEnhancedVoiceChat } from '@/hooks/useEnhancedVoiceChat';
import { VoiceControls } from './voice/VoiceControls';
import { VoiceAnimation } from './voice/VoiceAnimation';
import { VoiceSelector } from './voice/VoiceSelector';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export const AIChat = ({ isOpen, onClose, property }: AIChatProps) => {
  const [pendingVoiceMessage, setPendingVoiceMessage] = useState<string>('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('b0e6b5c1-3100-44d5-8578-9015aa3023ae'); // Default to female voice
  const [customVoiceId, setCustomVoiceId] = useState<string>('');

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
    speak,
    stopSpeaking,
    availableVoices,
    voiceSettings,
    updateVoiceSettings
  } = useEnhancedVoiceChat({
    onTranscript: (text) => {
      setPendingVoiceMessage(text);
    },
    onAIResponse: (text) => {
      console.log('AI Response:', text);
    },
    property,
    useUltravox: true,
    voiceId: selectedVoiceId
  });

  const handleVoiceChange = (voiceId: string) => {
    setSelectedVoiceId(voiceId);
    // Disconnect current session to use new voice
    if (isConnected) {
      stopListening();
      // Session will be recreated with new voice on next startListening
    }
  };

  const handleCustomVoiceSubmit = (voiceId: string) => {
    setCustomVoiceId(voiceId);
    setSelectedVoiceId(voiceId);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleTestVoice = () => {
    if (voiceMode === 'browser' && speak) {
      speak("Hello! This is how my voice sounds with the current settings. You can adjust the speed, pitch, and voice to your preference.");
    }
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
              <div className="flex items-center space-x-2">
                <VoiceAnimation 
                  isListening={isListening} 
                  isSpeaking={isSpeaking}
                  className="min-h-[20px]"
                />
                {!isListening && !isSpeaking && (
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">
                      AI Assistant ({voiceMode === 'ultravox' ? 'Ultravox' : 'Browser'})
                    </p>
                    {voiceMode === 'ultravox' && (
                      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600 hover:bg-gray-100">
            <X size={20} />
          </Button>
        </div>

        {/* Voice Controls */}
        {isSupported && (
          <div className="p-4 border-b border-gray-200">
            {/* Voice Selection */}
            <div className="mb-4">
              <VoiceSelector
                selectedVoice={selectedVoiceId}
                onVoiceChange={handleVoiceChange}
                customVoiceId={customVoiceId}
                onCustomVoiceSubmit={handleCustomVoiceSubmit}
              />
            </div>

            {/* Voice Mode Switcher */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Button
                variant={voiceMode === 'ultravox' ? 'default' : 'outline'}
                size="sm"
                onClick={() => switchVoiceMode('ultravox')}
                className="text-xs"
              >
                Ultravox AI
              </Button>
              <Button
                variant={voiceMode === 'browser' ? 'default' : 'outline'}
                size="sm"
                onClick={() => switchVoiceMode('browser')}
                className="text-xs"
              >
                Browser Voice
              </Button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => switchVoiceMode('browser')}
                  className="mt-2 text-xs"
                >
                  Switch to Browser Voice
                </Button>
              </div>
            )}

            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button
                onClick={handleVoiceToggle}
                disabled={voiceMode === 'ultravox' && !isConnected}
                className={`flex-1 py-4 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                <span className="ml-2">
                  {isListening ? 'Stop Listening' : 'Start Voice Input'}
                </span>
              </Button>
            </div>

            {/* Voice Animation in Controls Area */}
            <div className="flex justify-center mb-4">
              <VoiceAnimation 
                isListening={isListening} 
                isSpeaking={isSpeaking}
                className="bg-gray-50 px-4 py-2 rounded-lg border"
              />
            </div>

            {/* Browser Voice Controls (only show for browser mode) */}
            {voiceMode === 'browser' && availableVoices && voiceSettings && (
              <VoiceControls
                isSupported={isSupported}
                isSpeaking={isSpeaking}
                availableVoices={availableVoices}
                settings={voiceSettings}
                onSettingsChange={updateVoiceSettings}
                onStop={stopSpeaking}
                onTestVoice={handleTestVoice}
              />
            )}
            
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
              {voiceMode === 'ultravox' 
                ? `${isConnected ? 'Connected to' : 'Connecting to'} Ultravox AI voice system`
                : 'Using browser voice system • Customize settings above'
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
              // For Ultravox, AI responses come through the voice system automatically
              // For browser mode, we need to speak them manually
              if (voiceMode === 'browser' && (isListening || isSpeaking) && speak) {
                speak(text);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
