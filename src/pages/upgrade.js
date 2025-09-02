import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import UsageDashboard from '../components/UsageDashboard';

export default function UpgradePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (tier) => {
    if (!session) {
      router.push('/auth/signin?from=upgrade');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const data = await response.json();
      
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      alert(`Error: ${error.message}\n\nPlease ensure your Stripe credentials are configured correctly.`);
    } finally {
      setLoading(false);
    }
  };

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      current: true,
      features: [
        '3 proposals per month',
        'Basic AI generation',
        'Standard templates',
        'Email support'
      ],
      limitations: [
        'Limited proposals',
        'No custom templates',
        'No analytics',
        'No team features'
      ]
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'month',
      description: 'For serious freelancers and consultants',
      popular: true,
      features: [
        '100 proposals per month',
        'Custom template creation',
        'Advanced analytics & insights',
        'Priority AI processing',
        'Export to PDF/Word',
        'Priority support',
        'Team collaboration tools'
      ]
    },
    {
      name: 'Agency',
      price: '$99',
      period: 'month',
      description: 'For agencies and larger teams',
      features: [
        'Unlimited proposals',
        'White-label branding',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced team management',
        'All Professional features'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Upgrade Your Plan - PITCHLY</title>
        <meta name="description" content="Upgrade to unlock powerful features and grow your business with PITCHLY" />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link href="/dashboard" className="btn-ghost mr-4">
                ← Back to Dashboard
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Unlock powerful features to create better proposals and win more clients
            </p>
          </div>

          {/* Current Usage (if logged in) */}
          {session && (
            <div className="mb-12 max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Your Current Usage
              </h2>
              <UsageDashboard />
            </div>
          )}

          {/* Pricing Cards */}
          <div id="pricing-plans" className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-8 rounded-2xl border-2 ${
                  tier.popular
                    ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-2xl scale-105'
                    : tier.current
                    ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-600'
                } transition-all duration-300`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {tier.current && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {tier.description}
                  </p>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                      {tier.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      /{tier.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.limitations && (
                  <ul className="space-y-2 mb-8 opacity-75">
                    {tier.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => handleUpgrade(tier.name.toLowerCase())}
                  disabled={loading || tier.current}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                    tier.current
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : tier.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 
                   tier.current ? 'Current Plan' : 
                   tier.name === 'Free' ? 'Get Started Free' :
                   `Upgrade to ${tier.name}`}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Can I change plans anytime?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    What happens to my proposals if I downgrade?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All your existing proposals remain accessible. You'll just be limited by your new plan's monthly limits.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Do you offer refunds?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes, we offer a 30-day money-back guarantee for all paid plans.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Need a custom plan?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Contact our sales team for enterprise solutions and custom pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}