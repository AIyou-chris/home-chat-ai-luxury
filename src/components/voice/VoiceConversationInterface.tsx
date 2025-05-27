
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Settings } from 'lucide-react';
import { VoiceAnimation } from './VoiceAnimation';
import { VoiceSelectionPopup } from './VoiceSelectionPopup';
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
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showVoicePopup, setShowVoicePopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const voice = useEnhancedVoiceChat({
    onTranscript: async (text) => {
      console.log('Voice transcript received:', text);
      setTranscript(text);
      setIsProcessing(true);

      try {
        // Send the transcript to AI chat
        const { data, error } = await supabase.functions.invoke('ai-chat', {
          body: {
            message: text,
            propertyId: property.id,
            sessionId: crypto.randomUUID()
          }
        });

        if (error) throw error;

        console.log('AI response received:', data.response);
        setAiResponse(data.response);
        
        // Speak the AI response if using OpenAI mode
        if (voice.voiceMode === 'openai' && voice.speak) {
          voice.speak(data.response);
        }
      } catch (error) {
        console.error('Error processing voice message:', error);
        const errorMessage = "I'm sorry, I'm having trouble processing your request right now.";
        setAiResponse(errorMessage);
        if (voice.voiceMode === 'openai' && voice.speak) {
          voice.speak(errorMessage);
        }
      } finally {
        setIsProcessing(false);
      }
    },
    onAIResponse: (text) => {
      console.log('AI response for voice:', text);
      setAiResponse(text);
    },
    property,
    useUltravox: false,
    voiceId: 'alloy'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <MessageSquare size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Voice Assistant
            </h2>
            <p className="text-sm text-gray-600">
              Ask about {property.title}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowVoicePopup(true)}
            className="text-gray-600 hover:bg-gray-100"
          >
            <Settings size={20} />
          </Button>
          <Button
            onClick={onSwitchToChat}
            variant="outline"
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            Switch to Text Chat
          </Button>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Voice Chat with AI Assistant
            </h3>
            <p className="text-gray-600">
              Ask me anything about this property. I can help with details, 
              scheduling tours, and answering questions.
            </p>
          </div>

          {/* Voice Animation */}
          <div className="flex justify-center py-6">
            <VoiceAnimation 
              isListening={voice.isListening}
              isSpeaking={voice.isSpeaking || isProcessing}
            />
          </div>

          {/* Voice Controls */}
          <div className="space-y-4 text-center">
            {!voice.isListening && !voice.isSpeaking && !isProcessing && (
              <Button
                onClick={voice.startListening}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition-all duration-200 hover:scale-105"
              >
                Start Voice Chat
              </Button>
            )}
            
            {voice.isListening && (
              <Button
                onClick={voice.stopListening}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 px-8 py-3 rounded-full text-lg font-medium shadow-lg"
              >
                Stop Listening
              </Button>
            )}

            {isProcessing && (
              <div className="text-center">
                <div className="text-orange-600 font-medium">Processing your request...</div>
              </div>
            )}

            {!voice.isSupported && (
              <div className="text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
                Voice synthesis not supported in this browser
              </div>
            )}
          </div>

          {/* Transcript and Response Display */}
          <div className="space-y-4 w-full">
            {transcript && (
              <Card className="p-4 bg-gray-50 border-gray-200">
                <p className="text-sm text-gray-600 mb-2 font-medium">You said:</p>
                <p className="text-gray-900">{transcript}</p>
              </Card>
            )}

            {aiResponse && (
              <Card className="p-4 bg-orange-50 border-orange-200">
                <p className="text-sm text-orange-600 mb-2 font-medium">AI Assistant:</p>
                <p className="text-gray-900">{aiResponse}</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Voice Selection Popup */}
      {showVoicePopup && voice.voiceMode === 'openai' && (
        <VoiceSelectionPopup
          isOpen={showVoicePopup}
          onClose={() => setShowVoicePopup(false)}
          availableVoices={voice.availableVoices || []}
          currentVoice={voice.voiceSettings?.selectedVoice}
          onVoiceSelect={(voiceId) => {
            voice.updateVoiceSettings?.({ voice: { id: voiceId } });
            setShowVoicePopup(false);
          }}
        />
      )}
    </div>
  );
};
