
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Users, MessageSquare, Smartphone } from 'lucide-react';

export const CostEstimator = () => {
  const estimationData = {
    visitors: 100,
    voiceInteractions: 25, // 25% of visitors use voice
    smsNotifications: 15, // 15% request SMS updates
    chatMessages: 150, // Average 1.5 messages per visitor
    
    costs: {
      openaiTTS: 0.015, // per 1000 characters
      openaiChat: 0.002, // per 1000 tokens
      sms: 0.0075, // per SMS
      hosting: 2.00, // base hosting per listing
    }
  };

  const calculateCost = () => {
    const avgVoiceChars = 200; // average characters per voice response
    const avgChatTokens = 150; // average tokens per chat message
    
    const voiceCost = (estimationData.voiceInteractions * avgVoiceChars / 1000) * estimationData.costs.openaiTTS;
    const chatCost = (estimationData.chatMessages * avgChatTokens / 1000) * estimationData.costs.openaiChat;
    const smsCost = estimationData.smsNotifications * estimationData.costs.sms;
    const hostingCost = estimationData.costs.hosting;
    
    const totalCost = voiceCost + chatCost + smsCost + hostingCost;
    
    return {
      voice: voiceCost,
      chat: chatCost,
      sms: smsCost,
      hosting: hostingCost,
      total: totalCost
    };
  };

  const costs = calculateCost();

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="text-blue-600" size={24} />
        <h3 className="text-xl font-semibold text-blue-800">Cost Per Listing Estimate</h3>
        <Badge className="bg-blue-100 text-blue-700">100 Visitors</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800 mb-3">Usage Breakdown</h4>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="text-green-500" size={18} />
              <span className="text-sm">Total Visitors</span>
            </div>
            <span className="font-medium">{estimationData.visitors}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="text-purple-500" size={18} />
              <span className="text-sm">Voice Interactions</span>
            </div>
            <span className="font-medium">{estimationData.voiceInteractions}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="text-orange-500" size={18} />
              <span className="text-sm">SMS Notifications</span>
            </div>
            <span className="font-medium">{estimationData.smsNotifications}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="text-blue-500" size={18} />
              <span className="text-sm">Chat Messages</span>
            </div>
            <span className="font-medium">{estimationData.chatMessages}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800 mb-3">Cost Breakdown</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Voice AI (TTS)</span>
              <span className="font-medium">${costs.voice.toFixed(3)}</span>
            </div>
            
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Chat AI</span>
              <span className="font-medium">${costs.chat.toFixed(3)}</span>
            </div>
            
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">SMS Notifications</span>
              <span className="font-medium">${costs.sms.toFixed(3)}</span>
            </div>
            
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Hosting & Infrastructure</span>
              <span className="font-medium">${costs.hosting.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold">
              <span>Total Cost Per Listing</span>
              <span>${costs.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
        <h5 className="font-medium text-gray-800 mb-2">Cost Optimization Notes</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Voice interactions are the primary cost driver due to TTS processing</li>
          <li>• SMS costs scale linearly with notification volume</li>
          <li>• Chat AI costs are minimal due to efficient token usage</li>
          <li>• Bulk pricing available for 10+ simultaneous listings</li>
        </ul>
      </div>
    </Card>
  );
};
