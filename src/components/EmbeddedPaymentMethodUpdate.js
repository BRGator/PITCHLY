// Embedded Payment Method Update Component
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

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

function PaymentMethodForm({ clientSecret, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isDark = useDarkMode();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) {
        setError(error.message);
      } else {
        // Payment method updated successfully
        onSuccess();
      }
    } catch (err) {
      setError('Failed to update payment method');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: isDark ? '#F9FAFB' : '#1F2937',
        backgroundColor: isDark ? '#374151' : '#ffffff',
        '::placeholder': {
          color: isDark ? '#9CA3AF' : '#6B7280',
        },
      },
      invalid: {
        color: '#EF4444',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Update Payment Method
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Enter your new card details below to update your payment method.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`p-4 border rounded-lg ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-300'
        }`}>
          <CardElement options={cardElementOptions} />
        </div>

        {error && (
          <div className={`p-4 rounded-lg border ${
            isDark 
              ? 'bg-red-900/20 border-red-800 text-red-300' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {loading ? 'Updating...' : 'Update Payment Method'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EmbeddedPaymentMethodUpdate({ onSuccess, onCancel }) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createSetupIntent = async () => {
      try {
        const response = await fetch('/api/stripe/update-payment-method', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
          return;
        }

        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (err) {
        setError('Failed to initialize payment method update');
        setLoading(false);
      }
    };

    createSetupIntent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-4 text-gray-600 dark:text-gray-400">
          Loading payment method form...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button 
          onClick={onCancel}
          className="btn-secondary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentMethodForm 
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
}