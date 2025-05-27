
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, UserCheck, Mic, X } from 'lucide-react';
import { CircularVoiceAnimation } from './CircularVoiceAnimation';

interface VoiceSelectionPopupProps {
  isOpen: boolean;
  onVoiceSelect: (voiceId: string, voiceName: string) => void;
  onClose: () => void;
}

export const VoiceSelectionPopup = ({ isOpen, onVoiceSelect, onClose }: VoiceSelectionPopupProps) => {
  const [customVoiceId, setCustomVoiceId] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isOpen) return null;

  const handleVoiceSelect = (voiceId: string, voiceName: string) => {
    onVoiceSelect(voiceId, voiceName);
    onClose();
  };

  const handleCustomVoiceSubmit = () => {
    if (customVoiceId.trim()) {
      handleVoiceSelect(customVoiceId.trim(), 'Your Voice');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl animate-scale-in">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Choose Your Voice</h3>
              <p className="text-sm text-gray-500 mt-1">Select how you'd like the AI to sound</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </Button>
          </div>

          {/* Circular Animation */}
          <div className="flex justify-center mb-8">
            <CircularVoiceAnimation isActive={true} />
          </div>

          {/* Voice Options */}
          <div className="space-y-3 mb-6">
            {/* Mary - Female Voice */}
            <Button
              onClick={() => handleVoiceSelect('b0e6b5c1-3100-44d5-8578-9015aa3023ae', 'Mary')}
              className="w-full p-4 h-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Mary</div>
                  <div className="text-sm opacity-90">Professional Female Voice</div>
                </div>
              </div>
            </Button>

            {/* Tom - Male Voice */}
            <Button
              onClick={() => handleVoiceSelect('91fa9bcf-93c8-467c-8b29-973720e3f167', 'Tom')}
              className="w-full p-4 h-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <UserCheck size={24} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Tom</div>
                  <div className="text-sm opacity-90">Professional Male Voice</div>
                </div>
              </div>
            </Button>

            {/* Own Voice */}
            <Button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="w-full p-4 h-auto bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mic size={24} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Your Voice</div>
                  <div className="text-sm opacity-90">Use Your Cloned Voice</div>
                </div>
              </div>
            </Button>
          </div>

          {/* Custom Voice Input */}
          {showCustomInput && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3 animate-fade-in">
              <label className="text-sm font-medium text-gray-700">
                Enter your Ultravox voice ID:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customVoiceId}
                  onChange={(e) => setCustomVoiceId(e.target.value)}
                  placeholder="e.g., your-custom-voice-id"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button
                  size="sm"
                  onClick={handleCustomVoiceSubmit}
                  disabled={!customVoiceId.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Use Voice
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Enter your Ultravox cloned voice ID to use your own voice.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Powered by Ultravox AI • High-quality voice synthesis
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
