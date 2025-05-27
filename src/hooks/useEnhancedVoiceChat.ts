import { useState, useCallback } from 'react';
import { useUltravoxVoice } from './useUltravoxVoice';
import { useVoiceChat } from './useVoiceChat';

interface UseEnhancedVoiceChatProps {
  onTranscript: (text: string) => void;
  onAIResponse: (text: string) => void;
  property?: any;
  useUltravox?: boolean;
  voiceId?: string;
}

export const useEnhancedVoiceChat = ({ 
  onTranscript, 
  onAIResponse, 
  property,
  useUltravox = true,
  voiceId 
}: UseEnhancedVoiceChatProps) => {
  const [voiceMode, setVoiceMode] = useState<'ultravox' | 'browser'>(useUltravox ? 'ultravox' : 'browser');

  // Ultravox voice system
  const ultravoxVoice = useUltravoxVoice({
    onTranscript,
    onAIResponse,
    propertyContext: property ? `Property: ${property.title}, ${property.description}` : undefined,
    voiceId,
  });

  // Browser-based voice system (fallback)
  const browserVoice = useVoiceChat({
    onTranscript,
    onSpeakText: onAIResponse,
  });

  // Switch between voice systems
  const switchVoiceMode = useCallback((mode: 'ultravox' | 'browser') => {
    // Stop current system
    if (voiceMode === 'ultravox') {
      ultravoxVoice.disconnect();
    } else {
      browserVoice.stopListening();
      browserVoice.stopSpeaking();
    }
    
    setVoiceMode(mode);
  }, [voiceMode, ultravoxVoice, browserVoice]);

  // Unified interface
  const currentVoice = voiceMode === 'ultravox' ? ultravoxVoice : browserVoice;
  
  return {
    // Voice state
    isListening: currentVoice.isListening,
    isSpeaking: currentVoice.isSpeaking,
    isConnected: voiceMode === 'ultravox' ? ultravoxVoice.isConnected : true,
    isSupported: currentVoice.isSupported,
    error: voiceMode === 'ultravox' ? ultravoxVoice.error : null,
    
    // Voice controls
    startListening: currentVoice.startListening,
    stopListening: currentVoice.stopListening,
    
    // Voice mode management
    voiceMode,
    switchVoiceMode,
    
    // Browser-specific features (for fallback)
    ...(voiceMode === 'browser' && {
      speak: browserVoice.speak,
      stopSpeaking: browserVoice.stopSpeaking,
      availableVoices: browserVoice.availableVoices,
      voiceSettings: browserVoice.voiceSettings,
      updateVoiceSettings: browserVoice.updateVoiceSettings,
    }),
  };
};
