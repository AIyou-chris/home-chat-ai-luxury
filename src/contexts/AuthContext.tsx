import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';

// Define types for our authentication context
type Profile = {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  uploadAvatar: (file: File) => Promise<{ error: Error | null; publicURL: string | null }>;
  clearError: () => void;
  isAdmin: boolean;
  isAgent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (error) {
        console.log('No role found for user, defaulting to agent');
        return 'agent';
      }
      
      return data?.role || 'agent';
    } catch (error) {
      console.log('Error fetching user role:', error);
      return 'agent';
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load user profile');
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Load user profile and role
          await Promise.all([
            loadUserProfile(session.user.id),
            fetchUserRole(session.user.id).then(role => setUserRole(role))
          ]);
        } else {
          setProfile(null);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        Promise.all([
          loadUserProfile(session.user.id),
          fetchUserRole(session.user.id).then(role => setUserRole(role))
        ]).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    const redirectUrl = `${window.location.origin}/`;
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name
          }
        }
      });

      if (error) {
        setError(error.message);
        console.error("Sign Up Failed:", error.message);
      } else {
        console.log("Sign Up Successful: Please check your email to confirm your account.");
      }

      return { error };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign up';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setError(error.message);
        console.error("Sign In Failed:", error.message);
      }

      return { error };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserRole(null);
      setProfile(null);
      
      console.log("Signed Out: You have been successfully signed out.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign out';
      setError(errorMessage);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      const errorMsg = 'User not authenticated';
      setError(errorMsg);
      return { error: new Error(errorMsg) };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh profile
      await loadUserProfile(user.id);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      return { error: new Error(errorMessage) };
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) {
      const errorMsg = 'User not authenticated';
      setError(errorMsg);
      return { error: new Error(errorMsg), publicURL: null };
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      await updateProfile({ avatar_url: publicUrl });

      return { error: null, publicURL: publicUrl };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload avatar';
      setError(errorMessage);
      return { error: new Error(errorMessage), publicURL: null };
    }
  };

  const clearError = () => setError(null);

  const isAdmin = userRole === 'admin';
  const isAgent = userRole === 'agent';

  const value = {
    user,
    session,
    userRole,
    profile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    uploadAvatar,
    clearError,
    isAdmin,
    isAgent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
