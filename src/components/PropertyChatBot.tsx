
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessage } from './chat/ChatMessage';
import { ChatLoadingIndicator } from './chat/ChatLoadingIndicator';
import { ChatPrompts } from './chat/ChatPrompts';
import { ChatInput } from './chat/ChatInput';
import { LegalDisclaimer } from './chat/LegalDisclaimer';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  leadScore?: number;
}

interface PropertyChatBotProps {
  property: any;
  sessionId?: string;
}

export const PropertyChatBot = ({ property, sessionId = crypto.randomUUID() }: PropertyChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm the AI assistant for ${property.title}. I have comprehensive knowledge about this property including all legal restrictions, HOA rules, zoning information, and building codes. I can help you understand what you can and cannot do with this home, along with all the amazing features it offers. What would you like to know?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalLeadScore, setTotalLeadScore] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: inputValue,
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
        leadScore: data.leadScore
      };

      setMessages(prev => [...prev, aiResponse]);
      if (data.leadScore) {
        setTotalLeadScore(prev => prev + data.leadScore);
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

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <ChatHeader propertyTitle={property.title} totalLeadScore={totalLeadScore} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <ChatLoadingIndicator />}

        {messages.length === 1 && (
          <ChatPrompts onPromptSelect={setInputValue} />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <LegalDisclaimer />
      <ChatInput 
        value={inputValue}
        onChange={setInputValue}
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};
