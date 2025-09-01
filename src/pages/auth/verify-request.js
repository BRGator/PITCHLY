import Head from 'next/head';
import Link from 'next/link';
import DarkModeToggle from '../../components/DarkModeToggle';

export default function VerifyRequest() {
  return (
    <>
      <Head>
        <title>Check Your Email - PITCHLY</title>
        <meta name="description" content="Check your email for your sign-in link" />
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
              Check Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We've sent a secure sign-in link to your email address
            </p>
          </div>

          <div className="card-premium p-8 text-center">
            {/* Email Icon */}
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sign-in Link Sent!
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Click the link in your email to securely sign in to your PITCHLY account. 
              The link will expire in 24 hours for security.
            </p>

            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or
              </p>
              <Link 
                href="/auth/signin" 
                className="btn-ghost inline-block"
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