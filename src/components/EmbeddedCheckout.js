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

  useEffect(() => {
    // Create embedded checkout session
    const createCheckoutSession = async () => {
      try {
        const response = await fetch('/api/stripe/create-embedded-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tier }),
        });

        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
          return;
        }

        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (err) {
        setError('Failed to initialize checkout');
        setLoading(false);
      }
    };

    createCheckoutSession();
  }, [tier]);

  const options = {
    clientSecret,
    onComplete: () => {
      // Handle successful payment
      if (onSuccess) onSuccess();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <span className="ml-4 text-gray-600 dark:text-gray-400">Loading checkout...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h3 className="text-red-800 dark:text-red-200 font-medium mb-2">
          Checkout Error
        </h3>
        <p className="text-red-600 dark:text-red-300 text-sm">
          {error}
        </p>
        {onCancel && (
          <button 
            onClick={onCancel}
            className="mt-4 btn-secondary text-sm"
          >
            Go Back
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <div className="embedded-checkout-container">
          <EmbeddedCheckout />
        </div>
      </EmbeddedCheckoutProvider>
      
      <style jsx>{`
        .embedded-checkout-container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}