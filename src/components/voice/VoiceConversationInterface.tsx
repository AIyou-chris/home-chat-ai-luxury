import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, MessageSquare, Settings, VolumeX, Volume2 } from 'lucide-react';
import { CircularVoiceAnimation } from './CircularVoiceAnimation';
import { VoiceSelectionPopup } from './VoiceSelectionPopup';
import { VoiceSelector } from './VoiceSelector';
import { useEnhancedVoiceChat } from '@/hooks/useEnhancedVoiceChat';

interface VoiceConversationInterfaceProps {
  property: any;
  onSwitchToChat: () => void;
  isOpen: boolean;
}

export const VoiceConversationInterface = ({ 
  property, 
  onSwitchToChat, 
  isOpen 
}: VoiceConversationInterfaceProps) => {
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [showVoicePopup, setShowVoicePopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);

  // Load saved voice preference on mount
  useEffect(() => {
    const savedVoiceId = localStorage.getItem('preferred-voice-id');
    const savedVoiceName = localStorage.getItem('preferred-voice-name');
    if (savedVoiceId && savedVoiceName) {
      setSelectedVoiceId(savedVoiceId);
      setSelectedVoiceName(savedVoiceName);
    } else {
      // Default to OpenAI voice
      setSelectedVoiceId('alloy');
      setSelectedVoiceName('Alloy');
    }
  }, []);

  // Show voice popup when interface opens and no voice is selected
  useEffect(() => {
    if (isOpen && !selectedVoiceId) {
      setShowVoicePopup(true);
    }
  }, [isOpen, selectedVoiceId]);

  const {
    isListening,
    isSpeaking,
    isConnected,
    isSupported,
    error,
    setError,
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
      setTranscript(prev => [...prev, `You: ${text}`]);
    },
    onAIResponse: (text) => {
      setTranscript(prev => [...prev, `AI: ${text}`]);
    },
    property,
    useUltravox: false, // Default to OpenAI TTS
    voiceId: selectedVoiceId
  });

  const handleVoiceSelection = (voiceId: string, voiceName: string) => {
    setSelectedVoiceId(voiceId);
    setSelectedVoiceName(voiceName);
    
    // Save preference to localStorage
    localStorage.setItem('preferred-voice-id', voiceId);
    localStorage.setItem('preferred-voice-name', voiceName);
    
    // Update voice settings if using OpenAI TTS
    if (voiceMode === 'openai' && updateVoiceSettings) {
      updateVoiceSettings({ voice: { id: voiceId, name: voiceName } });
    }
    
    setShowVoicePopup(false);
    setConversationStarted(true);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      if (!conversationStarted) {
        setConversationStarted(true);
      }
      startListening();
    }
  };

  const getAnimationMode = () => {
    if (isSpeaking) return 'speaking';
    if (isListening) return 'listening';
    if (isConnected && conversationStarted) return 'thinking';
    return 'idle';
  };

  const getStatusText = () => {
    if (!selectedVoiceId) return 'Select a voice to start';
    if (!isConnected && voiceMode === 'ultravox') return 'Connecting...';
    if (isSpeaking) return 'AI is speaking...';
    if (isListening) return 'Listening...';
    if (conversationStarted) return 'Tap to speak';
    return 'Ready to start conversation';
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Mic size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Voice Conversation</h3>
              <p className="text-sm text-gray-500">
                {selectedVoiceName ? `Speaking with ${selectedVoiceName}` : 'AI Assistant'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-600 hover:bg-gray-100"
            >
              <Settings size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSwitchToChat}
              className="text-gray-600 hover:bg-gray-100"
            >
              <MessageSquare size={20} />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && selectedVoiceId && (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="max-w-md mx-auto">
              {voiceMode === 'openai' && availableVoices && (
                <VoiceControls
                  isSupported={isSupported}
                  isSpeaking={isSpeaking}
                  availableVoices={availableVoices}
                  settings={voiceSettings || {}}
                  onSettingsChange={updateVoiceSettings || (() => {})}
                  onStop={stopSpeaking || (() => {})}
                  onTestVoice={() => speak?.('This is a test of the selected voice.')}
                />
              )}
              
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Button
                  variant={voiceMode === 'openai' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => switchVoiceMode('openai')}
                  className="text-xs"
                >
                  OpenAI TTS
                </Button>
                <Button
                  variant={voiceMode === 'ultravox' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => switchVoiceMode('ultravox')}
                  className="text-xs"
                >
                  Ultravox AI
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <div className="max-w-md mx-auto">
              <p className="text-sm text-red-800 text-center mb-3">{error}</p>
              <div className="flex flex-col space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => switchVoiceMode('browser')}
                  className="text-xs"
                >
                  Switch to Browser Voice
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setError(null);
                    if (voiceMode === 'ultravox') {
                      startListening();
                    }
                  }}
                  className="text-xs"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Voice Interface */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Animated Graph */}
          <div className="mb-8">
            <CircularVoiceAnimation 
              isActive={true}
              mode={getAnimationMode()}
              size="large"
            />
          </div>

          {/* Status Text */}
          <p className="text-lg font-medium text-gray-700 mb-8 text-center">
            {getStatusText()}
          </p>

          {/* Connection Status */}
          {voiceMode === 'ultravox' && (
            <div className="flex items-center space-x-2 mb-6">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected to Ultravox' : 'Connecting to Ultravox...'}
              </span>
            </div>
          )}

          {/* Voice Controls */}
          {selectedVoiceId && isSupported && (
            <div className="flex items-center space-x-6">
              {/* Main Voice Button */}
              <Button
                onClick={handleVoiceToggle}
                disabled={voiceMode === 'ultravox' && !isConnected}
                size="lg"
                className={`w-20 h-20 rounded-full transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white scale-110' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isListening ? <MicOff size={32} /> : <Mic size={32} />}
              </Button>

              {/* Volume Indicator */}
              <div className="flex items-center space-x-2">
                {isSpeaking ? <Volume2 size={20} className="text-blue-500" /> : <VolumeX size={20} className="text-gray-400" />}
              </div>
            </div>
          )}

          {/* Transcript */}
          {transcript.length > 0 && (
            <Card className="mt-8 max-w-2xl w-full max-h-40 overflow-y-auto">
              <CardContent className="p-4">
                <div className="space-y-2">
                  {transcript.slice(-4).map((line, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            {voiceMode === 'ultravox' 
              ? 'Powered by Ultravox AI • Real-time voice conversation'
              : 'Using browser voice system'
            }
          </p>
        </div>
      </div>

      {/* Voice Selection Popup */}
      <VoiceSelectionPopup
        isOpen={showVoicePopup}
        onVoiceSelect={handleVoiceSelection}
        onClose={() => setShowVoicePopup(false)}
      />
    </>
  );
};
