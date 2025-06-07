import React, { useState, useEffect, useRef } from 'react';
import { createLead, addChatMessageToLead } from './supabaseClient';

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

  // AI Response Generator using real property data
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    const data = propertyData || {};

    // Price-related questions
    if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
      if (data.price) {
        return `This property is listed at ${data.price}. ${data.marketData?.pricePerSqft ? `That works out to ${data.marketData.pricePerSqft} per square foot, which is ${data.marketData.appreciation ? `great considering the area has seen ${data.marketData.appreciation} appreciation` : 'competitively priced for the area'}.` : ''}`;
      }
      return "Let me get you the latest pricing information. I'd be happy to connect you with the agent for the most current details.";
    }

    // Size/layout questions
    if (message.includes('bedroom') || message.includes('bathroom') || message.includes('size') || message.includes('sqft') || message.includes('square feet')) {
      const features = [];
      if (data.bedrooms) features.push(`${data.bedrooms} bedrooms`);
      if (data.bathrooms) features.push(`${data.bathrooms} bathrooms`);
      if (data.sqft) features.push(`${data.sqft.toLocaleString()} square feet`);
      if (data.lotSize) features.push(`${data.lotSize} lot size`);
      
      if (features.length > 0) {
        return `This ${data.propertyType || 'property'} features ${features.join(', ')}. ${data.yearBuilt ? `Built in ${data.yearBuilt}, ` : ''}it offers ${data.description || 'excellent living space with modern amenities'}.`;
      }
      return "This property offers great living space. I'd be happy to get you more detailed square footage and layout information.";
    }

    // Neighborhood/location questions
    if (message.includes('neighborhood') || message.includes('area') || message.includes('location') || message.includes('walk') || message.includes('walkable')) {
      const neighborhoodInfo = [];
      if (data.neighborhood?.walkScore) {
        neighborhoodInfo.push(`Walk Score of ${data.neighborhood.walkScore}/100`);
      }
      if (data.neighborhood?.transitScore) {
        neighborhoodInfo.push(`Transit Score of ${data.neighborhood.transitScore}/100`);
      }
      if (data.neighborhood?.amenities?.length > 0) {
        neighborhoodInfo.push(`nearby amenities including ${data.neighborhood.amenities.slice(0, 3).join(', ')}`);
      }
      
      if (neighborhoodInfo.length > 0) {
        return `This is a great neighborhood with ${neighborhoodInfo.join(', ')}. The location offers excellent convenience for daily activities.`;
      }
      return "This property is located in a desirable neighborhood with great amenities and walkability. I can provide more specific details about the area.";
    }

    // School questions
    if (message.includes('school') || message.includes('education') || message.includes('kids') || message.includes('children')) {
      if (data.neighborhood?.schools) {
        const schools = data.neighborhood.schools;
        const schoolInfo = [];
        if (schools.elementary) schoolInfo.push(`Elementary: ${schools.elementary}`);
        if (schools.middle) schoolInfo.push(`Middle: ${schools.middle}`);
        if (schools.high) schoolInfo.push(`High: ${schools.high}`);
        
        if (schoolInfo.length > 0) {
          return `The schools in this area are excellent! ${schoolInfo.join(', ')}. These are all highly-rated schools that families love.`;
        }
      }
      return "This area has access to quality schools. I can get you detailed information about the school district and ratings.";
    }

    // Investment/market questions
    if (message.includes('investment') || message.includes('appreciation') || message.includes('market') || message.includes('value')) {
      if (data.marketData) {
        const marketInfo = [];
        if (data.marketData.appreciation) marketInfo.push(`${data.marketData.appreciation} appreciation`);
        if (data.marketData.daysOnMarket) marketInfo.push(`properties typically sell in ${data.marketData.daysOnMarket} days`);
        if (data.marketData.comparables) marketInfo.push(`comparable homes range ${data.marketData.comparables}`);
        
        if (marketInfo.length > 0) {
          return `This is a solid investment opportunity with ${marketInfo.join(', ')}. The market fundamentals in this area are strong.`;
        }
      }
      return "This property is in a market with strong fundamentals. I can provide detailed market analysis and investment potential information.";
    }

    // Photos/virtual tour
    if (message.includes('photo') || message.includes('picture') || message.includes('see') || message.includes('tour') || message.includes('virtual')) {
      if (data.photos && data.photos.length > 0) {
        return `I have ${data.photos.length} high-quality photos of this property! You can view them in the gallery above. Would you like to schedule a virtual or in-person tour?`;
      }
      return "I can arrange for you to see detailed photos and even schedule a virtual or in-person tour. Would you like me to set that up?";
    }

    // Schedule showing
    if (message.includes('showing') || message.includes('visit') || message.includes('schedule') || message.includes('appointment')) {
      return "I'd love to help you schedule a showing! This property is definitely worth seeing in person. Could I get your contact information so our agent can reach out to arrange a convenient time?";
    }

    // Contact/agent questions
    if (message.includes('agent') || message.includes('realtor') || message.includes('contact') || message.includes('call') || message.includes('email')) {
      return "Our experienced agent would be happy to help you with this property! If you provide your contact information, they can reach out with any additional details and to schedule a showing.";
    }

    // Mortgage/financing
    if (message.includes('mortgage') || message.includes('loan') || message.includes('financing') || message.includes('payment') || message.includes('monthly')) {
      const price = data.price ? data.price.replace(/[^0-9]/g, '') : null;
      if (price) {
        const monthlyEstimate = Math.round((parseInt(price) * 0.005)); // Rough 5% monthly estimate
        return `For a home priced at ${data.price}, monthly payments typically range around $${monthlyEstimate.toLocaleString()} depending on your down payment and interest rate. I can connect you with our preferred lenders for exact pre-qualification!`;
      }
      return "Our team can help you explore financing options and connect you with trusted mortgage professionals for pre-qualification. What's your timeline for purchasing?";
    }

    // General interest/buying questions
    if (message.includes('interested') || message.includes('buy') || message.includes('purchase') || message.includes('offer')) {
      return "That's wonderful! This is a fantastic property and I'd love to help you move forward. Could I get your contact information so our agent can provide personalized assistance and answer any detailed questions?";
    }

    // Property features and outdoor space questions
    if (message.includes('backyard') || message.includes('yard') || message.includes('outdoor') || message.includes('patio') || message.includes('deck') || message.includes('garden')) {
      if (data.lotSize) {
        return `This property features a ${data.lotSize} lot with excellent outdoor space potential! ${data.description?.includes('backyard') || data.description?.includes('yard') ? data.description : 'The outdoor area offers great possibilities for entertainment, gardening, and relaxation. Perfect for families or anyone who loves outdoor living!'} Would you like to schedule a showing to see the outdoor space in person?`;
      }
      return "This property has great outdoor potential! I'd love to arrange for you to see the yard and outdoor spaces during a showing. The outdoor area is definitely worth seeing in person!";
    }

    // Garage/parking questions
    if (message.includes('garage') || message.includes('parking') || message.includes('car') || message.includes('driveway')) {
      return "Great question about parking! This property includes parking accommodations. I can get you specific details about garage space and parking options. Would you like me to have our agent provide the complete parking and storage information?";
    }

    // Kitchen/interior features
    if (message.includes('kitchen') || message.includes('appliances') || message.includes('updated') || message.includes('renovated')) {
      return `This ${data.propertyType || 'property'} ${data.yearBuilt ? `built in ${data.yearBuilt}` : ''} features ${data.description?.includes('updated') || data.description?.includes('modern') ? 'updated interior features with modern amenities' : 'well-maintained interior spaces'}. The kitchen and living areas offer excellent functionality for daily living. Would you like to schedule a tour to see all the interior features?`;
    }

    // Default responses for unclear questions
    const defaultResponses = [
      `Great question about ${data.address || 'this property'}! I have detailed information that can help you. Could you be more specific about what you'd like to know?`,
      `I'd be happy to help you learn more about this ${data.propertyType || 'property'}! What specific aspects are most important to you - location, pricing, features, or something else?`,
      `This property has so many great features! Would you like to know about the neighborhood, the home's specifications, pricing, or scheduling a showing?`,
      "I'm here to help with any questions about this property! What would be most helpful - details about the home, area information, or connecting with our agent?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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

    // Save to lead if we have one
    if (leadId) {
      try {
        await addChatMessageToLead(leadId, {
          type: 'user',
          content: userMessage.content
        });
      } catch (error) {
        console.error('Error saving user message:', error);
      }
    }

    // Generate AI response
    setTimeout(async () => {
      const aiResponse = generateAIResponse(userMessage.content);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Save AI response to lead
      if (leadId) {
        try {
          await addChatMessageToLead(leadId, {
            type: 'bot',
            content: botMessage.content
          });
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
      const newLead = await createLead({
        listingId: listingId,
        realtorId: null, // TODO: Get from listing or auth
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        source: 'chat',
        chatMessages: messages,
        timeSpent: Math.floor(Date.now() / 1000), // Rough estimate
        leadScore: 25 // Base score for providing contact info
      });

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