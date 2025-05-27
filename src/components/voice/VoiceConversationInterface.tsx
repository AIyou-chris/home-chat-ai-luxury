
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, MessageSquare, Settings, VolumeX, Volume2 } from 'lucide-react';
import { CircularVoiceAnimation } from './CircularVoiceAnimation';
import { VoiceSelectionPopup } from './VoiceSelectionPopup';
import { VoiceSelector } from './VoiceSelector';
import { VoiceControls } from './VoiceControls';
import { useEnhancedVoiceChat } from '@/hooks/useEnhancedVoiceChat';
import { supabase } from '@/integrations/supabase/client';

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
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('alloy');
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('Alloy');
  const [showVoicePopup, setShowVoicePopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const sessionId = useState(() => crypto.randomUUID())[0];

  // Load saved voice preference on mount
  useEffect(() => {
    const savedVoiceId = localStorage.getItem('preferred-voice-id');
    const savedVoiceName = localStorage.getItem('preferred-voice-name');
    if (savedVoiceId && savedVoiceName) {
      // Ensure we only use valid OpenAI voice IDs
      const validVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
      if (validVoices.includes(savedVoiceId)) {
        setSelectedVoiceId(savedVoiceId);
        setSelectedVoiceName(savedVoiceName);
      } else {
        // Reset to default if invalid voice ID found
        setSelectedVoiceId('alloy');
        setSelectedVoiceName('Alloy');
        localStorage.setItem('preferred-voice-id', 'alloy');
        localStorage.setItem('preferred-voice-name', 'Alloy');
      }
    }
  }, []);

  // Show voice popup when interface opens and no conversation started
  useEffect(() => {
    if (isOpen && !conversationStarted && !selectedVoiceId) {
      setShowVoicePopup(true);
    }
  }, [isOpen, conversationStarted, selectedVoiceId]);

  // Function to send message to AI and get response
  const sendToAI = async (message: string) => {
    if (isProcessingAI) return;
    
    setIsProcessingAI(true);
    console.log('Sending to AI:', message);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: message,
          propertyId: property.id,
          sessionId: sessionId
        }
      });

      if (error) throw error;

      console.log('AI Response received:', data.response);
      
      // Add AI response to transcript
      setTranscript(prev => [...prev, `AI: ${data.response}`]);
      
      // Speak the AI response with the selected voice - this was missing!
      if (speak) {
        console.log('Speaking AI response with voice:', selectedVoiceId);
        speak(data.response);
      }
    } catch (error) {
      console.error('AI chat error:', error);
      const errorResponse = "I'm sorry, I'm having trouble responding right now. Please try again.";
      setTranscript(prev => [...prev, `AI: ${errorResponse}`]);
      if (speak) {
        speak(errorResponse);
      }
    } finally {
      setIsProcessingAI(false);
    }
  };

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
      console.log('Transcript received:', text);
      setTranscript(prev => [...prev, `You: ${text}`]);
      // Send the transcribed text to AI
      sendToAI(text);
    },
    onAIResponse: (text) => {
      console.log('AI Response callback:', text);
      // Don't add to transcript here since we do it in sendToAI
    },
    property,
    useUltravox: false, // Default to OpenAI TTS
    voiceId: selectedVoiceId
  });

  const handleVoiceSelection = (voiceId: string, voiceName: string) => {
    console.log('Voice selected:', voiceId, voiceName);
    setSelectedVoiceId(voiceId);
    setSelectedVoiceName(voiceName);
    
    // Save preference to localStorage
    localStorage.setItem('preferred-voice-id', voiceId);
    localStorage.setItem('preferred-voice-name', voiceName);
    
    // Update voice settings for OpenAI TTS
    if (updateVoiceSettings) {
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
    if (isProcessingAI) return 'thinking';
    if (isConnected && conversationStarted) return 'thinking';
    return 'idle';
  };

  const getStatusText = () => {
    if (!selectedVoiceId) return 'Select a voice to start';
    if (!isConnected && voiceMode === 'ultravox') return 'Connecting...';
    if (isProcessingAI) return 'AI is thinking...';
    if (isSpeaking) return 'AI is speaking...';
    if (isListening) return 'Listening...';
    if (conversationStarted) return 'Tap to speak';
    return 'Ready to start conversation';
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 to-white flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
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
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
            <div className="max-w-md mx-auto">
              {voiceMode === 'openai' && availableVoices && (
                <VoiceControls
                  isSupported={isSupported}
                  isSpeaking={isSpeaking}
                  availableVoices={availableVoices}
                  settings={{
                    voice: { id: selectedVoiceId, name: selectedVoiceName },
                    selectedVoice: selectedVoiceId
                  }}
                  onSettingsChange={(settings) => {
                    if (settings.voice?.id) {
                      handleVoiceSelection(settings.voice.id, settings.voice.name || settings.voice.id);
                    }
                  }}
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
          <div className="p-4 bg-red-50 border-b border-red-200 flex-shrink-0">
            <div className="max-w-md mx-auto">
              <p className="text-sm text-red-800 text-center mb-3">{error}</p>
              <div className="flex flex-col space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => switchVoiceMode('openai')}
                  className="text-xs"
                >
                  Switch to OpenAI Voice
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setError && setError(null);
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

        {/* Main Voice Interface - Made flex-1 to take remaining space */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-0">
          {/* Animated Graph - Reduced margin */}
          <div className="mb-4">
            <CircularVoiceAnimation 
              isActive={true}
              mode={getAnimationMode()}
              size="large"
            />
          </div>

          {/* Status Text - Reduced margin */}
          <p className="text-lg font-medium text-gray-700 mb-4 text-center">
            {getStatusText()}
          </p>

          {/* Connection Status */}
          {voiceMode === 'ultravox' && (
            <div className="flex items-center space-x-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected to Ultravox' : 'Connecting to Ultravox...'}
              </span>
            </div>
          )}

          {/* Voice Controls */}
          {selectedVoiceId && isSupported && (
            <div className="flex items-center space-x-6 mb-4">
              {/* Main Voice Button */}
              <Button
                onClick={handleVoiceToggle}
                disabled={(voiceMode === 'ultravox' && !isConnected) || isProcessingAI}
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

          {/* Transcript - Made scrollable and limited height */}
          {transcript.length > 0 && (
            <Card className="w-full max-w-2xl flex-1 min-h-0">
              <CardContent className="p-4 h-full overflow-y-auto">
                <div className="space-y-2">
                  {transcript.map((line, index) => (
                    <p key={index} className="text-sm text-gray-600 break-words">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-3 border-t border-gray-200 text-center flex-shrink-0">
          <p className="text-xs text-gray-400">
            {voiceMode === 'ultravox' 
              ? 'Powered by Ultravox AI • Real-time voice conversation'
              : 'Using OpenAI Text-to-Speech'
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
