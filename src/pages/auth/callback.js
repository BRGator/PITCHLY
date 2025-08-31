// pages/auth/callback.js

import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session fetch failed:', error);
      }
      router.push('/dashboard');
    };

    handleAuth();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-lg text-gray-900 dark:text-gray-100">
      Logging you in...
    </div>
  );
}