import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ProposalForm from '../components/ProposalForm';
import EmbeddedCheckout from '../components/EmbeddedCheckout';

export default function Home() {
  const { data: session } = useSession();
  const [showDemo, setShowDemo] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [contractingFeature, setContractingFeature] = useState(null);
  const [hoverTimer, setHoverTimer] = useState(null);
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

  // Handle pricing plan clicks
  const handlePlanClick = async (planName) => {
    if (!session) {
      // Not logged in - redirect to signin
      signIn();
      return;
    }

    // User is logged in
    if (planName === 'Starter') {
      // Free plan - go to dashboard
      window.location.href = '/dashboard';
      return;
    }

    // For paid plans, show embedded checkout
    setSelectedTier(planName.toLowerCase());
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    setSelectedTier(null);
    window.location.href = '/dashboard';
  };

  const handleCheckoutCancel = () => {
    setShowCheckout(false);
    setSelectedTier(null);
  };

  // Check if a plan is the user's current plan
  const isCurrentPlan = (planName) => {
    if (!subscription) return false;
    
    const tierMapping = {
      'Starter': 'free',
      'Professional': 'professional', 
      'Agency': 'agency'
    };
    
    return subscription.tier === tierMapping[planName];
  };

  // Luxury icon component for expanded features
  const LuxuryIcon = ({ type, className = "w-5 h-5" }) => {
    const icons = {
      brain: (
        <svg className={`${className} text-primary-500`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.33 12.91c.09-.45.15-.93.15-1.41 0-3.57-2.52-6.52-5.88-7.23-.64-2.29-2.75-4.02-5.25-4.02-2.5 0-4.61 1.73-5.25 4.02C1.76 4.98-.24 7.93-.24 11.5c0 .48.06.96.15 1.41-.14.23-.24.48-.24.75 0 .83.67 1.5 1.5 1.5.27 0 .52-.1.75-.24.45.09.93.15 1.41.15.48 0 .96-.06 1.41-.15.23.14.48.24.75.24.83 0 1.5-.67 1.5-1.5 0-.27-.1-.52-.24-.75z" opacity="0.7"/>
          <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
          <path d="M12 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor" opacity="0.8"/>
        </svg>
      ),
      target: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <circle cx="12" cy="12" r="6" strokeWidth="2" opacity="0.7"/>
          <circle cx="12" cy="12" r="2" strokeWidth="2" fill="currentColor"/>
        </svg>
      ),
      chart: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      lightning: (
        <svg className={`${className} text-primary-500`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
          <circle cx="15" cy="8" r="1" opacity="0.6"/>
          <circle cx="9" cy="16" r="1" opacity="0.6"/>
        </svg>
      ),
      clock: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
      ),
      rocket: (
        <svg className={`${className} text-primary-500`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.25 2.1l-.35.08c-3.9.87-7 4.45-7.9 8.35l-.05.35c-.05.35-.1.7-.1 1.05 0 .35.05.7.1 1.05l.05.35c.9 3.9 4 7.48 7.9 8.35l.35.08c.35.05.7.1 1.05.1.35 0 .7-.05 1.05-.1l.35-.08c3.9-.87 7-4.45 7.9-8.35l.05-.35c.05-.35.1-.7.1-1.05 0-.35-.05-.7-.1-1.05l-.05-.35c-.9-3.9-4-7.48-7.9-8.35l-.35-.08c-.35-.05-.7-.1-1.05-.1-.35 0-.7.05-1.05.1z" opacity="0.8"/>
          <circle cx="14" cy="10" r="2" fill="white" opacity="0.9"/>
          <path d="M8 16l4-4 4 4-4 4-4-4z" fill="white" opacity="0.7"/>
        </svg>
      ),
      document: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <circle cx="12" cy="8" r="1" fill="currentColor" opacity="0.7"/>
        </svg>
      ),
      gear: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <circle cx="12" cy="12" r="3" strokeWidth="2"/>
        </svg>
      ),
      folder: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          <circle cx="12" cy="13" r="2" strokeWidth="1.5" opacity="0.7"/>
        </svg>
      ),
      save: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          <rect x="9" y="2" width="6" height="4" rx="1" strokeWidth="1.5" opacity="0.7"/>
        </svg>
      ),
      refresh: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          <circle cx="12" cy="12" r="2" strokeWidth="1" opacity="0.6" fill="currentColor"/>
        </svg>
      ),
      lightbulb: (
        <svg className={`${className} text-primary-500`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" opacity="0.8"/>
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" opacity="0.9"/>
          <circle cx="12" cy="9" r="2" fill="white" opacity="0.9"/>
        </svg>
      ),
      trending: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          <circle cx="9" cy="9" r="1" fill="currentColor" opacity="0.8"/>
          <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.6"/>
        </svg>
      ),
      psychology: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          <circle cx="12" cy="10" r="2" strokeWidth="1.5" opacity="0.7"/>
        </svg>
      ),
      dollar: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          <circle cx="12" cy="12" r="10" strokeWidth="2" opacity="0.3"/>
        </svg>
      ),
      search: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <circle cx="11" cy="11" r="3" strokeWidth="1.5" opacity="0.6"/>
        </svg>
      ),
      clipboard: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          <circle cx="12" cy="8" r="1" fill="currentColor" opacity="0.7"/>
        </svg>
      ),
      star: (
        <svg className={`${className} text-primary-500`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.9"/>
          <circle cx="12" cy="10" r="2" fill="white" opacity="0.8"/>
        </svg>
      ),
      analytics: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          <circle cx="7" cy="16" r="1" fill="currentColor" opacity="0.8" />
          <circle cx="13" cy="12" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="19" cy="8" r="1" fill="currentColor" opacity="0.4" />
        </svg>
      ),
      calendar: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <circle cx="9" cy="13" r="1" fill="currentColor" opacity="0.7"/>
          <circle cx="15" cy="13" r="1" fill="currentColor" opacity="0.7"/>
        </svg>
      ),
      shield: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" opacity="0.3"/>
        </svg>
      ),
      globe: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          <circle cx="12" cy="12" r="4" strokeWidth="1" opacity="0.4"/>
        </svg>
      ),
      users: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
          <circle cx="9" cy="7" r="2" strokeWidth="1.5" opacity="0.7"/>
          <circle cx="15" cy="7" r="2" strokeWidth="1.5" opacity="0.5"/>
        </svg>
      ),
      template: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          <rect x="8" y="14" width="8" height="2" rx="1" strokeWidth="1.5" opacity="0.6"/>
        </svg>
      ),
      palette: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z" opacity="0.6"/>
          <circle cx="17" cy="8" r="2" strokeWidth="2" fill="currentColor" opacity="0.8"/>
          <circle cx="17" cy="16" r="2" strokeWidth="2" fill="currentColor" opacity="0.6"/>
          <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.4"/>
        </svg>
      ),
      mobile: (
        <svg className={`${className} text-primary-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
          <rect x="9" y="6" width="6" height="8" rx="1" strokeWidth="1.5" opacity="0.5"/>
        </svg>
      )
    };
    return icons[type] || icons.gear;
  };

  return (
    <>
      <Head>
        <title>PITCHLY - AI-Powered Proposal Generation | Win More Clients</title>
        <meta name="description" content="Create winning proposals in minutes with AI. Professional, personalized proposals that convert prospects into clients. Trusted by freelancers and agencies worldwide." />
        <meta name="keywords" content="AI proposals, proposal generator, freelance proposals, client proposals, business proposals" />
        <meta property="og:title" content="PITCHLY - AI-Powered Proposal Generation" />
        <meta property="og:description" content="Create winning proposals in minutes with AI. Professional, personalized proposals that convert prospects into clients." />
        <meta property="og:url" content="https://usepitchly.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://usepitchly.com" />
      </Head>

      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="gradient-bg pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gradient">Win More Clients</span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">with AI-Powered Proposals</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your freelance business with professional proposals that convert. 
                Generate personalized, winning proposals in minutes, not hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {session ? (
                  <Link href="/dashboard" className="btn-primary">
                    Go to Dashboard →
                  </Link>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="btn-primary"
                  >
                    Start Creating Proposals
                  </button>
                )}
                <button
                  onClick={() => setShowDemo(!showDemo)}
                  className="btn-secondary"
                >
                  {showDemo ? 'Hide Demo' : 'See How It Works'}
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">10x</div>
                  <div className="text-gray-600 dark:text-gray-400">Faster Proposal Creation</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">85%</div>
                  <div className="text-gray-600 dark:text-gray-400">Higher Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-400">Hours Saved Monthly</div>
                </div>
              </div>
            </div>

            {/* Demo Section */}
            {showDemo && (
              <div className="animate-slide-up">
                <div className="card-premium p-8 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
                    Try It Now - Create Your First Proposal
                  </h3>
                  <ProposalForm />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Everything You Need to <span className="text-gradient">Win Clients</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our AI-powered platform handles the heavy lifting so you can focus on what matters most - your work.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  id: 0,
                  icon: (
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:shadow-3xl animate-pulse-subtle">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <svg className="w-9 h-9 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          <circle cx="12" cy="12" r="1" fill="currentColor"/>
                          <circle cx="8" cy="8" r="0.5" fill="currentColor" opacity="0.7"/>
                          <circle cx="16" cy="16" r="0.5" fill="currentColor" opacity="0.7"/>
                        </svg>
                      </div>
                    </div>
                  ),
                  title: "ProposalAI™ Engine",
                  description: "Our proprietary AI algorithm, trained exclusively on winning proposals, analyzes client requirements and generates persuasive, industry-specific content that converts prospects into clients.",
                  expandedContent: {
                    title: "Advanced ProposalAI™ Technology",
                    details: [
                      { icon: "brain", text: "Trained on 50,000+ winning proposals from top freelancers" },
                      { icon: "target", text: "Industry-specific language patterns and terminology" },
                      { icon: "chart", text: "Conversion-optimized structure and persuasion techniques" },
                      { icon: "lightning", text: "Real-time client requirement analysis and adaptation" },
                      { icon: "refresh", text: "Continuous learning from successful proposal outcomes" },
                      { icon: "lightbulb", text: "Personalized tone matching for different client types" }
                    ]
                  }
                },
                {
                  id: 1,
                  icon: (
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:shadow-3xl animate-pulse-subtle">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <svg className="w-9 h-9 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l2-2M19 10l2-2M21 12l2-2" opacity="0.6" />
                        </svg>
                      </div>
                    </div>
                  ),
                  title: "Lightning Fast Generation",
                  description: "Generate comprehensive proposals in under 2 minutes. No more spending hours crafting the perfect pitch.",
                  expandedContent: {
                    title: "Speed Without Sacrifice",
                    details: [
                      { icon: "clock", text: "Average generation time: 47 seconds for full proposals" },
                      { icon: "rocket", text: "Instant brief analysis and requirement extraction" },
                      { icon: "document", text: "Complete proposals with scope, timeline, and pricing" },
                      { icon: "gear", text: "Real-time editing and refinement capabilities" },
                      { icon: "folder", text: "Multiple format exports (PDF, Word, HTML)" },
                      { icon: "save", text: "Auto-save and version history for all proposals" }
                    ]
                  }
                },
                {
                  id: 2,
                  icon: (
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:shadow-3xl animate-pulse-subtle">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <svg className="w-9 h-9 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                          <circle cx="12" cy="12" r="10" strokeWidth={2} opacity="0.3" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2v2M12 20v2M22 12h-2M4 12H2" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  ),
                  title: "Higher Conversion Rates",
                  description: "Our proposals follow proven frameworks that consistently convert prospects into paying clients.",
                  expandedContent: {
                    title: "Conversion-Optimized Framework",
                    details: [
                      { icon: "trending", text: "85% average acceptance rate vs 30% industry standard" },
                      { icon: "psychology", text: "Psychology-based persuasion techniques built-in" },
                      { icon: "dollar", text: "Value-focused positioning that justifies premium pricing" },
                      { icon: "search", text: "Pain point identification and solution mapping" },
                      { icon: "clipboard", text: "Clear project scopes that prevent scope creep" },
                      { icon: "star", text: "Professional formatting that builds instant credibility" }
                    ]
                  }
                },
                {
                  id: 3,
                  icon: (
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:shadow-3xl animate-pulse-subtle">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <svg className="w-9 h-9 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          <circle cx="7" cy="16" r="1" fill="currentColor" opacity="0.8" />
                          <circle cx="13" cy="14" r="1" fill="currentColor" opacity="0.6" />
                          <circle cx="19" cy="10" r="1" fill="currentColor" opacity="0.4" />
                        </svg>
                      </div>
                    </div>
                  ),
                  title: "Smart Analytics Dashboard",
                  description: "Track which proposals perform best and optimize your approach with data-driven insights.",
                  expandedContent: {
                    title: "Data-Driven Success Insights",
                    details: [
                      { icon: "analytics", text: "Proposal performance tracking and success rates" },
                      { icon: "target", text: "Client engagement metrics (views, time spent, sections read)" },
                      { icon: "lightbulb", text: "AI-powered recommendations for improvement" },
                      { icon: "trending", text: "Revenue attribution and ROI tracking per proposal" },
                      { icon: "search", text: "Industry benchmarking and competitive analysis" },
                      { icon: "calendar", text: "Follow-up reminders and client communication tracking" }
                    ]
                  }
                },
                {
                  id: 4,
                  icon: (
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:shadow-3xl animate-pulse-subtle">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <svg className="w-9 h-9 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          <circle cx="9" cy="11" r="0.5" fill="currentColor" opacity="0.7" />
                          <circle cx="15" cy="11" r="0.5" fill="currentColor" opacity="0.7" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 13v1" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  ),
                  title: "Enterprise Security",
                  description: "Your client data and proposals are encrypted and stored securely. We never share your information.",
                  expandedContent: {
                    title: "Bank-Level Security Standards",
                    details: [
                      { icon: "shield", text: "AES-256 encryption for all data at rest and in transit" },
                      { icon: "shield", text: "SOC 2 Type II compliance and regular security audits" },
                      { icon: "globe", text: "GDPR and CCPA compliant data handling practices" },
                      { icon: "refresh", text: "Automated backups with 99.9% uptime guarantee" },
                      { icon: "shield", text: "Zero data sharing - your proposals remain private" },
                      { icon: "users", text: "Role-based access controls and team permissions" }
                    ]
                  }
                },
                {
                  id: 5,
                  icon: (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-600 via-slate-700 to-gray-800 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110 hover:shadow-3xl animate-pulse-subtle">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                        <svg className="w-9 h-9 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          <circle cx="12" cy="16" r="1" fill="currentColor" />
                          <rect x="10" y="7" width="4" height="2" rx="1" fill="currentColor" opacity="0.6" />
                        </svg>
                      </div>
                    </div>
                  ),
                  title: "Professional Templates",
                  description: "Choose from industry-specific templates designed by successful freelancers and agencies.",
                  expandedContent: {
                    title: "Industry-Specific Templates",
                    details: [
                      { icon: "template", text: "50+ professional templates for every industry" },
                      { icon: "star", text: "Designs by award-winning agencies and top freelancers" },
                      { icon: "template", text: "Web Development, Design, Marketing, Consulting themes" },
                      { icon: "palette", text: "Customizable branding and color schemes" },
                      { icon: "mobile", text: "Mobile-responsive proposal viewing experience" },
                      { icon: "refresh", text: "Regular template updates based on market trends" }
                    ]
                  }
                }
              ].map((feature, index) => {
                const isExpanded = expandedFeature === feature.id;
                const isContracting = contractingFeature === feature.id;
                const showContent = isExpanded || isContracting;
                
                const handleMouseEnter = () => {
                  if (hoverTimer) clearTimeout(hoverTimer);
                  const timer = setTimeout(() => {
                    setExpandedFeature(feature.id);
                  }, 2000); // 2 seconds as requested
                  setHoverTimer(timer);
                };
                
                const handleMouseLeave = () => {
                  if (hoverTimer) {
                    clearTimeout(hoverTimer);
                    setHoverTimer(null);
                  }
                  // Start contracting animation
                  if (expandedFeature === feature.id) {
                    setContractingFeature(feature.id);
                    setExpandedFeature(null);
                    // Remove from contracting state after animation completes
                    setTimeout(() => {
                      setContractingFeature(null);
                    }, 2700); // Match animation duration
                  }
                };
                
                return (
                  <div 
                    key={index} 
                    className={`card p-8 text-center transition-slow transform ${
                      isExpanded 
                        ? 'scale-105 z-10 shadow-3xl bg-gradient-to-br from-white via-primary-50 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800' 
                        : 'hover:scale-102'
                    }`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {feature.icon}
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                    
                    {showContent && (
                      <div className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 overflow-hidden ${
                        isExpanded ? 'animate-expand-slow' : 'animate-contract-slow'
                      }`}>
                        <h4 className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-4">
                          {feature.expandedContent.title}
                        </h4>
                        <div className="space-y-3 text-left">
                          {feature.expandedContent.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-0.5">
                                <LuxuryIcon type={detail.icon} className="w-4 h-4" />
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{detail.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {!showContent && (
                      <div className="mt-4 text-center">
                        <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">Hover for details</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 gradient-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Trusted by <span className="text-gradient">Successful Freelancers</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Join thousands of freelancers who've transformed their proposal process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "UX Designer",
                  initials: "SC",
                  gradientFrom: "from-purple-500",
                  gradientTo: "to-pink-500",
                  quote: "PITCHLY increased my proposal acceptance rate from 30% to 85%. The AI understands exactly what clients want to hear.",
                  rating: 5
                },
                {
                  name: "Marcus Johnson",
                  role: "Marketing Consultant",
                  initials: "MJ",
                  gradientFrom: "from-blue-500",
                  gradientTo: "to-indigo-500",
                  quote: "I used to spend 6 hours per proposal. Now it takes 5 minutes and they're more persuasive than ever.",
                  rating: 5
                },
                {
                  name: "Elena Rodriguez",
                  role: "Web Developer",
                  initials: "ER",
                  gradientFrom: "from-green-500",
                  gradientTo: "to-emerald-500",
                  quote: "The proposals generated by PITCHLY consistently outperform my hand-written ones. It's like having a copywriting expert on my team.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="card-premium p-8 relative">
                  {/* 5-star rating */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradientFrom} ${testimonial.gradientTo} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
                      <span className="text-white font-bold text-lg">{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">{testimonial.name}</div>
                      <div className="text-primary-600 dark:text-primary-400 font-medium">{testimonial.role}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Verified Customer</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Quote icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Simple, <span className="text-gradient">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no long-term contracts.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
              {[
                {
                  name: "Starter",
                  price: "Free",
                  period: "forever",
                  features: ["3 proposals per month", "Basic AI templates", "Email support"],
                  cta: "Get Started",
                  popular: false
                },
                {
                  name: "Professional",
                  price: "$29",
                  period: "per month",
                  features: ["Unlimited proposals", "Advanced AI templates", "Priority support", "Analytics dashboard", "Custom branding"],
                  cta: "Start Free Trial",
                  popular: true
                },
                {
                  name: "Agency",
                  price: "$99",
                  period: "per month",
                  features: ["Everything in Professional", "Team collaboration", "API access", "Custom integrations", "Dedicated account manager"],
                  cta: "Contact Sales",
                  popular: false
                }
              ].map((plan, index) => (
                <div key={index} className={`card-premium p-8 relative ${
                  isCurrentPlan(plan.name) 
                    ? 'ring-4 ring-green-500 bg-green-50 dark:bg-green-900/10' 
                    : plan.popular 
                      ? 'ring-4 ring-primary-500 animate-glow' 
                      : ''
                } flex flex-col h-full`}>
                  {isCurrentPlan(plan.name) && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </div>
                  )}
                  {plan.popular && !isCurrentPlan(plan.name) && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">{plan.price}</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">/ {plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8 text-left flex-grow">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handlePlanClick(plan.name)}
                      disabled={isCurrentPlan(plan.name)}
                      className={`w-full mt-auto transition-all duration-200 ${
                        isCurrentPlan(plan.name)
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : plan.popular 
                            ? 'btn-primary' 
                            : 'btn-secondary'
                      }`}
                    >
                      {isCurrentPlan(plan.name) ? 'Current Plan' : session ? (plan.name === 'Starter' ? 'Switch to Free' : 'Upgrade Now') : plan.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 gradient-bg text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Ready to <span className="text-gradient">Win More Clients?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of successful freelancers using PITCHLY to create winning proposals.
            </p>
            <button
              onClick={() => signIn()}
              className="btn-primary text-lg px-12 py-4 animate-bounce-subtle"
            >
              Start Creating Better Proposals Today
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              No credit card required • 5 free proposals to get started
            </p>
          </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold">PITCHLY</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                The AI-powered proposal platform trusted by thousands of freelancers and agencies worldwide. 
                Win more clients with professional proposals that convert.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 PITCHLY. All rights reserved. | Made with ❤️ for freelancers worldwide.
            </p>
          </div>
        </div>
      </footer>

      {/* Embedded Checkout Modal */}
      {showCheckout && selectedTier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Upgrade to {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}
                </h2>
                <button 
                  onClick={handleCheckoutCancel}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <EmbeddedCheckout 
                tier={selectedTier}
                onSuccess={handleCheckoutSuccess}
                onCancel={handleCheckoutCancel}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
