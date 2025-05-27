
import { useEffect, useState } from 'react';

interface CircularVoiceAnimationProps {
  isActive?: boolean;
  className?: string;
  mode?: 'idle' | 'listening' | 'speaking' | 'thinking';
  size?: 'small' | 'medium' | 'large';
}

export const CircularVoiceAnimation = ({ 
  isActive = true, 
  className = '', 
  mode = 'idle',
  size = 'medium'
}: CircularVoiceAnimationProps) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
      
      // Vary pulse intensity based on mode
      if (mode === 'listening') {
        setPulseIntensity(0.8 + Math.random() * 0.4);
      } else if (mode === 'speaking') {
        setPulseIntensity(1.2 + Math.sin(Date.now() / 200) * 0.3);
      } else if (mode === 'thinking') {
        setPulseIntensity(0.6 + Math.sin(Date.now() / 300) * 0.2);
      } else {
        setPulseIntensity(1);
      }
    }, mode === 'speaking' ? 30 : 50);

    return () => clearInterval(interval);
  }, [isActive, mode]);

  const sizes = {
    small: { width: 120, height: 120, viewBox: '0 0 120 120', center: 60, baseRadius: 30 },
    medium: { width: 240, height: 240, viewBox: '0 0 240 240', center: 120, baseRadius: 60 },
    large: { width: 320, height: 320, viewBox: '0 0 320 320', center: 160, baseRadius: 80 }
  };

  const { width, height, viewBox, center, baseRadius } = sizes[size];

  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) + (mode === 'thinking' ? animationPhase * 2 : animationPhase);
    const radiusVariation = mode === 'speaking' ? Math.sin(Date.now() / 100 + i) * 15 : Math.sin(Date.now() / 1000 + i) * 10;
    const radius = baseRadius + radiusVariation * pulseIntensity;
    const x = center + Math.cos((angle * Math.PI) / 180) * radius;
    const y = center + Math.sin((angle * Math.PI) / 180) * radius;
    
    let opacity = 0.3 + Math.sin(Date.now() / 500 + i) * 0.4;
    if (mode === 'listening') {
      opacity = 0.4 + Math.sin(Date.now() / 200 + i) * 0.5;
    } else if (mode === 'speaking') {
      opacity = 0.6 + Math.sin(Date.now() / 150 + i) * 0.4;
    }
    
    return { x, y, opacity: Math.max(0.1, Math.min(1, opacity)), delay: i * 0.1 };
  });

  const getGradientColors = () => {
    switch (mode) {
      case 'listening':
        return { start: '#ef4444', middle: '#dc2626', end: '#991b1b' };
      case 'speaking':
        return { start: '#3b82f6', middle: '#2563eb', end: '#1d4ed8' };
      case 'thinking':
        return { start: '#8b5cf6', middle: '#7c3aed', end: '#6d28d9' };
      default:
        return { start: '#f97316', middle: '#ea580c', end: '#c2410c' };
    }
  };

  const colors = getGradientColors();

  const getAnimationSpeed = () => {
    switch (mode) {
      case 'listening': return '8s';
      case 'speaking': return '4s';
      case 'thinking': return '12s';
      default: return '20s';
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        className="animate-spin"
        style={{ animationDuration: getAnimationSpeed() }}
      >
        <defs>
          <radialGradient id={`voiceGradient-${mode}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.start} stopOpacity="0.8" />
            <stop offset="70%" stopColor={colors.middle} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.end} stopOpacity="0.3" />
          </radialGradient>
        </defs>
        
        {/* Central circle */}
        <circle
          cx={center}
          cy={center}
          r={size === 'large' ? 35 : size === 'medium' ? 25 : 15}
          fill={`url(#voiceGradient-${mode})`}
          className="animate-pulse"
          style={{ 
            animationDuration: mode === 'speaking' ? '0.5s' : '2s',
            transform: `scale(${pulseIntensity})`
          }}
        />
        
        {/* Radiating dots */}
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={size === 'large' ? 6 : 4}
            fill={colors.start}
            opacity={dot.opacity}
            className="animate-pulse"
            style={{
              animationDelay: `${dot.delay}s`,
              animationDuration: mode === 'speaking' ? '0.3s' : '2s'
            }}
          />
        ))}
        
        {/* Outer ring */}
        <circle
          cx={center}
          cy={center}
          r={baseRadius + 30}
          fill="none"
          stroke={`url(#voiceGradient-${mode})`}
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-spin"
          style={{ 
            animationDuration: mode === 'thinking' ? '10s' : '15s', 
            animationDirection: 'reverse' 
          }}
        />
        
        {/* Inner pulse rings for speaking mode */}
        {mode === 'speaking' && (
          <>
            <circle
              cx={center}
              cy={center}
              r={baseRadius - 10}
              fill="none"
              stroke={colors.start}
              strokeWidth="1"
              opacity="0.4"
              className="animate-ping"
            />
            <circle
              cx={center}
              cy={center}
              r={baseRadius - 20}
              fill="none"
              stroke={colors.middle}
              strokeWidth="1"
              opacity="0.3"
              className="animate-ping"
              style={{ animationDelay: '0.5s' }}
            />
          </>
        )}
      </svg>
    </div>
  );
};
