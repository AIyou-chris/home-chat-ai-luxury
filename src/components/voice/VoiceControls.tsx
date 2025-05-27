
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useState } from 'react';

interface VoiceControlsProps {
  isSupported: boolean;
  isSpeaking: boolean;
  availableVoices: Array<{ id: string; name: string; description: string; }>;
  settings: {
    selectedVoice?: string;
    voice?: { id: string; name: string; };
  };
  onSettingsChange: (settings: any) => void;
  onStop: () => void;
  onTestVoice: () => void;
}

export const VoiceControls = ({
  isSupported,
  isSpeaking,
  availableVoices,
  settings,
  onSettingsChange,
  onStop,
  onTestVoice
}: VoiceControlsProps) => {
  const [showSettings, setShowSettings] = useState(false);

  if (!isSupported) {
    return (
      <div className="text-center text-sm text-gray-500 p-2">
        Voice synthesis not supported in this browser
      </div>
    );
  }

  const currentVoiceId = settings.selectedVoice || settings.voice?.id || 'alloy';

  return (
    <div className="space-y-3">
      {/* Quick Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1"
          >
            <Settings size={14} />
            Voice Settings
          </Button>
          
          {isSpeaking && (
            <Button
              variant="outline"
              size="sm"
              onClick={onStop}
              className="flex items-center gap-1 text-red-600 border-red-200"
            >
              <VolumeX size={14} />
              Stop
            </Button>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onTestVoice}
          disabled={isSpeaking}
          className="flex items-center gap-1"
        >
          <Volume2 size={14} />
          Test Voice
        </Button>
      </div>

      {/* Advanced Settings */}
      {showSettings && (
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">OpenAI Voice Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Voice Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Voice</label>
              <Select
                value={currentVoiceId}
                onValueChange={(voiceId) => {
                  const voice = availableVoices.find(v => v.id === voiceId);
                  onSettingsChange({ voice: voice || { id: voiceId } });
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id} className="text-xs">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{voice.name}</span>
                        <span className="text-xs text-gray-500">{voice.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
              <strong>Note:</strong> OpenAI voices have optimized speed and pitch settings built-in for natural conversation.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
