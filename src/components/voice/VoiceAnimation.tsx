
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
        // Create more realistic soundwave pattern with more bars for better visual
        const newWave = Array.from({ length: 50 }, (_, i) => {
          const baseHeight = 8;
          const time = Date.now() * 0.008 + i * 0.25;
          
          if (isSpeaking) {
            // More complex wave for speaking - higher amplitude
            const wave1 = Math.sin(time) * 35;
            const wave2 = Math.sin(time * 1.3 + Math.PI/3) * 25;
            const wave3 = Math.sin(time * 0.8 + Math.PI/2) * 18;
            return Math.abs(wave1 + wave2 + wave3) + baseHeight;
          } else if (isListening) {
            // Active listening wave
            const wave = Math.sin(time + i * 0.4) * 28;
            const randomness = (Math.random() - 0.5) * 12;
            return Math.abs(wave + randomness) + baseHeight;
          }
          
          return baseHeight;
        });
        
        setSoundWave(newWave);
        setAnimationPhase(prev => prev + 1);
      }, 60); // Smooth animation at ~16fps

      return () => clearInterval(interval);
    } else {
      // Idle state - very minimal wave
      setSoundWave(Array.from({ length: 50 }, () => 6 + Math.random() * 3));
    }
  }, [isSpeaking, isListening]);

  // Always show the component but with different states
  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      {isListening && (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Mic size={28} className="text-red-500 z-10 relative" />
            <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-75" />
          </div>
          
          {/* Interactive Soundwave */}
          <div className="flex items-center space-x-0.5 h-20 px-6 bg-white/20 rounded-xl backdrop-blur-sm">
            {soundWave.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-red-600 to-red-400 rounded-full transition-all duration-100 ease-out"
                style={{ 
                  height: `${Math.max(height * 0.9, 6)}px`,
                  opacity: 0.7 + Math.sin(animationPhase * 0.12 + i * 0.2) * 0.3,
                  transform: `scaleY(${1 + Math.sin(animationPhase * 0.08 + i * 0.15) * 0.2})`
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
        <div className="flex items-center space-x-4">
          <Volume2 size={28} className="text-blue-500" />
          
          {/* Interactive Soundwave for Speaking */}
          <div className="flex items-center space-x-0.5 h-20 px-6 bg-white/20 rounded-xl backdrop-blur-sm">
            {soundWave.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all duration-100 ease-out"
                style={{ 
                  height: `${Math.max(height, 6)}px`,
                  opacity: 0.8 + Math.sin(animationPhase * 0.18 + i * 0.25) * 0.2,
                  transform: `scaleY(${1 + Math.sin(animationPhase * 0.12 + i * 0.12) * 0.3})`
                }}
              />
            ))}
          </div>
          
          <span className="text-sm text-blue-600 font-medium">
            Speaking...
          </span>
        </div>
      )}

      {!isListening && !isSpeaking && (
        <div className="flex items-center space-x-4">
          <Mic size={28} className="text-gray-400" />
          
          {/* Idle Soundwave */}
          <div className="flex items-center space-x-0.5 h-20 px-6 bg-white/10 rounded-xl backdrop-blur-sm">
            {soundWave.map((height, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-gray-400 to-gray-300 rounded-full transition-all duration-200"
                style={{ 
                  height: `${height}px`,
                  opacity: 0.5
                }}
              />
            ))}
          </div>
          
          <span className="text-sm text-gray-500 font-medium">
            Ready to listen
          </span>
        </div>
      )}
    </div>
  );
};
