
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useState } from 'react';

interface VoiceControlsProps {
  isSupported: boolean;
  isSpeaking: boolean;
  availableVoices: SpeechSynthesisVoice[];
  settings: {
    rate: number;
    pitch: number;
    volume: number;
    voice: SpeechSynthesisVoice | null;
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

  const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en'));

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
            <CardTitle className="text-sm font-medium">Voice Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Voice Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Voice</label>
              <Select
                value={settings.voice?.name || ''}
                onValueChange={(voiceName) => {
                  const voice = availableVoices.find(v => v.name === voiceName);
                  onSettingsChange({ voice });
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {englishVoices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name} className="text-xs">
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-700">Speed</label>
                <span className="text-xs text-gray-500">{settings.rate.toFixed(1)}x</span>
              </div>
              <Slider
                value={[settings.rate]}
                onValueChange={(value) => onSettingsChange({ rate: value[0] })}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Pitch Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-700">Pitch</label>
                <span className="text-xs text-gray-500">{settings.pitch.toFixed(1)}</span>
              </div>
              <Slider
                value={[settings.pitch]}
                onValueChange={(value) => onSettingsChange({ pitch: value[0] })}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-700">Volume</label>
                <span className="text-xs text-gray-500">{Math.round(settings.volume * 100)}%</span>
              </div>
              <Slider
                value={[settings.volume]}
                onValueChange={(value) => onSettingsChange({ volume: value[0] })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
