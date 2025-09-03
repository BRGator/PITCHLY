// Embedded Stripe Checkout Component
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { useDarkMode, getStripeAppearance } from '../utils/darkMode';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function EmbeddedCheckoutComponent({ tier, onSuccess, onCancel }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDark = useDarkMode();

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
  }, [tier, isDark]); // Re-create session when dark mode changes for better theming

  const options = {
    clientSecret,
    appearance: getStripeAppearance(isDark),
    onComplete: () => {
      // Handle successful payment
      if (onSuccess) onSuccess();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          isDark ? 'border-primary-400' : 'border-primary-600'
        }`}></div>
        <span className={`ml-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading secure checkout...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-lg p-6 border ${
        isDark 
          ? 'bg-red-900/20 border-red-800' 
          : 'bg-red-50 border-red-200'
      }`}>
        <h3 className={`font-medium mb-2 ${
          isDark ? 'text-red-200' : 'text-red-800'
        }`}>
          Checkout Error
        </h3>
        <p className={`text-sm ${
          isDark ? 'text-red-300' : 'text-red-600'
        }`}>
          {error}
        </p>
        {onCancel && (
          <button 
            onClick={onCancel}
            className={`mt-4 text-sm px-4 py-2 rounded-md transition-colors ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
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
        <div className={`embedded-checkout-container ${
          isDark ? 'dark-checkout' : 'light-checkout'
        }`}>
          <EmbeddedCheckout />
        </div>
      </EmbeddedCheckoutProvider>
      
      <style jsx>{`
        .embedded-checkout-container {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .light-checkout {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(229, 231, 235, 0.5);
        }
        .dark-checkout {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(75, 85, 99, 0.5);
          background: #1F2937;
        }
      `}</style>
    </div>
  );
}