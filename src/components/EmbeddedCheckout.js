// Embedded Stripe Checkout Component
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Simple dark mode detection (fallback)
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const checkDarkMode = () => {
        const isDarkMode = 
          document.documentElement.classList.contains('dark') ||
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(isDarkMode);
      };

      checkDarkMode();

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const observer = new MutationObserver(checkDarkMode);
      
      mediaQuery.addEventListener('change', checkDarkMode);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => {
        mediaQuery.removeEventListener('change', checkDarkMode);
        observer.disconnect();
      };
    } catch (error) {
      console.warn('Dark mode detection failed:', error);
    }
  }, []);

  return isDark;
};

// Inline Stripe appearance configuration
const getStripeAppearance = (isDark = false) => ({
  theme: isDark ? 'night' : 'stripe',
  variables: {
    colorPrimary: '#3B82F6',
    colorBackground: isDark ? '#1F2937' : '#ffffff',
    colorText: isDark ? '#F9FAFB' : '#1F2937',
    colorDanger: '#EF4444',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    spacingUnit: '4px',
    borderRadius: '8px',
  },
  rules: {
    '.Input': {
      backgroundColor: isDark ? '#374151' : '#ffffff',
      border: isDark ? '1px solid #4B5563' : '1px solid #D1D5DB',
      color: isDark ? '#F9FAFB' : '#1F2937',
    },
    '.Input:focus': {
      border: '2px solid #3B82F6',
      boxShadow: '0 0 0 1px #3B82F6',
    },
    '.Label': {
      color: isDark ? '#D1D5DB' : '#374151',
      fontSize: '14px',
      fontWeight: '500',
    },
    '.Tab': {
      backgroundColor: isDark ? '#374151' : '#F3F4F6',
      color: isDark ? '#D1D5DB' : '#4B5563',
      border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
    },
    '.Tab:hover': {
      backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
    },
    '.Tab--selected': {
      backgroundColor: isDark ? '#1F2937' : '#ffffff',
      color: isDark ? '#F9FAFB' : '#1F2937',
      border: '2px solid #3B82F6',
    },
    '.Block': {
      backgroundColor: isDark ? '#374151' : '#ffffff',
      border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
    },
    '.BlockDivider': {
      backgroundColor: isDark ? '#4B5563' : '#E5E7EB',
    },
    '.AccordionItem': {
      backgroundColor: isDark ? '#374151' : '#ffffff',
      border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
    },
    '.AccordionItem--selected': {
      backgroundColor: isDark ? '#1F2937' : '#F9FAFB',
    }
  }
});

export default function EmbeddedCheckoutComponent({ tier, onSuccess, onCancel }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stripe, setStripe] = useState(null);
  const isDark = useDarkMode();

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
    appearance: getStripeAppearance(isDark),
    onComplete: () => {
      if (onSuccess) onSuccess();
    }
  } : null;

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
        <p className={`text-sm mb-4 ${
          isDark ? 'text-red-300' : 'text-red-600'
        }`}>
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
              className={`text-sm px-4 py-2 rounded-md transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
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
        <div className={`embedded-checkout-container ${
          isDark ? 'dark-checkout' : 'light-checkout'
        }`}>
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