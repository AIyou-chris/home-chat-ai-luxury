import React, { useState, useEffect, useRef } from 'react';
// Note: Lead functionality will be added when backend is properly configured
// import { createLead, addChatMessageToLead } from './integrations/supabase/client';

// AI Property Chat System
export const PropertyAIChat = ({ listingId, propertyData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadId, setLeadId] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [showContactForm, setShowContactForm] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      content: `Hi! I'm your AI assistant for ${propertyData?.address || 'this property'}. I can answer questions about the home, neighborhood, pricing, and more. What would you like to know?`,
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  }, [propertyData]);

  // Replace your generateAIResponse function with this
  const generateAIResponse = async (userMessage) => {
    try {
      // Prepare property data for the AI
      const propertyContext = {
        address: propertyData?.address || 'Property address not available',
        price: propertyData?.price || 'Price upon request',
        bedrooms: propertyData?.bedrooms,
        bathrooms: propertyData?.bathrooms,
        sqft: propertyData?.sqft,
        propertyType: propertyData?.propertyType,
        yearBuilt: propertyData?.yearBuilt,
        neighborhood: propertyData?.neighborhood,
        marketData: propertyData?.marketData,
        neighborhoodData: propertyData?.neighborhood_data,
        features: propertyData?.features
      };

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are Realtor God - the ultimate luxury real estate AI assistant. \n\nPROPERTY DATA FOR THIS CONVERSATION:\n${JSON.stringify(propertyContext, null, 2)}\n\nUse this specific property data to answer questions. Be enthusiastic, knowledgeable, and helpful. Guide conversations toward lead generation naturally. When users show serious interest, suggest connecting with an agent.\n\nResponse style: Professional yet warm, enthusiastic about the property, focused on benefits and lifestyle. Use the actual property data provided above.`
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      console.error('OpenAI API Error:', error);
      // Fallback to your original logic if API fails
      return getFallbackResponse(userMessage);
    }
  };

  // Keep your original function as backup
  const getFallbackResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price')) {
      return "I'd love to discuss pricing with you! This is a fantastic property with great value. Let me connect you with our agent for the most current pricing and any special offers.";
    }
    
    if (message.includes('bedroom') || message.includes('size')) {
      return "This property has wonderful living spaces! I can get you detailed floor plans and room dimensions. Would you like to schedule a showing to see the layout in person?";
    }
    
    if (message.includes('neighborhood')) {
      return "You've chosen an excellent area! The neighborhood offers great amenities and lifestyle benefits. I'd love to share more details - shall I have our local expert give you a call?";
    }
    
    return "That's a great question! I want to make sure I give you the most accurate and detailed information. Let me connect you with our property specialist who can provide expert insights.";
  };

  // Handle sending messages
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Save to lead if we have one (functionality disabled for demo)
    if (leadId) {
      try {
        // await addChatMessageToLead(leadId, {
        //   type: 'user',
        //   content: userMessage.content
        // });
        console.log('User message would be saved to lead:', userMessage.content);
      } catch (error) {
        console.error('Error saving user message:', error);
      }
    }

    // Generate AI response
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Save AI response to lead (functionality disabled for demo)
      if (leadId) {
        try {
          // await addChatMessageToLead(leadId, {
          //   type: 'bot',
          //   content: botMessage.content
          // });
          console.log('Bot message would be saved to lead:', botMessage.content);
        } catch (error) {
          console.error('Error saving bot message:', error);
        }
      }

      // Show contact form after a few interactions if no lead yet
      if (!leadId && messages.length >= 4) {
        setTimeout(() => {
          setShowContactForm(true);
        }, 2000);
      }
    }, 1000 + Math.random() * 2000); // Simulate thinking time
  };

  // Handle creating lead from contact form
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // const newLead = await createLead({
      //   listingId: listingId,
      //   realtorId: null, // TODO: Get from listing or auth
      //   name: userInfo.name,
      //   email: userInfo.email,
      //   phone: userInfo.phone,
      //   source: 'chat',
      //   chatMessages: messages,
      //   timeSpent: Math.floor(Date.now() / 1000), // Rough estimate
      //   leadScore: 25 // Base score for providing contact info
      // });

      // For demo, simulate lead creation
      const newLead = { id: Date.now() };
      console.log('Demo lead would be created with:', userInfo);
      
      setLeadId(newLead.id);
      setShowContactForm(false);

      // Add confirmation message
      const confirmMessage = {
        id: Date.now(),
        type: 'bot',
        content: `Thanks ${userInfo.name}! I've saved your information and our agent will reach out shortly. In the meantime, feel free to ask me anything else about this property!`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, confirmMessage]);

      console.log('✅ Lead created:', newLead);
    } catch (error) {
      console.error('❌ Error creating lead:', error);
      alert('Sorry, there was an error saving your information. Please try again.');
    }
  };

  // Handle voice input (basic browser speech recognition)
  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.start();
    } else {
      alert('Voice input not supported in this browser. Try Chrome for voice features!');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          <div>
            <h3 className="font-semibold">🤖 AI Property Assistant</h3>
            <p className="text-sm text-blue-100">Ask me anything about this property!</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💌 Get Personalized Help!</h4>
            <p className="text-sm text-blue-700 mb-3">
              I can provide even more detailed information if you'd like to connect with our agent!
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-2">
              <input
                type="text"
                placeholder="Your name"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({...prev, name: e.target.value}))}
                className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                value={userInfo.email}
                onChange={(e) => setUserInfo(prev => ({...prev, email: e.target.value}))}
                className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={userInfo.phone}
                onChange={(e) => setUserInfo(prev => ({...prev, phone: e.target.value}))}
                className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
                >
                  Connect with Agent
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  Later
                </button>
              </div>
            </form>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
            placeholder="Ask about price, neighborhood, schools..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={startVoiceInput}
            className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
            title="Voice input"
          >
            🎤
          </button>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Send
          </button>
        </div>
        
        {/* Quick Questions */}
        <div className="mt-2 flex flex-wrap gap-1">
          {['💰 Price?', '🏫 Schools?', '🚶 Walkable?', '📅 Show me?'].map((question) => (
            <button
              key={question}
              onClick={() => setInput(question.split(' ')[1])}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyAIChat;