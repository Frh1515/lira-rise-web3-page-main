import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

interface User {
  telegram_id: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = window.Telegram?.WebApp;
    
    if (!tg) {
      setError('Telegram WebApp not available');
      setLoading(false);
      return;
    }

    const initUser = async () => {
      try {
        const initData = tg.initData;
        if (!initData) {
          throw new Error('No init data available');
        }

        // Verify and decode initData on your backend
        const { data: userData, error: userError } = await supabase
          .from('users')
          .upsert({
            telegram_id: tg.initDataUnsafe.user.id.toString(),
            username: tg.initDataUnsafe.user.username,
          })
          .select()
          .single();

        if (userError) throw userError;
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}