import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import UsageDashboard from '../components/UsageDashboard';
import EmbeddedCheckout from '../components/EmbeddedCheckout';
import { useI18n } from '../lib/i18n';

export default function UpgradePage() {
  const { t } = useI18n();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  // Fetch user's subscription if logged in
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session?.user?.id) {
        setSubscription(null);
        return;
      }

      try {
        const response = await fetch('/api/subscription/check-limits');
        const data = await response.json();
        if (response.ok) {
          setSubscription(data.subscription);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchSubscription();
  }, [session]);

  const handleUpgrade = async (tier) => {
    if (!session) {
      router.push('/auth/signin?from=upgrade');
      return;
    }

    // Handle free tier differently - no Stripe checkout needed
    if (tier === 'free') {
      router.push('/dashboard');
      return;
    }

    // Show embedded checkout instead of redirecting
    setSelectedTier(tier);
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    setSelectedTier(null);
    router.push('/dashboard');
  };

  const handleCheckoutCancel = () => {
    setShowCheckout(false);
    setSelectedTier(null);
  };

  // Check if a plan is the user's current plan
  const isCurrentPlan = (planName) => {
    if (!subscription) return false;
    
    const tierMapping = {
      'Free': 'free',
      'Professional': 'professional', 
      'Agency': 'agency'
    };
    
    return subscription.tier === tierMapping[planName];
  };

  const pricingTiers = [
    {
      id: 'free',
      name: t('upgrade.plans.free.name'),
      price: '$0',
      period: t('upgrade.plans.free.period'),
      description: t('upgrade.plans.free.description'),
      features: [
        t('upgrade.plans.free.features.proposalsPerMonth'),
        t('upgrade.plans.free.features.basicAI'),
        t('upgrade.plans.free.features.standardTemplates'),
        t('upgrade.plans.free.features.emailSupport')
      ],
      limitations: [
        t('upgrade.plans.free.limitations.limitedProposals'),
        t('upgrade.plans.free.limitations.noCustomTemplates'),
        t('upgrade.plans.free.limitations.noAnalytics'),
        t('upgrade.plans.free.limitations.noTeamFeatures')
      ]
    },
    {
      id: 'professional',
      name: t('upgrade.plans.professional.name'),
      price: '$29',
      period: t('upgrade.plans.professional.period'),
      description: t('upgrade.plans.professional.description'),
      popular: true,
      features: [
        t('upgrade.plans.professional.features.proposalsPerMonth'),
        t('upgrade.plans.professional.features.customTemplates'),
        t('upgrade.plans.professional.features.analytics'),
        t('upgrade.plans.professional.features.priorityAI'),
        t('upgrade.plans.professional.features.exportPDF'),
        t('upgrade.plans.professional.features.prioritySupport'),
        t('upgrade.plans.professional.features.teamTools')
      ]
    },
    {
      id: 'agency',
      name: t('upgrade.plans.agency.name'),
      price: '$99',
      period: t('upgrade.plans.agency.period'),
      description: t('upgrade.plans.agency.description'),
      features: [
        t('upgrade.plans.agency.features.unlimitedProposals'),
        t('upgrade.plans.agency.features.whiteLabel'),
        t('upgrade.plans.agency.features.apiAccess'),
        t('upgrade.plans.agency.features.customIntegrations'),
        t('upgrade.plans.agency.features.accountManager'),
        t('upgrade.plans.agency.features.teamManagement'),
        t('upgrade.plans.agency.features.allProfessional')
      ]
    }
  ];

  // Show embedded checkout if selected
  if (showCheckout && selectedTier) {
    return (
      <>
        <Head>
          <title>{t('upgrade.checkoutTitle')} - PITCHLY</title>
        </Head>

        <Navbar />
        
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
          <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
              <button 
                onClick={handleCheckoutCancel}
                className="btn-ghost mb-4"
              >
                {t('upgrade.backToPlans')}
              </button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {t('upgrade.upgradeToTier', { tier: selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1) })}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('upgrade.checkoutDescription')}
              </p>
            </div>

            <EmbeddedCheckout 
              tier={selectedTier}
              onSuccess={handleCheckoutSuccess}
              onCancel={handleCheckoutCancel}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t('upgrade.pageTitle')} - PITCHLY</title>
        <meta name="description" content={t('upgrade.pageDescription')} />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link href="/dashboard" className="btn-ghost mr-4">
                {t('upgrade.backToDashboard')}
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('upgrade.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('upgrade.subtitle')}
            </p>
          </div>

          {/* Current Usage (if logged in) */}
          {session && (
            <div className="mb-12 max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                {t('upgrade.currentUsage')}
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
                  tier.popular && !isCurrentPlan(tier.name)
                    ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-2xl scale-105'
                    : isCurrentPlan(tier.name)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-600'
                } transition-all duration-300`}
              >
                {isCurrentPlan(tier.name) && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      {t('upgrade.currentPlan')}
                    </span>
                  </div>
                )}

                {tier.popular && !isCurrentPlan(tier.name) && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                      {t('upgrade.mostPopular')}
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
                  onClick={() => handleUpgrade(tier.id)}
                  disabled={loading || isCurrentPlan(tier.name)}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                    isCurrentPlan(tier.name)
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : tier.popular && !isCurrentPlan(tier.name)
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? t('upgrade.processing') : 
                   isCurrentPlan(tier.name) ? t('upgrade.currentPlan') : 
                   tier.name === t('upgrade.plans.free.name') ? t('upgrade.getStartedFree') :
                   t('upgrade.upgradeToTier', { tier: tier.name })}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
              {t('upgrade.faq.title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('upgrade.faq.changePlans.question')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('upgrade.faq.changePlans.answer')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('upgrade.faq.downgrade.question')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('upgrade.faq.downgrade.answer')}
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('upgrade.faq.refunds.question')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('upgrade.faq.refunds.answer')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('upgrade.faq.customPlan.question')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('upgrade.faq.customPlan.answer')}
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