import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import DarkModeToggle from '../../components/DarkModeToggle';

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  const errorMessages = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'Access was denied.',
    Verification: 'The verification link was invalid or has expired.',
    Default: 'An error occurred during authentication.'
  };

  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <>
      <Head>
        <title>Authentication Error - PITCHLY</title>
        <meta name="description" content="Authentication error occurred" />
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
              Authentication Error
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              There was a problem signing you in
            </p>
          </div>

          <div className="card-premium p-8 text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sign-in Failed
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {errorMessage}
            </p>

            {error && (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Error Code: {error}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Link 
                href="/auth/signin" 
                className="btn-primary inline-block"
              >
                Try Again
              </Link>
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