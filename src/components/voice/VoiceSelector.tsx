
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, UserCheck, Mic } from 'lucide-react';
import { useState } from 'react';

interface VoiceSelectorProps {
  selectedVoice: string;
  onVoiceChange: (voiceId: string) => void;
  customVoiceId?: string;
  onCustomVoiceSubmit?: (voiceId: string) => void;
}

export const VoiceSelector = ({ 
  selectedVoice, 
  onVoiceChange, 
  customVoiceId,
  onCustomVoiceSubmit 
}: VoiceSelectorProps) => {
  const [customInput, setCustomInput] = useState(customVoiceId || '');

  const voiceOptions = [
    {
      id: 'b0e6b5c1-3100-44d5-8578-9015aa3023ae',
      name: 'Female Voice',
      description: 'Professional female voice',
      icon: <User size={20} />
    },
    {
      id: '91fa9bcf-93c8-467c-8b29-973720e3f167',
      name: 'Male Voice',
      description: 'Professional male voice',
      icon: <UserCheck size={20} />
    },
    {
      id: 'custom',
      name: 'Own Voice',
      description: 'Use your cloned voice',
      icon: <Mic size={20} />
    }
  ];

  const handleCustomVoiceSubmit = () => {
    if (customInput.trim() && onCustomVoiceSubmit) {
      onCustomVoiceSubmit(customInput.trim());
      onVoiceChange(customInput.trim());
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Mic size={16} />
          Voice Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedVoice} onValueChange={onVoiceChange}>
          {voiceOptions.map((voice) => (
            <div key={voice.id} className="flex items-center space-x-3">
              <RadioGroupItem value={voice.id === 'custom' ? customVoiceId || 'custom' : voice.id} id={voice.id} />
              <label 
                htmlFor={voice.id} 
                className="flex-1 flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="text-orange-600">
                  {voice.icon}
                </div>
                <div>
                  <div className="font-medium text-sm">{voice.name}</div>
                  <div className="text-xs text-gray-500">{voice.description}</div>
                </div>
              </label>
            </div>
          ))}
        </RadioGroup>

        {/* Custom Voice Input */}
        {(selectedVoice === 'custom' || selectedVoice === customVoiceId) && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg space-y-3">
            <label className="text-xs font-medium text-gray-700">
              Enter your Ultravox voice ID:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g., your-custom-voice-id"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Button
                size="sm"
                onClick={handleCustomVoiceSubmit}
                disabled={!customInput.trim()}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Enter your Ultravox cloned voice ID to use your own voice.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
