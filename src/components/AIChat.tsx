
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageSquare, Mic, MicOff, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIChat = ({ isOpen, onClose, property }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm the voice of ${property.title}. I can tell you everything about my stunning features, the neighborhood, pricing, and answer any questions you might have. Would you like to chat with me or speak directly?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const startVoiceChat = async () => {
    try {
      setIsListening(true);
      setIsConnected(true);
      // TODO: Initialize Ultravox SDK
      console.log('Starting Ultravox voice chat...');
      // This would connect to Ultravox API
    } catch (error) {
      console.error('Failed to start voice chat:', error);
      setIsListening(false);
      setIsConnected(false);
    }
  };

  const stopVoiceChat = () => {
    setIsListening(false);
    setIsConnected(false);
    // TODO: Disconnect from Ultravox
    console.log('Stopping voice chat...');
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return `I'm priced at ${property.price}, which reflects my premium location in Beverly Hills and exceptional features like the infinity pool and smart home system. The value includes my architectural significance and prime location. Would you like to discuss financing options?`;
    }
    
    if (lowerInput.includes('kitchen') || lowerInput.includes('cook')) {
      return "My gourmet kitchen is a chef's dream! I feature Italian marble countertops, top-of-the-line appliances, and a spacious island perfect for entertaining. The open layout flows seamlessly into the living areas. Would you like to know about my other luxury amenities?";
    }
    
    if (lowerInput.includes('pool') || lowerInput.includes('outdoor')) {
      return "My backyard is absolutely stunning! I have a resort-style infinity pool with spa, perfect for relaxation and entertaining. The outdoor space spans 0.75 acres with professionally designed landscaping. It's like having a private resort at home!";
    }
    
    if (lowerInput.includes('neighborhood') || lowerInput.includes('area')) {
      return "I'm located in the prestigious Beverly Hills area, known for its luxury shopping, fine dining, and celebrity residents. The schools are top-rated, and you're minutes from Rodeo Drive and the best of Los Angeles. It's the perfect blend of exclusivity and convenience.";
    }
    
    return "That's a great question! I'd love to share more details about my luxury features, prime location, or schedule a private tour. My agent can provide detailed information about financing, comparable sales, and the local market. What specific aspect interests you most?";
  };

  const quickPrompts = [
    "Tell me about the kitchen",
    "What's the neighborhood like?",
    "Show me the pool area",
    "Schedule a tour"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full bg-black">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 safe-area-top">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
              <MessageSquare size={20} className="text-black" />
            </div>
            <div>
              <h3 className="font-medium">Talk with Home</h3>
              <p className="text-sm text-gray-400">
                {isConnected ? 'Voice connected' : 'AI Assistant'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Voice Controls */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={isListening ? stopVoiceChat : startVoiceChat}
              className={`flex-1 py-4 rounded-xl transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : 'bg-amber-400 hover:bg-amber-500 text-black'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              <span className="ml-2">
                {isListening ? 'Stop Voice Chat' : 'Start Voice Chat'}
              </span>
            </Button>
            {isConnected && (
              <Button variant="outline" size="icon" className="border-gray-700">
                <Volume2 size={20} />
              </Button>
            )}
          </div>
          {isConnected && (
            <p className="text-center text-sm text-amber-400 mt-2">
              Powered by Ultravox • Speak naturally
            </p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 h-[calc(100vh-240px)] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[85%] p-3 ${
                message.sender === 'user'
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-900 border-gray-800'
              }`}>
                <p className="text-sm">{message.text}</p>
              </Card>
            </div>
          ))}
          
          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-400 px-2">Quick questions:</p>
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue(prompt)}
                  className="w-full justify-start text-left bg-gray-900 border-gray-700 hover:bg-gray-800"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Text Input */}
        <div className="border-t border-gray-800 p-4 safe-area-bottom">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="bg-gray-900 border-gray-700 rounded-xl"
            />
            <Button 
              onClick={sendMessage} 
              size="icon" 
              className="bg-amber-400 hover:bg-amber-500 text-black rounded-xl"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
