
import { useState, useCallback, useRef, useEffect } from 'react';

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

  // Create Ultravox session
  const createSession = useCallback(async () => {
    try {
      const response = await fetch('/api/ultravox/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: `You are an AI assistant helping users with real estate property questions. ${propertyContext ? `Context about the current property: ${propertyContext}` : ''} Provide helpful, accurate information about properties, real estate processes, and answer questions naturally in a conversational manner.`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Ultravox session');
      }

      const session = await response.json();
      sessionRef.current = session;
      return session;
    } catch (error) {
      console.error('Error creating Ultravox session:', error);
      setError('Failed to create voice session');
      throw error;
    }
  }, [propertyContext]);

  // Connect to Ultravox WebSocket
  const connectWebSocket = useCallback(async (session: UltravoxSession) => {
    try {
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

      ws.onclose = () => {
        console.log('Ultravox WebSocket disconnected');
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
      if (!sessionRef.current) {
        const session = await createSession();
        await connectWebSocket(session);
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

    } catch (error) {
      console.error('Error starting voice capture:', error);
      setError('Failed to start voice input');
      setIsSupported(false);
    }
  }, [createSession, connectWebSocket, isConnected]);

  // Stop audio capture
  const stopListening = useCallback(() => {
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
