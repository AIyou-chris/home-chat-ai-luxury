
import { useEffect, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceAnimationProps {
  isListening: boolean;
  isSpeaking: boolean;
  className?: string;
}

export const VoiceAnimation = ({ isListening, isSpeaking, className = '' }: VoiceAnimationProps) => {
  const [soundWave, setSoundWave] = useState<number[]>([]);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Generate dynamic soundwave bars
  useEffect(() => {
    if (isSpeaking || isListening) {
      const interval = setInterval(() => {
        // Create more realistic soundwave pattern
        const newWave = Array.from({ length: 40 }, (_, i) => {
          const baseHeight = 10;
          const time = Date.now() * 0.005 + i * 0.3;
          
          if (isSpeaking) {
            // More complex wave for speaking
            const wave1 = Math.sin(time) * 30;
            const wave2 = Math.sin(time * 1.5 + Math.PI/4) * 20;
            const wave3 = Math.sin(time * 0.7 + Math.PI/2) * 15;
            return Math.abs(wave1 + wave2 + wave3) + baseHeight;
          } else if (isListening) {
            // Simpler wave for listening
            const wave = Math.sin(time + i * 0.5) * 25;
            const randomness = (Math.random() - 0.5) * 10;
            return Math.abs(wave + randomness) + baseHeight;
          }
          
          return baseHeight;
        });
        
        setSoundWave(newWave);
        setAnimationPhase(prev => prev + 1);
      }, 50); // Smooth 20fps animation

      return () => clearInterval(interval);
    } else {
      // Idle state - gentle wave
      setSoundWave(Array.from({ length: 40 }, () => 8 + Math.random() * 4));
    }
  }, [isSpeaking, isListening]);

  if (!isListening && !isSpeaking) return null;

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {isListening && (
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Mic size={24} className="text-red-500 z-10 relative" />
            <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-75" />
          </div>
          
          {/* Interactive Soundwave */}
          <div className="flex items-center space-x-1 h-16 px-4">
            {soundWave.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-red-600 to-red-400 rounded-full transition-all duration-75 ease-out"
                style={{ 
                  height: `${Math.max(height * 0.8, 4)}px`,
                  opacity: 0.7 + Math.sin(animationPhase * 0.1 + i * 0.2) * 0.3
                }}
              />
            ))}
          </div>
          
          <span className="text-sm text-red-600 font-medium animate-pulse">
            Listening...
          </span>
        </div>
      )}

      {isSpeaking && (
        <div className="flex items-center space-x-3">
          <Volume2 size={24} className="text-blue-500" />
          
          {/* Interactive Soundwave for Speaking */}
          <div className="flex items-center space-x-1 h-16 px-4">
            {soundWave.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all duration-75 ease-out"
                style={{ 
                  height: `${Math.max(height, 4)}px`,
                  opacity: 0.8 + Math.sin(animationPhase * 0.15 + i * 0.3) * 0.2,
                  transform: `scaleY(${1 + Math.sin(animationPhase * 0.1 + i * 0.1) * 0.2})`
                }}
              />
            ))}
          </div>
          
          <span className="text-sm text-blue-600 font-medium">
            Speaking...
          </span>
        </div>
      )}
    </div>
  );
};
