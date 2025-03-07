
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { usersApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, department: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a session
    const checkSession = async () => {
      setIsLoading(true);
      
      try {
        // Check if user is already authenticated
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          // Fetch user profile
          const userData = await usersApi.getCurrent();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Failed to get auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Fetch user profile after sign in
        const userData = await usersApi.getCurrent();
        if (userData) {
          setUser(userData);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // User profile will be fetched by the auth state change listener
      toast.success('Login successful');
    } catch (error: any) {
      toast.error(error.message || 'Invalid email or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string, department: string) => {
    setIsLoading(true);
    
    try {
      // First, sign up the user
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            department
          }
        }
      });
      
      if (error) throw error;
      
      // Registration successful
      toast.success('Registration successful! Please check your email for confirmation.');
      
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.info('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
