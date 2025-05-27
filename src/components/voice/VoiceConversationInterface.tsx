
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, X } from 'lucide-react';
import { VoiceAnimation } from './VoiceAnimation';
import { VoiceControls } from './VoiceControls';
import { VoiceSelectionPopup } from './VoiceSelectionPopup';
import { useEnhancedVoiceChat } from '@/hooks/useEnhancedVoiceChat';
import { PropertyChatBot } from '../PropertyChatBot';

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
  const [sessionId] = useState(() => crypto.randomUUID());
  const [pendingVoiceMessage, setPendingVoiceMessage] = useState<string>('');

  const voice = useEnhancedVoiceChat({
    onTranscript: (text) => {
      console.log('Voice transcript:', text);
      setTranscript(text);
      setPendingVoiceMessage(text);
    },
    onAIResponse: (text) => {
      console.log('AI response for voice:', text);
      setAiResponse(text);
      if (voice.voiceMode === 'openai') {
        voice.speak?.(text);
      }
    },
    property,
    useUltravox: false,
    voiceId: 'alloy'
  });

  const handleVoiceMessageSent = () => {
    setPendingVoiceMessage('');
    setTranscript('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl h-[90vh] flex">
        {/* Voice Interface - Left Side */}
        <div className="w-1/2 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 border-r">
          <div className="text-center space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Voice Chat with AI Assistant
            </h2>
            
            <p className="text-gray-600 max-w-md">
              Ask me anything about {property.title}. I can help with property details, 
              scheduling tours, and answering questions.
            </p>

            {/* Enhanced Voice Animation with Soundwave */}
            <div className="flex justify-center my-8">
              <VoiceAnimation 
                isListening={voice.isListening}
                isSpeaking={voice.isSpeaking}
                className="scale-110"
              />
            </div>

            {/* Voice Controls */}
            <VoiceControls
              isListening={voice.isListening}
              isSpeaking={voice.isSpeaking}
              isSupported={voice.isSupported}
              onStartListening={voice.startListening}
              onStopListening={voice.stopListening}
              onOpenVoiceSettings={() => setShowVoicePopup(true)}
            />

            {/* Current transcript display */}
            {transcript && (
              <div className="bg-white p-4 rounded-lg shadow-sm border max-w-md">
                <p className="text-sm text-gray-600 mb-2">You said:</p>
                <p className="text-gray-800">{transcript}</p>
              </div>
            )}

            {/* AI response display */}
            {aiResponse && (
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm border max-w-md">
                <p className="text-sm text-blue-600 mb-2">AI Assistant:</p>
                <p className="text-gray-800">{aiResponse}</p>
              </div>
            )}

            {/* Switch to Chat Button */}
            <Button
              onClick={onSwitchToChat}
              variant="outline"
              className="mt-6"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Switch to Text Chat
            </Button>
          </div>
        </div>

        {/* Chat Interface - Right Side */}
        <div className="w-1/2 flex flex-col">
          <PropertyChatBot
            property={property}
            sessionId={sessionId}
            pendingVoiceMessage={pendingVoiceMessage}
            onVoiceMessageSent={handleVoiceMessageSent}
            onAIResponse={setAiResponse}
          />
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
      </Card>
    </div>
  );
};
