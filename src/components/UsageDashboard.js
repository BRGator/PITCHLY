import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useNotification } from './Notification';
import Link from 'next/link';

export default function UsageDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showNotification, NotificationComponent } = useNotification();

  useEffect(() => {
    const fetchUsage = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch('/api/subscription/check-limits');
        const data = await response.json();
        
        if (response.ok) {
          setUsage(data);
        }
      } catch (error) {
        console.error('Error fetching usage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [session]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!usage) return null;

  const { subscription, usage: usageData } = usage;
  const tierInfo = {
    free: { name: 'Free', color: 'gray', bgColor: 'bg-gray-100 dark:bg-gray-700' },
    professional: { name: 'Professional', color: 'blue', bgColor: 'bg-blue-100 dark:bg-blue-900' },
    agency: { name: 'Agency', color: 'purple', bgColor: 'bg-purple-100 dark:bg-purple-900' }
  };

  const currentTier = tierInfo[subscription?.tier] || tierInfo.free;
  const progressPercentage = usageData.unlimited 
    ? 100 
    : Math.min((usageData.used / usageData.limit) * 100, 100);

  const isNearLimit = !usageData.unlimited && usageData.remaining <= 1;
  const isAtLimit = !usageData.unlimited && usageData.remaining === 0;

  const handleUpgradeClick = () => {
    // If we're on the upgrade page, scroll to pricing section
    if (router.pathname === '/upgrade') {
      const pricingSection = document.getElementById('pricing-plans');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Otherwise, navigate to upgrade page
      router.push('/upgrade');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Your Plan & Usage
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${currentTier.bgColor} text-${currentTier.color}-800 dark:text-${currentTier.color}-200`}>
          {currentTier.name}
        </span>
      </div>

      {/* Usage Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Proposals This Month
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {usageData.unlimited 
              ? `${usageData.used} used`
              : `${usageData.used} / ${usageData.limit}`
            }
          </span>
        </div>
        
        {!usageData.unlimited && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                isAtLimit 
                  ? 'bg-red-500' 
                  : isNearLimit 
                    ? 'bg-yellow-500' 
                    : 'bg-primary-600'
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        )}
        
        {usageData.unlimited && (
          <div className="w-full bg-green-200 dark:bg-green-700 rounded-full h-2">
            <div className="w-full h-2 rounded-full bg-green-500"></div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {isAtLimit && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-red-800 dark:text-red-200">Limit Reached</p>
              <p className="text-sm text-red-700 dark:text-red-300">
                You've used all {usageData.limit} proposals this month. Upgrade to continue creating proposals.
              </p>
            </div>
          </div>
        </div>
      )}

      {isNearLimit && !isAtLimit && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">Almost at Limit</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Only {usageData.remaining} proposal{usageData.remaining === 1 ? '' : 's'} remaining this month.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade CTA or Billing Management */}
      {subscription?.tier === 'free' ? (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Get unlimited proposals and advanced features
            </p>
            <button 
              onClick={handleUpgradeClick}
              className="btn-primary text-sm"
            >
              ⭐ Upgrade to Professional
            </button>
          </div>
        </div>
      ) : subscription?.tier === 'professional' ? (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Manage your subscription and billing
              </div>
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/stripe/billing-portal', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' }
                    });
                    const data = await response.json();
                    if (data.url) {
                      window.location.href = data.url;
                    } else {
                      if (data.action === 'upgrade') {
                        showNotification(data.message + ' Click here to upgrade.', 'warning');
                      } else {
                        showNotification(data.message || 'Unable to access billing portal', 'error');
                      }
                    }
                  } catch (error) {
                    console.error('Billing portal error:', error);
                    showNotification('Unable to access billing portal. Please try again.', 'error');
                  }
                }}
                className="btn-ghost text-sm"
              >
                💳 Manage Billing
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Need more power? Upgrade to Agency for unlimited proposals and team features
              </p>
              <button 
                onClick={handleUpgradeClick}
                className="btn-secondary text-sm"
              >
                🚀 Upgrade to Agency
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Manage your subscription and billing
            </div>
            <button 
              onClick={async () => {
                try {
                  const response = await fetch('/api/stripe/billing-portal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                  });
                  const data = await response.json();
                  if (data.url) {
                    window.location.href = data.url;
                  } else {
                    if (data.action === 'upgrade') {
                      showNotification(data.message + ' Click here to upgrade.', 'warning');
                    } else {
                      showNotification(data.message || 'Unable to access billing portal', 'error');
                    }
                  }
                } catch (error) {
                  console.error('Billing portal error:', error);
                  showNotification('Unable to access billing portal. Please try again.', 'error');
                }
              }}
              className="btn-ghost text-sm"
            >
              💳 Manage Billing
            </button>
          </div>
        </div>
      )}

      {/* Next Billing Period */}
      {subscription?.current_period_end && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {subscription.tier === 'free' ? 'Usage resets' : 'Next billing period'}: {' '}
            {new Date(subscription.current_period_end).toLocaleDateString()}
          </p>
        </div>
      )}
      
      {/* Notifications */}
      <NotificationComponent />
    </div>
  );
}