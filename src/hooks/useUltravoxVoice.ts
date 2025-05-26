
import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UltravoxSession {
  sessionId: string;
  websocketUrl: string;
}

interface UseUltravoxVoiceProps {
  onTranscript: (text: string) => void;
  onAIResponse: (text: string) => void;
  propertyContext?: string;
}

export const useUltravoxVoice = ({ onTranscript, onAIResponse, propertyContext }: UseUltravoxVoiceProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const websocketRef = useRef<WebSocket | null>(null);
  const sessionRef = useRef<UltravoxSession | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // Create Ultravox session using Supabase edge function
  const createSession = useCallback(async () => {
    try {
      console.log('Creating Ultravox session...');
      const { data, error } = await supabase.functions.invoke('ultravox-session', {
        body: {
          systemPrompt: `You are an AI assistant helping users with real estate property questions. ${propertyContext ? `Context about the current property: ${propertyContext}` : ''} Provide helpful, accurate information about properties, real estate processes, and answer questions naturally in a conversational manner.`,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Failed to create Ultravox session: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from Ultravox session creation');
      }

      console.log('Ultravox session created:', data);
      sessionRef.current = data;
      return data;
    } catch (error) {
      console.error('Error creating Ultravox session:', error);
      setError('Failed to create voice session');
      throw error;
    }
  }, [propertyContext]);

  // Connect to Ultravox WebSocket
  const connectWebSocket = useCallback(async (session: UltravoxSession) => {
    try {
      console.log('Connecting to Ultravox WebSocket:', session.websocketUrl);
      const ws = new WebSocket(session.websocketUrl);
      websocketRef.current = ws;

      ws.onopen = () => {
        console.log('Ultravox WebSocket connected');
        setIsConnected(true);
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('Ultravox message:', message);
          
          switch (message.type) {
            case 'transcript':
              if (message.role === 'user') {
                onTranscript(message.text);
              } else if (message.role === 'assistant') {
                onAIResponse(message.text);
              }
              break;
            case 'audio_start':
              setIsSpeaking(true);
              break;
            case 'audio_end':
              setIsSpeaking(false);
              break;
            case 'error':
              console.error('Ultravox error:', message.error);
              setError(message.error);
              break;
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('Ultravox WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
      };

      ws.onerror = (error) => {
        console.error('Ultravox WebSocket error:', error);
        setError('WebSocket connection error');
      };

    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      setError('Failed to connect to voice service');
    }
  }, [onTranscript, onAIResponse]);

  // Start audio capture
  const startListening = useCallback(async () => {
    try {
      console.log('Starting Ultravox listening...');
      
      if (!sessionRef.current) {
        const session = await createSession();
        await connectWebSocket(session);
        
        // Wait a bit for the connection to establish
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      if (!isConnected) {
        throw new Error('Not connected to voice service');
      }

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        } 
      });
      
      audioStreamRef.current = stream;

      // Create MediaRecorder for audio capture
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && websocketRef.current?.readyState === WebSocket.OPEN) {
          // Send audio data to Ultravox
          websocketRef.current.send(event.data);
        }
      };

      mediaRecorder.start(100); // Send audio chunks every 100ms
      setIsListening(true);
      setError(null);
      console.log('Ultravox listening started');

    } catch (error) {
      console.error('Error starting voice capture:', error);
      setError('Failed to start voice input');
      setIsSupported(false);
    }
  }, [createSession, connectWebSocket, isConnected]);

  // Stop audio capture
  const stopListening = useCallback(() => {
    console.log('Stopping Ultravox listening...');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }
    
    setIsListening(false);
  }, []);

  // Disconnect from Ultravox
  const disconnect = useCallback(() => {
    console.log('Disconnecting from Ultravox...');
    stopListening();
    
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = null;
    }
    
    sessionRef.current = null;
    setIsConnected(false);
  }, [stopListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isListening,
    isSpeaking,
    isSupported,
    error,
    startListening,
    stopListening,
    disconnect,
  };
};
