// Embedded Stripe Checkout Component
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

console.log('Loading Stripe with key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'configured' : 'missing');
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
  const isDark = useDarkMode();

  useEffect(() => {
    // Create embedded checkout session
    const createCheckoutSession = async () => {
      try {
        console.log('Creating checkout session for tier:', tier);
        const response = await fetch('/api/stripe/create-embedded-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tier }),
        });

        const data = await response.json();
        console.log('Checkout session response:', data);
        
        if (data.error) {
          console.error('Checkout session error:', data.error);
          setError(data.error);
          return;
        }

        if (!data.clientSecret) {
          console.error('No client secret received');
          setError('No client secret received from server');
          return;
        }

        console.log('Setting client secret:', data.clientSecret.substring(0, 20) + '...');
        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (err) {
        console.error('Checkout session creation error:', err);
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
      console.log('Stripe checkout completed!');
      if (onSuccess) onSuccess();
    }
  };

  console.log('EmbeddedCheckout options:', {
    hasClientSecret: !!clientSecret,
    clientSecretStart: clientSecret ? clientSecret.substring(0, 10) : 'none',
    appearance: options.appearance.theme
  });

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

  // Check if Stripe is loaded
  const [stripeReady, setStripeReady] = useState(false);
  
  useEffect(() => {
    stripePromise.then((stripe) => {
      console.log('Stripe loaded:', !!stripe);
      setStripeReady(!!stripe);
    });
  }, []);

  return (
    <div className="w-full">
      {console.log('Rendering EmbeddedCheckout:', {
        clientSecret: clientSecret ? 'Present' : 'Missing',
        stripeReady,
        hasOptions: !!options
      })}
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