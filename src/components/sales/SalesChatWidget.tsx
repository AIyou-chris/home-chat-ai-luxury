
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { useEnhancedVoice } from '@/hooks/useEnhancedVoice';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const SalesChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you learn about our AI-powered listing solutions. What questions do you have about transforming your real estate business?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { speak, isSpeaking } = useEnhancedVoice({
    onSpeakStart: () => console.log('AI started speaking'),
    onSpeakEnd: () => console.log('AI finished speaking'),
    onError: (error) => console.error('Voice error:', error)
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setIsLoading(true);

    // Simulate AI response (in production, this would call your sales knowledge base)
    setTimeout(() => {
      const responses = [
        "Our AI system typically increases lead capture by 300% within the first month. Would you like to see a live demo?",
        "Great question! Our pricing starts at $39/month for the Starter plan with a 15-day money back guarantee. Which features are most important to you?",
        "Setup takes just 5 minutes. We handle all the technical details - you just provide your listing information. Want me to walk you through the process?",
        "Yes, we integrate with all major CRMs and calendar systems. The AI can automatically schedule appointments in your existing calendar. Would you like to see how this works?",
        "Our AI handles both voice and text conversations 24/7. It knows everything about your properties and can answer detailed questions. Would you like to try our live demo?"
      ];

      const responseText = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Speak the AI response
      speak(responseText);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Sales Assistant</h3>
          <p className="text-orange-100 text-sm">Ask about our AI solutions</p>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-orange-600 h-8 w-8 p-0"
        >
          <X size={16} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
              {message.sender === 'ai' && isSpeaking && (
                <div className="mt-2 text-xs opacity-70">🔊 Speaking...</div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about pricing, features, setup..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleVoiceInput}
            disabled={isLoading}
            size="sm"
            variant="outline"
            className={`px-3 ${isListening ? 'bg-red-100 border-red-300' : ''}`}
          >
            {isListening ? <MicOff size={16} className="text-red-600" /> : <Mic size={16} />}
          </Button>
          <Button
            onClick={() => sendMessage()}
            disabled={isLoading || !inputValue.trim()}
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 px-3"
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Voice enabled • Click mic to speak or type your questions
        </p>
      </div>
    </div>
  );
};
