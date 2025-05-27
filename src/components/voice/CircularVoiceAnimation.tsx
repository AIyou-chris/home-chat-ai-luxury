
import { useEffect, useState } from 'react';

interface CircularVoiceAnimationProps {
  isActive?: boolean;
  className?: string;
}

export const CircularVoiceAnimation = ({ isActive = true, className = '' }: CircularVoiceAnimationProps) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isActive]);

  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) + animationPhase;
    const radius = 60 + Math.sin(Date.now() / 1000 + i) * 10;
    const x = 120 + Math.cos((angle * Math.PI) / 180) * radius;
    const y = 120 + Math.sin((angle * Math.PI) / 180) * radius;
    const opacity = 0.3 + Math.sin(Date.now() / 500 + i) * 0.4;
    
    return { x, y, opacity, delay: i * 0.1 };
  });

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        className="animate-spin"
        style={{ animationDuration: '20s' }}
      >
        <defs>
          <radialGradient id="voiceGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#ea580c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        
        {/* Central circle */}
        <circle
          cx="120"
          cy="120"
          r="25"
          fill="url(#voiceGradient)"
          className="animate-pulse"
        />
        
        {/* Radiating dots */}
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r="4"
            fill="#f97316"
            opacity={dot.opacity}
            className="animate-pulse"
            style={{
              animationDelay: `${dot.delay}s`,
              animationDuration: '2s'
            }}
          />
        ))}
        
        {/* Outer ring */}
        <circle
          cx="120"
          cy="120"
          r="90"
          fill="none"
          stroke="url(#voiceGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-spin"
          style={{ animationDuration: '15s', animationDirection: 'reverse' }}
        />
      </svg>
    </div>
  );
};
