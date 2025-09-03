// Embedded Stripe Checkout Component
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function EmbeddedCheckoutComponent({ tier, onSuccess, onCancel }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stripe, setStripe] = useState(null);

  // Load Stripe
  useEffect(() => {
    stripePromise.then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);

  useEffect(() => {
    if (!tier) return;
    
    // Create embedded checkout session
    const createCheckoutSession = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/stripe/create-embedded-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tier }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }

        if (!data.clientSecret) {
          setError('No client secret received from server');
          setLoading(false);
          return;
        }

        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (err) {
        setError('Failed to initialize checkout: ' + err.message);
        setLoading(false);
      }
    };

    createCheckoutSession();
  }, [tier]);

  const options = clientSecret ? {
    clientSecret,
    onComplete: () => {
      if (onSuccess) onSuccess();
    }
  } : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <span className="ml-4 text-gray-600 dark:text-gray-300">
          Loading secure checkout...
        </span>
      </div>
    );
  }

  const handleHostedCheckout = async () => {
    try {
      const response = await fetch('/api/stripe/create-hosted-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Failed to create checkout session');
      }
    } catch (err) {
      setError('Failed to initialize checkout');
    }
  };

  if (error) {
    return (
      <div className="rounded-lg p-6 border bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <h3 className="font-medium mb-2 text-red-800 dark:text-red-200">
          Checkout Error
        </h3>
        <p className="text-sm mb-4 text-red-600 dark:text-red-300">
          {error}
        </p>
        <div className="flex gap-3">
          <button 
            onClick={handleHostedCheckout}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md transition-colors"
          >
            Continue with Stripe
          </button>
          {onCancel && (
            <button 
              onClick={onCancel}
              className="text-sm px-4 py-2 rounded-md transition-colors bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  // Don't render anything until we have both Stripe and clientSecret
  if (!stripe || !clientSecret || !options) {
    return loading ? (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-4 text-gray-600 dark:text-gray-400">
          Loading secure checkout...
        </span>
      </div>
    ) : (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Unable to load embedded checkout
        </p>
        <button 
          onClick={handleHostedCheckout}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          Continue with Stripe Checkout
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
        Debug: Stripe loaded: {stripe ? 'Yes' : 'No'}, Client Secret: {clientSecret ? 'Present' : 'Missing'}
      </div>
      <EmbeddedCheckoutProvider stripe={stripe} options={options}>
        <div className="embedded-checkout-container">
          <EmbeddedCheckout />
          <div className="mt-4 text-center">
            <button 
              onClick={handleHostedCheckout}
              className="text-sm text-primary-600 hover:text-primary-700 underline"
            >
              Having trouble? Try hosted checkout instead
            </button>
          </div>
        </div>
      </EmbeddedCheckoutProvider>
      
      <style jsx>{`
        .embedded-checkout-container {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(229, 231, 235, 0.5);
        }
      `}</style>
    </div>
  );
}