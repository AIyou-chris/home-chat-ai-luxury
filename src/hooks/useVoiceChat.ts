
import { useState, useRef, useCallback } from 'react';
import { useEnhancedVoice } from './useEnhancedVoice';

interface UseVoiceChatProps {
  onTranscript: (text: string) => void;
  onSpeakText: (text: string) => void;
}

export const useVoiceChat = ({ onTranscript, onSpeakText }: UseVoiceChatProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const {
    speak: enhancedSpeak,
    stop: stopSpeaking,
    isSpeaking,
    isSupported: voiceSupported,
    availableVoices,
    settings: voiceSettings,
    updateSettings: updateVoiceSettings
  } = useEnhancedVoice({
    onSpeakStart: () => console.log('Voice started'),
    onSpeakEnd: () => console.log('Voice ended'),
    onError: (error) => console.error('Voice error:', error)
  });

  const initializeRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return null;
    }

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI() as SpeechRecognition;
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  }, [onTranscript]);

  const startListening = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (!recognitionRef.current) {
        recognitionRef.current = initializeRecognition();
      }

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsSupported(false);
    }
  }, [initializeRecognition]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string) => {
    enhancedSpeak(text);
    onSpeakText(text);
  }, [enhancedSpeak, onSpeakText]);

  return {
    isListening,
    isSpeaking,
    isSupported: isSupported && voiceSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    // Enhanced voice features
    availableVoices,
    voiceSettings,
    updateVoiceSettings
  };
};
