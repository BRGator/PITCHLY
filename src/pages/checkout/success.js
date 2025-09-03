// Checkout success page for embedded Stripe checkout
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function CheckoutSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [status, setStatus] = useState('loading');
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    if (session_id) {
      verifyCheckoutSession();
    }
  }, [session_id]);

  const verifyCheckoutSession = async () => {
    try {
      const response = await fetch(`/api/stripe/verify-checkout?session_id=${session_id}`);
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setSessionData(data.session);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Checkout verification error:', error);
      setStatus('error');
    }
  };

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Processing Payment - PITCHLY</title>
        </Head>
        <div className="min-h-screen gradient-bg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Processing your payment...</h2>
            <p className="text-blue-100">Please wait while we confirm your subscription.</p>
          </div>
        </div>
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <Head>
          <title>Payment Error - PITCHLY</title>
        </Head>
        <div className="min-h-screen gradient-bg flex items-center justify-center">
          <div className="max-w-md w-full card-premium p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Payment Verification Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't verify your payment. Please contact support if you believe this is an error.
            </p>
            
            <div className="space-y-3">
              <Link href="/upgrade" className="btn-primary w-full block">
                Try Again
              </Link>
              <Link href="/contact" className="btn-secondary w-full block">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Welcome to {sessionData?.tier ? `${sessionData.tier} Plan` : 'PITCHLY'} - PITCHLY</title>
      </Head>
      
      <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              🎉 Welcome to PITCHLY!
            </h1>
            <p className="text-blue-100 text-lg">
              Your subscription is now active
            </p>
          </div>

          {/* Success Card */}
          <div className="card-premium p-8 text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Subscription Activated
            </h2>
            
            {sessionData && (
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 capitalize">
                  {sessionData.tier} Plan
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {sessionData.tier === 'professional' ? '100 proposals per month' : 'Unlimited proposals'}
                </p>
              </div>
            )}
            
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Instant access to all premium features</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Advanced AI proposal generation</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Custom templates & analytics</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/dashboard" className="btn-primary w-full block text-center">
              Go to Dashboard
            </Link>
            <Link href="/proposals/new" className="btn-secondary w-full block text-center">
              Create Your First Proposal
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-blue-100 text-sm mt-6">
            Need help getting started? Check out our{' '}
            <Link href="/help" className="underline hover:text-white">
              getting started guide
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}