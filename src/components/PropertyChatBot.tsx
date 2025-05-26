
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessage } from './chat/ChatMessage';
import { ChatLoadingIndicator } from './chat/ChatLoadingIndicator';
import { ChatPrompts } from './chat/ChatPrompts';
import { ChatInput } from './chat/ChatInput';
import { LegalDisclaimer } from './chat/LegalDisclaimer';
import { ChatAppointmentIntegration } from './chat/ChatAppointmentIntegration';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  leadScore?: number;
  triggerAppointment?: boolean;
}

interface PropertyChatBotProps {
  property: any;
  sessionId?: string;
  pendingVoiceMessage?: string;
  onVoiceMessageSent?: () => void;
  onAIResponse?: (text: string) => void;
}

export const PropertyChatBot = ({ 
  property, 
  sessionId = crypto.randomUUID(),
  pendingVoiceMessage,
  onVoiceMessageSent,
  onAIResponse
}: PropertyChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm the AI assistant for ${property.title}. I have comprehensive knowledge about this property including all legal restrictions, HOA rules, zoning information, and building codes. I can help you understand what you can and cannot do with this home, schedule showings, and answer all your questions. What would you like to know?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalLeadScore, setTotalLeadScore] = useState(0);
  const [showAppointmentWidget, setShowAppointmentWidget] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle voice message input
  useEffect(() => {
    if (pendingVoiceMessage) {
      setInputValue(pendingVoiceMessage);
    }
  }, [pendingVoiceMessage]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Clear voice message if it was sent
    if (pendingVoiceMessage && onVoiceMessageSent) {
      onVoiceMessageSent();
    }
    
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: textToSend,
          propertyId: property.id,
          sessionId: sessionId
        }
      });

      if (error) throw error;

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date(),
        leadScore: data.leadScore,
        triggerAppointment: data.triggerAppointment
      };

      setMessages(prev => [...prev, aiResponse]);
      
      if (data.leadScore) {
        setTotalLeadScore(prev => prev + data.leadScore);
      }

      // Show appointment widget if AI triggers it
      if (data.triggerAppointment) {
        setShowAppointmentWidget(true);
      }

      // Trigger voice response callback
      if (onAIResponse) {
        onAIResponse(data.response);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again or contact our agent directly.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppointmentSuccess = () => {
    setShowAppointmentWidget(false);
    const successMessage: Message = {
      id: Date.now().toString(),
      text: "Great! I've helped you schedule your appointment. You should receive a confirmation email shortly with all the details. Is there anything else you'd like to know about the property?",
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, successMessage]);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <ChatHeader propertyTitle={property.title} totalLeadScore={totalLeadScore} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <ChatLoadingIndicator />}

        {showAppointmentWidget && (
          <ChatAppointmentIntegration 
            property={property}
            onScheduleSuccess={handleAppointmentSuccess}
          />
        )}

        {messages.length === 1 && (
          <ChatPrompts onPromptSelect={setInputValue} />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <LegalDisclaimer />
      <ChatInput 
        value={inputValue}
        onChange={setInputValue}
        onSend={() => sendMessage()}
        isLoading={isLoading}
        voiceMessage={pendingVoiceMessage}
        onSendVoiceMessage={() => sendMessage(pendingVoiceMessage)}
      />
    </div>
  );
};
