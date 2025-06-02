
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onOpenVoiceSettings: () => void;
}

export const VoiceControls = ({
  isListening,
  isSpeaking,
  isSupported,
  onStartListening,
  onStopListening,
  onOpenVoiceSettings
}: VoiceControlsProps) => {
  if (!isSupported) {
    return (
      <div className="text-center text-sm text-gray-500 p-2">
        Voice synthesis not supported in this browser
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Voice Controls */}
      <div className="flex items-center justify-center gap-4">
        {!isListening && !isSpeaking && (
          <Button
            onClick={onStartListening}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          >
            Start Voice Chat
          </Button>
        )}
        
        {isListening && (
          <Button
            onClick={onStopListening}
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50 px-6 py-3 rounded-full shadow-lg"
          >
            Stop Listening
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onOpenVoiceSettings}
          className="flex items-center gap-2"
        >
          <Settings size={16} />
          Settings
        </Button>
      </div>
    </div>
  );
};
