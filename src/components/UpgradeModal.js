import { useState } from 'react';
import Link from 'next/link';

export default function UpgradeModal({ isOpen, onClose, feature, subscription }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const featureDetails = {
    templates: {
      icon: '📋',
      title: 'Custom Proposal Templates',
      description: 'Save and reuse your best proposals as templates',
      benefits: [
        'Save unlimited custom templates',
        'Organize templates by project type',
        'Share templates with team members',
        'Template usage analytics'
      ]
    },
    analytics: {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Track your proposal performance and win rates',
      benefits: [
        'Detailed proposal analytics',
        'Conversion rate tracking',
        'Revenue projections',
        'Performance insights'
      ]
    },
    unlimited: {
      icon: '∞',
      title: 'Unlimited Proposals',
      description: 'Create as many proposals as you need',
      benefits: [
        'Unlimited proposal generation',
        'No monthly limits',
        'Priority AI processing',
        'Advanced customization options'
      ]
    },
    export: {
      icon: '📄',
      title: 'Advanced Export Options',
      description: 'Export proposals in multiple formats',
      benefits: [
        'Export to PDF, Word, and more',
        'Custom branding and layouts',
        'Bulk export capabilities',
        'Integration with other tools'
      ]
    }
  };

  const currentFeature = featureDetails[feature] || featureDetails.unlimited;
  const currentTier = subscription?.tier || 'free';

  const pricingTiers = [
    {
      name: 'Professional',
      price: '$29',
      period: 'month',
      popular: true,
      features: [
        '100 proposals per month',
        'Custom templates',
        'Advanced analytics',
        'Priority support',
        'Export to PDF/Word',
        'Team collaboration'
      ]
    },
    {
      name: 'Agency',
      price: '$99',
      period: 'month',
      popular: false,
      features: [
        'Unlimited proposals',
        'White-label branding',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'All Professional features'
      ]
    }
  ];

  const handleUpgrade = async (tier) => {
    // Close modal first
    onClose();
    
    // Redirect to upgrade page instead of trying to process payment directly
    window.location.href = '/upgrade';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{currentFeature.icon}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {currentFeature.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentFeature.description}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            What you'll get:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {currentFeature.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Options */}
        <div className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Choose Your Plan
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Unlock powerful features to grow your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 rounded-xl border-2 ${
                  tier.popular
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {tier.name}
                  </h4>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      {tier.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      /{tier.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(tier.name.toLowerCase())}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : `Upgrade to ${tier.name}`}
                </button>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-green-700 dark:text-green-300 font-medium">
                30-day money-back guarantee
              </span>
            </div>
          </div>

          {/* Contact Sales */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Need a custom solution? {' '}
              <Link href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                Contact our sales team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}