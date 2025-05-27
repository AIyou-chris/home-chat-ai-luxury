
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
  useUltravox = false, // Default to false since OpenAI TTS is more reliable
  voiceId 
}: UseEnhancedVoiceChatProps) => {
  const [voiceMode, setVoiceMode] = useState<'ultravox' | 'openai'>(useUltravox ? 'ultravox' : 'openai');

  // Ultravox voice system (kept for compatibility)
  const ultravoxVoice = useUltravoxVoice({
    onTranscript,
    onAIResponse,
    propertyContext: property ? `Property: ${property.title}, ${property.description}` : undefined,
    voiceId,
  });

  // OpenAI TTS + Browser STT system (new default)
  const openaiVoice = useVoiceChat({
    onTranscript,
    onSpeakText: onAIResponse,
  });

  // Switch between voice systems
  const switchVoiceMode = useCallback((mode: 'ultravox' | 'openai') => {
    // Stop current system
    if (voiceMode === 'ultravox') {
      ultravoxVoice.disconnect();
    } else {
      openaiVoice.stopListening();
      openaiVoice.stopSpeaking();
    }
    
    setVoiceMode(mode);
  }, [voiceMode, ultravoxVoice, openaiVoice]);

  // Unified interface
  const currentVoice = voiceMode === 'ultravox' ? ultravoxVoice : openaiVoice;
  
  return {
    // Voice state
    isListening: currentVoice.isListening,
    isSpeaking: currentVoice.isSpeaking,
    isConnected: voiceMode === 'ultravox' ? ultravoxVoice.isConnected : true,
    isSupported: currentVoice.isSupported,
    error: voiceMode === 'ultravox' ? ultravoxVoice.error : null,
    setError: voiceMode === 'ultravox' ? ultravoxVoice.setError : () => {},
    
    // Voice controls
    startListening: currentVoice.startListening,
    stopListening: currentVoice.stopListening,
    
    // Voice mode management
    voiceMode,
    switchVoiceMode,
    
    // OpenAI TTS features (for new default mode)
    ...(voiceMode === 'openai' && {
      speak: openaiVoice.speak,
      stopSpeaking: openaiVoice.stopSpeaking,
      availableVoices: openaiVoice.availableVoices,
      voiceSettings: openaiVoice.voiceSettings,
      updateVoiceSettings: openaiVoice.updateVoiceSettings,
    }),
  };
};
