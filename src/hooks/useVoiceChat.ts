
import { useState, useRef, useCallback } from 'react';
import { useOpenAITTS } from './useOpenAITTS';

interface UseVoiceChatProps {
  onTranscript: (text: string) => void;
  onSpeakText: (text: string) => void;
  voiceId?: string;
}

export const useVoiceChat = ({ onTranscript, onSpeakText, voiceId }: UseVoiceChatProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const {
    speak: openaiSpeak,
    stop: stopSpeaking,
    isSpeaking,
    isSupported: ttsSupported,
    availableVoices,
    selectedVoice,
    setVoice,
    settings: voiceSettings,
    updateSettings: updateVoiceSettings
  } = useOpenAITTS({
    voiceId,
    onSpeakStart: () => console.log('OpenAI TTS started'),
    onSpeakEnd: () => console.log('OpenAI TTS ended'),
    onError: (error) => console.error('OpenAI TTS error:', error)
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
    openaiSpeak(text);
    onSpeakText(text);
  }, [openaiSpeak, onSpeakText]);

  return {
    isListening,
    isSpeaking,
    isSupported: isSupported && ttsSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    // OpenAI TTS features
    availableVoices,
    voiceSettings: {
      ...voiceSettings,
      selectedVoice,
    },
    updateVoiceSettings: (settings: any) => {
      updateVoiceSettings(settings);
      if (settings.voice) {
        setVoice(settings.voice.id || settings.voice);
      }
    }
  };
};
