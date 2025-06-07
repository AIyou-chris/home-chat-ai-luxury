
import { useEffect, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceAnimationProps {
  isListening: boolean;
  isSpeaking: boolean;
  className?: string;
}

export const VoiceAnimation = ({ isListening, isSpeaking, className = '' }: VoiceAnimationProps) => {
  const [soundWave, setSoundWave] = useState<number[]>([]);

  // Generate dynamic soundwave bars
  useEffect(() => {
    if (isSpeaking || isListening) {
      const interval = setInterval(() => {
        const newWave = Array.from({ length: 20 }, (_, i) => {
          const baseHeight = 4;
          const time = Date.now() * 0.005 + i * 0.3;
          
          if (isSpeaking) {
            // Speaking wave - more active
            const wave = Math.sin(time) * 20 + Math.sin(time * 1.5) * 15;
            return Math.abs(wave) + baseHeight;
          } else if (isListening) {
            // Listening wave - moderate activity
            const wave = Math.sin(time) * 15;
            return Math.abs(wave) + baseHeight;
          }
          
          return baseHeight;
        });
        
        setSoundWave(newWave);
      }, 100);

      return () => clearInterval(interval);
    } else {
      // Idle state - minimal wave
      setSoundWave(Array.from({ length: 20 }, () => 4));
    }
  }, [isSpeaking, isListening]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Simple soundwave visualization */}
      <div className="flex items-center space-x-1 h-16 px-4">
        {soundWave.map((height, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-100 ${
              isListening 
                ? 'bg-red-500' 
                : isSpeaking 
                  ? 'bg-blue-500' 
                  : 'bg-gray-400'
            }`}
            style={{ 
              height: `${Math.max(height, 4)}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
