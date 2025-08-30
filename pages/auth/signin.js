// pages/auth/signin.js

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setStatus('Sending magic link...');

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setStatus('Error sending link. Try again.');
    } else {
      setStatus('Check your email for the magic sign-in link.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Send Magic Link
          </button>
        </form>
        {status && <p className="mt-4 text-sm text-center">{status}</p>}
      </div>
    </div>
  );
}
