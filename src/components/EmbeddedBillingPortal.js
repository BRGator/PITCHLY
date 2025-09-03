// Embedded Billing Management Component
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDarkMode } from '../utils/darkMode';

export default function EmbeddedBillingPortal() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const isDark = useDarkMode();

  useEffect(() => {
    if (session) {
      fetchBillingData();
    }
  }, [session]);

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/stripe/billing-data');
      const data = await response.json();
      
      if (data.subscription) {
        setSubscription(data.subscription);
        setPaymentMethods(data.paymentMethods || []);
        setInvoices(data.invoices || []);
      }
    } catch (error) {
      console.error('Error fetching billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
      });
      
      if (response.ok) {
        await fetchBillingData();
        alert('Subscription cancelled successfully');
      } else {
        alert('Failed to cancel subscription');
      }
    } catch (error) {
      alert('Error cancelling subscription');
    }
  };

  const handleUpdatePaymentMethod = async () => {
    try {
      const response = await fetch('/api/stripe/update-payment-method', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.setupIntent) {
        // Redirect to Stripe's payment method update form
        window.location.href = data.url;
      }
    } catch (error) {
      alert('Error updating payment method');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No Active Subscription
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You don't have an active subscription yet.
        </p>
        <button 
          onClick={() => window.location.href = '/upgrade'}
          className="btn-primary"
        >
          View Plans
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subscription Overview */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Current Plan
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscription.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {subscription.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Plan</p>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">
              {subscription.tier} Plan
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Next billing date</p>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleUpdatePaymentMethod}
            className="btn-secondary flex-1"
          >
            Update Payment Method
          </button>
          <button 
            onClick={handleCancelSubscription}
            className="btn-danger flex-1"
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Payment Methods
        </h3>
        
        {paymentMethods.length > 0 ? (
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-6 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {method.card?.brand?.toUpperCase() || 'CARD'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      **** **** **** {method.card?.last4}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Expires {method.card?.exp_month}/{method.card?.exp_year}
                    </p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400 px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No payment methods on file.</p>
        )}
      </div>

      {/* Invoices */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Billing History
        </h3>
        
        {invoices.length > 0 ? (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {new Date(invoice.created * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Invoice #{invoice.number}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    ${(invoice.amount_paid / 100).toFixed(2)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
                <a 
                  href={invoice.hosted_invoice_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm"
                >
                  View →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No invoices found.</p>
        )}
      </div>
    </div>
  );
}