
import { useEffect, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceAnimationProps {
  isListening: boolean;
  isSpeaking: boolean;
  className?: string;
}

export const VoiceAnimation = ({ isListening, isSpeaking, className = '' }: VoiceAnimationProps) => {
  const [bars, setBars] = useState<number[]>([]);

  // Generate random heights for waveform bars
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setBars(Array.from({ length: 5 }, () => Math.random() * 100 + 20));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setBars([]);
    }
  }, [isSpeaking]);

  if (!isListening && !isSpeaking) return null;

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {isListening && (
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Mic size={20} className="text-red-500" />
            <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-full border border-red-300 animate-pulse" />
          </div>
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-red-500 rounded-full animate-pulse"
                style={{
                  height: '20px',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.8s'
                }}
              />
            ))}
          </div>
          <span className="text-sm text-red-600 font-medium animate-pulse">Listening...</span>
        </div>
      )}

      {isSpeaking && (
        <div className="flex items-center space-x-3">
          <Volume2 size={20} className="text-blue-500" />
          <div className="flex items-end space-x-1 h-6">
            {bars.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-blue-500 rounded-full transition-all duration-100 ease-out"
                style={{ height: `${Math.max(height * 0.24, 4)}px` }}
              />
            ))}
          </div>
          <span className="text-sm text-blue-600 font-medium">Speaking...</span>
        </div>
      )}
    </div>
  );
};
