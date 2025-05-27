
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
      console.log('🌐 Attempting to call ultravox-session edge function...');

      // Implement manual timeout using Promise.race
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timeout after 30 seconds'));
        }, 30000);
      });

      const invokePromise = supabase.functions.invoke('ultravox-session', {
        body: requestBody,
      });

      let response;
      try {
        response = await Promise.race([invokePromise, timeoutPromise]);
      } catch (invokeError) {
        console.error('💥 Supabase invoke error:', invokeError);
        
        // Check if it's a timeout error
        if (invokeError.message?.includes('timeout')) {
          throw new Error('Request timeout - please check your internet connection');
        }
        
        // Check for CORS or network issues
        if (invokeError.message?.includes('CORS') || invokeError.message?.includes('fetch')) {
          throw new Error('Network error - unable to reach Ultravox service. Please try switching to browser voice mode.');
        }
        
        throw new Error(`Connection failed: ${invokeError.message}`);
      }

      console.log('📥 Supabase function response:', { data: response.data, error: response.error });

      if (response.error) {
        console.error('❌ Supabase function error:', response.error);
        
        // Provide more specific error messages
        if (response.error.message?.includes('ULTRAVOX_API_KEY')) {
          throw new Error('Ultravox API key not configured. Please contact support.');
        }
        
        if (response.error.message?.includes('CORS')) {
          throw new Error('Connection blocked by browser security. Please try browser voice mode.');
        }
        
        throw new Error(`Ultravox service error: ${response.error.message}`);
      }

      if (!response.data) {
        console.error('❌ No data received from Supabase function');
        throw new Error('No response from Ultravox service');
      }

      if (!response.data.websocketUrl) {
        console.error('❌ Invalid session data - missing websocketUrl:', response.data);
        throw new Error('Invalid response from Ultravox service');
      }

      if (!response.data.sessionId) {
        console.error('❌ Invalid session data - missing sessionId:', response.data);
        throw new Error('Invalid response from Ultravox service');
      }

      console.log('✅ Session created successfully:', {
        sessionId: response.data.sessionId,
        websocketUrl: response.data.websocketUrl ? 'URL present' : 'URL missing'
      });
      
      sessionRef.current = response.data;
      return response.data;
    } catch (error) {
      console.error('💥 Session creation failed:', error);
      
      // Set user-friendly error messages
      if (error.message.includes('timeout')) {
        setError('Connection timeout. Please check your internet and try again.');
      } else if (error.message.includes('CORS') || error.message.includes('network')) {
        setError('Connection blocked. Please try switching to browser voice mode.');
      } else if (error.message.includes('API key')) {
        setError('Service configuration issue. Please contact support.');
      } else {
        setError(`Voice service unavailable: ${error.message}`);
      }
      
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
    setError,
    startListening,
    stopListening,
    disconnect,
  };
};
