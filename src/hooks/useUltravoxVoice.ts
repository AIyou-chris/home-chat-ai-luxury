
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
  voiceId?: string;
}

export const useUltravoxVoice = ({ onTranscript, onAIResponse, propertyContext, voiceId }: UseUltravoxVoiceProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const websocketRef = useRef<WebSocket | null>(null);
  const sessionRef = useRef<UltravoxSession | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const connectionAttempts = useRef(0);
  const maxRetries = 3;

  // Create Ultravox session using Supabase edge function
  const createSession = useCallback(async () => {
    try {
      console.log('🚀 Creating Ultravox session...');
      console.log('📝 Voice ID:', voiceId);
      console.log('📝 Property context length:', propertyContext?.length || 0);
      
      const requestBody = {
        systemPrompt: `You are an AI assistant helping users with real estate property questions. ${propertyContext ? `Context about the current property: ${propertyContext}` : ''} Provide helpful, accurate information about properties, real estate processes, and answer questions naturally in a conversational manner. Keep responses concise and engaging.`,
        voiceId: voiceId || 'terrence',
      };
      
      console.log('📤 Calling Supabase function with:', JSON.stringify(requestBody, null, 2));

      const { data, error } = await supabase.functions.invoke('ultravox-session', {
        body: requestBody,
      });

      console.log('📥 Supabase function response:', { data, error });

      if (error) {
        console.error('❌ Supabase function error:', error);
        throw new Error(`Failed to create Ultravox session: ${error.message}`);
      }

      if (!data) {
        console.error('❌ No data received from Supabase function');
        throw new Error('No data received from session creation');
      }

      if (!data.websocketUrl) {
        console.error('❌ Invalid session data - missing websocketUrl:', data);
        throw new Error('Invalid session data: missing websocketUrl');
      }

      if (!data.sessionId) {
        console.error('❌ Invalid session data - missing sessionId:', data);
        throw new Error('Invalid session data: missing sessionId');
      }

      console.log('✅ Session created successfully:', {
        sessionId: data.sessionId,
        websocketUrl: data.websocketUrl ? 'URL present' : 'URL missing'
      });
      
      sessionRef.current = data;
      return data;
    } catch (error) {
      console.error('💥 Session creation failed:', error);
      setError(`Failed to create voice session: ${error.message}`);
      throw error;
    }
  }, [propertyContext, voiceId]);

  // Connect to Ultravox WebSocket
  const connectWebSocket = useCallback(async (session: UltravoxSession) => {
    return new Promise<void>((resolve, reject) => {
      try {
        console.log('🔌 Connecting to Ultravox WebSocket...');
        console.log('🌐 WebSocket URL:', session.websocketUrl);
        
        if (websocketRef.current) {
          console.log('🔄 Closing existing WebSocket connection');
          websocketRef.current.close();
        }

        const ws = new WebSocket(session.websocketUrl);
        websocketRef.current = ws;

        const connectionTimeout = setTimeout(() => {
          console.error('⏰ WebSocket connection timeout (10s)');
          ws.close();
          reject(new Error('Connection timeout'));
        }, 10000);

        ws.onopen = () => {
          console.log('✅ Ultravox WebSocket connected successfully');
          clearTimeout(connectionTimeout);
          setIsConnected(true);
          setError(null);
          connectionAttempts.current = 0;
          resolve();
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            console.log('📨 WebSocket message:', message.type, message);
            
            switch (message.type) {
              case 'session_status':
                console.log('📊 Session status:', message.status);
                break;
              case 'transcript':
                if (message.role === 'user' && message.text) {
                  console.log('🎤 User transcript:', message.text);
                  onTranscript(message.text);
                } else if (message.role === 'assistant' && message.text) {
                  console.log('🤖 AI response:', message.text);
                  onAIResponse(message.text);
                }
                break;
              case 'audio_start':
                console.log('🔊 AI started speaking');
                setIsSpeaking(true);
                break;
              case 'audio_end':
                console.log('🔇 AI finished speaking');
                setIsSpeaking(false);
                break;
              case 'user_speaking_start':
                console.log('🎤 User started speaking');
                setIsListening(true);
                break;
              case 'user_speaking_end':
                console.log('🎤 User stopped speaking');
                setIsListening(false);
                break;
              case 'error':
                console.error('❌ Ultravox error:', message.error);
                setError(`Voice error: ${message.error}`);
                break;
              default:
                console.log('❓ Unhandled message type:', message.type);
            }
          } catch (error) {
            console.error('💥 Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = (event) => {
          console.log('🔌 WebSocket disconnected:', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          });
          clearTimeout(connectionTimeout);
          setIsConnected(false);
          setIsListening(false);
          setIsSpeaking(false);
          
          // Only attempt reconnection if it wasn't a manual disconnect and we haven't exceeded attempts
          if (event.code !== 1000 && connectionAttempts.current < maxRetries) {
            connectionAttempts.current++;
            const retryDelay = 2000 * connectionAttempts.current;
            console.log(`🔄 Attempting reconnection ${connectionAttempts.current}/${maxRetries} in ${retryDelay}ms`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log('🔄 Starting reconnection attempt...');
              startListening();
            }, retryDelay);
          } else if (connectionAttempts.current >= maxRetries) {
            console.error('❌ Max reconnection attempts exceeded');
            setError('Connection failed after multiple attempts. Please try again.');
          }
        };

        ws.onerror = (error) => {
          console.error('💥 WebSocket error:', error);
          clearTimeout(connectionTimeout);
          setError('WebSocket connection error');
          reject(new Error('WebSocket connection failed'));
        };

      } catch (error) {
        console.error('💥 Error setting up WebSocket:', error);
        setError('Failed to connect to voice service');
        reject(error);
      }
    });
  }, [onTranscript, onAIResponse]);

  // Start listening
  const startListening = useCallback(async () => {
    try {
      console.log('🎬 Starting Ultravox listening...');
      setError(null);
      
      // Clear any existing reconnection timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Create session if needed
      if (!sessionRef.current) {
        console.log('🆕 Creating new session...');
        const session = await createSession();
        await connectWebSocket(session);
      } else if (!isConnected) {
        console.log('🔄 Reconnecting with existing session...');
        await connectWebSocket(sessionRef.current);
      }

      // Check microphone permissions
      try {
        console.log('🎤 Checking microphone permissions...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        console.log('✅ Microphone access granted');
      } catch (micError) {
        console.error('❌ Microphone access denied:', micError);
        setError('Microphone access required for voice chat');
        setIsSupported(false);
        return;
      }

      console.log('✅ Ultravox listening started successfully');

    } catch (error) {
      console.error('💥 Error starting voice capture:', error);
      setError(`Failed to start voice input: ${error.message}`);
      
      if (error.message.includes('session') || error.message.includes('Ultravox')) {
        setError('Ultravox connection failed. Try switching to browser voice mode.');
      }
    }
  }, [createSession, connectWebSocket, isConnected]);

  // Stop listening
  const stopListening = useCallback(() => {
    console.log('⏹️ Stopping Ultravox listening...');
    setIsListening(false);
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  // Disconnect from Ultravox
  const disconnect = useCallback(() => {
    console.log('🔌 Disconnecting from Ultravox...');
    stopListening();
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (websocketRef.current) {
      websocketRef.current.close(1000, 'Manual disconnect');
      websocketRef.current = null;
    }
    
    sessionRef.current = null;
    setIsConnected(false);
    connectionAttempts.current = 0;
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
