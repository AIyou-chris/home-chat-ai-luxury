
import { useState, useCallback, useRef } from 'react';

interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

interface UseEnhancedVoiceProps {
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
  onError?: (error: string) => void;
}

export const useEnhancedVoice = ({ onSpeakStart, onSpeakEnd, onError }: UseEnhancedVoiceProps = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(() => 'speechSynthesis' in window);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [settings, setSettings] = useState<VoiceSettings>({
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
    voice: null
  });
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const loadVoices = useCallback(() => {
    if (!isSupported) return;
    
    const voices = window.speechSynthesis.getVoices();
    setAvailableVoices(voices);
    
    // Auto-select best English voice
    if (!settings.voice && voices.length > 0) {
      const englishVoices = voices.filter(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Natural'))
      );
      
      const bestVoice = englishVoices.find(voice => 
        voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Zira')
      ) || englishVoices[0] || voices[0];
      
      setSettings(prev => ({ ...prev, voice: bestVoice }));
    }
  }, [isSupported, settings.voice]);

  // Load voices on component mount and when voices change
  useState(() => {
    if (isSupported) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  });

  const speak = useCallback((text: string) => {
    if (!isSupported) {
      onError?.('Text-to-speech not supported in this browser');
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply settings
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.volume = settings.volume;
      if (settings.voice) {
        utterance.voice = settings.voice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        onSpeakStart?.();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        onSpeakEnd?.();
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        onError?.(`Speech error: ${event.error}`);
        console.error('Speech synthesis error:', event);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      setIsSpeaking(false);
      onError?.('Failed to initialize speech synthesis');
      console.error('Speech synthesis error:', error);
    }
  }, [isSupported, settings, onSpeakStart, onSpeakEnd, onError]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const getVoicesByLanguage = useCallback((language: string = 'en') => {
    return availableVoices.filter(voice => voice.lang.startsWith(language));
  }, [availableVoices]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    availableVoices,
    settings,
    updateSettings,
    getVoicesByLanguage
  };
};
