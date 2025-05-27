
import { useState } from 'react';
import { VoiceConversationInterface } from './voice/VoiceConversationInterface';
import { ChatInterface } from './voice/ChatInterface';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export const AIChat = ({ isOpen, onClose, property }: AIChatProps) => {
  const [currentInterface, setCurrentInterface] = useState<'voice' | 'chat'>('chat');

  const handleSwitchToChat = () => {
    setCurrentInterface('chat');
  };

  const handleSwitchToVoice = () => {
    setCurrentInterface('voice');
  };

  if (!isOpen) return null;

  return (
    <>
      {currentInterface === 'voice' ? (
        <VoiceConversationInterface
          property={property}
          onSwitchToChat={handleSwitchToChat}
          onClose={onClose}
          isOpen={isOpen}
        />
      ) : (
        <ChatInterface
          property={property}
          onSwitchToVoice={handleSwitchToVoice}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  );
};
