import { useState, useEffect } from 'react';
import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import DarkModeToggle from '../../components/DarkModeToggle';

export default function SignIn({ providers, csrfToken }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    // Check if user came from sign-in link vs get-started
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');
    
    // Set as returning user if they clicked "Sign In" specifically
    setIsReturningUser(fromParam === 'signin');
  }, []);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn('email', { 
        email,
        callbackUrl: '/dashboard'
      });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (providerId) => {
    setLoading(true);
    try {
      await signIn(providerId, { 
        callbackUrl: '/dashboard'
      });
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In - PITCHLY</title>
        <meta name="description" content="Sign in to your PITCHLY account to create winning AI-powered proposals." />
      </Head>

      <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Dark Mode Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <DarkModeToggle />
        </div>
        
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-3xl font-black text-gray-900 dark:text-gray-100 animate-gradient-wave">
                PITCHLY
              </span>
            </Link>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {isReturningUser ? 'Welcome Back' : 'Get Started Today'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isReturningUser 
                ? 'Sign in to create winning proposals with AI'
                : 'Join thousands creating winning proposals with AI'
              }
            </p>
          </div>

          <div className="card-premium p-8">
            {/* Email Sign In Form */}
            <form onSubmit={handleEmailSignIn} className="mb-6">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Continue with Email</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Sign In Buttons */}
            <div className="space-y-3">
              {providers?.google && (
                <button
                  onClick={() => handleProviderSignIn('google')}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </button>
              )}

              {providers?.apple && (
                <button
                  onClick={() => handleProviderSignIn('apple')}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="font-medium">Continue with Apple</span>
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Sign up automatically on first sign-in
                </span>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  // If user is already signed in, redirect to dashboard
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  
  return {
    props: {
      providers: providers ?? [],
      csrfToken: csrfToken ?? null,
    },
  };
}
