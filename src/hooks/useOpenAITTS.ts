
import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseOpenAITTSProps {
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
  onError?: (error: string) => void;
  voiceId?: string;
}

export const useOpenAITTS = ({ 
  onSpeakStart, 
  onSpeakEnd, 
  onError,
  voiceId = 'alloy'
}: UseOpenAITTSProps = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState<string>(voiceId);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isProcessingRef = useRef(false);

  const openaiVoices = [
    { id: 'alloy', name: 'Alloy', description: 'Neutral and balanced' },
    { id: 'echo', name: 'Echo', description: 'Deep and resonant' },
    { id: 'fable', name: 'Fable', description: 'Expressive and dynamic' },
    { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative' },
    { id: 'nova', name: 'Nova', description: 'Warm and engaging' },
    { id: 'shimmer', name: 'Shimmer', description: 'Bright and cheerful' }
  ];

  // Update selected voice when voiceId prop changes
  React.useEffect(() => {
    if (voiceId && voiceId !== selectedVoice) {
      setSelectedVoice(voiceId);
    }
  }, [voiceId, selectedVoice]);

  const processAudioQueue = useCallback(async () => {
    if (isProcessingRef.current || audioQueueRef.current.length === 0) {
      return;
    }

    isProcessingRef.current = true;
    setIsSpeaking(true);
    onSpeakStart?.();

    while (audioQueueRef.current.length > 0) {
      const text = audioQueueRef.current.shift()!;
      
      try {
        console.log('🎵 Converting text to speech:', text.substring(0, 50) + '...');
        console.log('🎤 Using voice ID:', selectedVoice);
        
        const { data, error } = await supabase.functions.invoke('text-to-speech', {
          body: { text, voice: selectedVoice }
        });

        if (error) {
          throw error;
        }

        if (!data?.audioContent) {
          throw new Error('No audio content received');
        }

        // Play the audio
        await new Promise<void>((resolve, reject) => {
          const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
          audioRef.current = audio;
          
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error('Audio playback failed'));
          
          audio.play().catch(reject);
        });

      } catch (error) {
        console.error('TTS error:', error);
        onError?.(error.message || 'Speech synthesis failed');
        break;
      }
    }

    isProcessingRef.current = false;
    setIsSpeaking(false);
    onSpeakEnd?.();
  }, [selectedVoice, onSpeakStart, onSpeakEnd, onError]);

  const speak = useCallback((text: string) => {
    if (!text.trim()) return;
    
    console.log('🗣️ Queueing text for speech:', text.substring(0, 50) + '...');
    console.log('🎤 Current voice:', selectedVoice);
    
    // Add to queue and process
    audioQueueRef.current.push(text);
    processAudioQueue();
  }, [processAudioQueue, selectedVoice]);

  const stop = useCallback(() => {
    // Clear queue and stop current audio
    audioQueueRef.current = [];
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    isProcessingRef.current = false;
    setIsSpeaking(false);
    onSpeakEnd?.();
  }, [onSpeakEnd]);

  const setVoice = useCallback((voiceId: string) => {
    console.log('🎤 Setting voice to:', voiceId);
    setSelectedVoice(voiceId);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    availableVoices: openaiVoices,
    selectedVoice,
    setVoice,
    // Legacy compatibility for existing voice settings
    settings: {
      voice: openaiVoices.find(v => v.id === selectedVoice),
      rate: 1, // OpenAI handles this internally
      pitch: 1, // OpenAI handles this internally
      volume: 1, // Browser audio controls
    },
    updateSettings: ({ voice }: { voice?: any }) => {
      if (voice?.id) {
        setVoice(voice.id);
      }
    }
  };
};
