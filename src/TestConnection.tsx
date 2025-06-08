import { useEffect, useState } from 'react';
import { supabase } from './integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

export const TestConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState('Connecting to Supabase...');
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test environment variables
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          throw new Error('Missing Supabase environment variables');
        }

        // Test Supabase connection
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        setSession(data.session);
        setConnectionStatus('✅ Successfully connected to Supabase!');
        
        // Test a simple query
        const { data: testData, error: queryError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1);
          
        if (queryError) {
          console.warn('Note: Could not query profiles table. This is normal if the table does not exist yet.');
        } else {
          console.log('Test query result:', testData);
        }
        
      } catch (err) {
        console.error('Connection test failed:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setConnectionStatus('❌ Connection failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Supabase Connection Test</h2>
      
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Connection Status:</h3>
        <p className={error ? 'text-red-600' : 'text-green-600'}>
          {connectionStatus}
        </p>
        {error && (
          <div className="mt-2 p-2 bg-red-50 text-red-800 text-sm rounded">
            Error: {error}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Connection Details:</h3>
        <pre className="text-xs bg-black text-green-400 p-2 rounded overflow-x-auto">
{`Supabase URL: ${import.meta.env.VITE_SUPABASE_URL}
Anon Key: ${import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20)}...${import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(-4)}
Session: ${session ? 'Active' : 'No active session'}`}
        </pre>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Check the browser console for detailed logs.</p>
      </div>
    </div>
  );
};

export default TestConnection;
