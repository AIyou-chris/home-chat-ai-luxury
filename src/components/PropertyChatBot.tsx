
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

  const generalPrompts = [
    "Tell me about the neighborhood",
    "What are the best features?",
    "Can I schedule a tour?",
    "What's the price range?",
    "Tell me about schools nearby",
    "What's included in the sale?"
  ];

  const restraintPrompts = [
    "What are the HOA rules and fees?",
    "Can I renovate or add onto this home?",
    "What are the zoning restrictions?",
    "Are there any deed restrictions?",
    "What permits would I need for changes?",
    "Are there environmental considerations?"
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Property AI Assistant</h3>
            <p className="text-sm text-gray-500">Expert on features, restrictions & regulations</p>
          </div>
        </div>
        {totalLeadScore > 0 && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Sparkles size={12} className="mr-1" />
            Interest Score: {totalLeadScore}
          </Badge>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' ? 'bg-orange-500' : 'bg-blue-500'
              }`}>
                {message.sender === 'user' ? 
                  <User size={16} className="text-white" /> : 
                  <Bot size={16} className="text-white" />
                }
              </div>
              <Card className={`p-3 ${
                message.sender === 'user'
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white border-gray-200'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                {message.leadScore && message.leadScore > 0 && (
                  <Badge variant="outline" className="mt-2 text-xs bg-green-50 border-green-200">
                    +{message.leadScore} interest points
                  </Badge>
                )}
              </Card>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex space-x-2 max-w-[80%]">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <Card className="p-3 bg-white border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-gray-500 px-2">General questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {generalPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(prompt)}
                    className="justify-start text-left bg-white border-gray-200 hover:bg-gray-50 text-gray-700 h-auto py-2 px-3"
                  >
                    <span className="text-xs">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 px-2">
                <AlertTriangle size={14} className="text-amber-500" />
                <p className="text-xs text-amber-700 font-medium">Legal & regulatory questions:</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {restraintPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(prompt)}
                    className="justify-start text-left bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-800 h-auto py-2 px-3"
                  >
                    <span className="text-xs">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Legal Disclaimer */}
      <div className="bg-amber-50 border-t border-amber-200 px-4 py-2">
        <div className="flex items-start space-x-2">
          <AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            <strong>Legal Disclaimer:</strong> Property restrictions and regulations can change. 
            Always verify information with real estate attorneys, title companies, and local planning departments before making decisions.
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about features, restrictions, HOA rules, zoning..."
            className="flex-1 border-gray-300 focus:border-blue-500"
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage} 
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by AI • Expert knowledge on property restrictions & regulations
        </p>
      </div>
    </div>
  );
};
