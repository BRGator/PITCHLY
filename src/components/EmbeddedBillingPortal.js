// Embedded Billing Management Component
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import EmbeddedPaymentMethodUpdate from './EmbeddedPaymentMethodUpdate';
import { useI18n } from '../lib/i18n';

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

export default function EmbeddedBillingPortal() {
  const { t } = useI18n();
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [showPaymentMethodUpdate, setShowPaymentMethodUpdate] = useState(false);
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
    if (!confirm(t('billing.cancelConfirm'))) {
      return;
    }

    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
      });
      
      if (response.ok) {
        await fetchBillingData();
        alert(t('billing.subscriptionCancelled'));
      } else {
        alert(t('billing.cancelFailed'));
      }
    } catch (error) {
      alert(t('billing.cancelError'));
    }
  };

  const handleUpdatePaymentMethod = async () => {
    console.log('Update payment method clicked');
    setShowPaymentMethodUpdate(true);
  };

  const handlePaymentMethodSuccess = async () => {
    setShowPaymentMethodUpdate(false);
    await fetchBillingData(); // Refresh billing data
    alert(t('billing.paymentMethodUpdated'));
  };

  const handlePaymentMethodCancel = () => {
    setShowPaymentMethodUpdate(false);
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
          {t('billing.noActiveSubscription')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t('billing.noActiveSubscriptionDesc')}
        </p>
        <button 
          onClick={() => window.location.href = '/upgrade'}
          className="btn-primary"
        >
          {t('billing.viewPlans')}
        </button>
      </div>
    );
  }

  // Show payment method update modal if requested
  if (showPaymentMethodUpdate) {
    return (
      <div className="card-premium p-6">
        <EmbeddedPaymentMethodUpdate
          onSuccess={handlePaymentMethodSuccess}
          onCancel={handlePaymentMethodCancel}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subscription Overview */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t('billing.currentPlan')}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscription.status === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {subscription.status === 'active' ? t('billing.active') : t('billing.inactive')}
          </span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('billing.plan')}</p>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize">
              {subscription.tier} {t('billing.plan')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('billing.nextBillingDate')}</p>
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
            {t('billing.updatePaymentMethod')}
          </button>
          <button 
            onClick={handleCancelSubscription}
            className="btn-danger flex-1"
          >
            {t('billing.cancelSubscription')}
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t('billing.paymentMethods')}
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
                      {t('billing.expires')} {method.card?.exp_month}/{method.card?.exp_year}
                    </p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400 px-2 py-1 rounded">
                    {t('billing.default')}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">{t('billing.noPaymentMethods')}</p>
        )}
      </div>

      {/* Invoices */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {t('billing.billingHistory')}
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
                    {t('billing.invoice')} #{invoice.number}
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
                  {t('billing.view')}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">{t('billing.noInvoices')}</p>
        )}
      </div>
    </div>
  );
}