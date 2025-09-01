import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function Onboarding() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle authentication client-side
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    company: '',
    phone: '',
    businessType: '',
    goals: []
  });

  const businessTypes = [
    'Freelancer',
    'Small Agency',
    'Consultant',
    'Creative Services',
    'Marketing Agency',
    'Web Development',
    'Other'
  ];

  const goalOptions = [
    'Win more clients',
    'Save time on proposals',
    'Increase proposal value',
    'Improve win rates',
    'Standardize processes',
    'Scale my business'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Save user settings to database
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: session.user.id,
          company_name: formData.company,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      // Update user name if provided
      if (formData.name !== session?.user?.name) {
        await fetch('/api/user/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name })
        });
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      // Continue to dashboard even if save fails
      router.push('/dashboard');
    }
  };

  const getUserInitials = () => {
    if (formData.name) {
      return formData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (session?.user?.email) {
      return session.user.email[0].toUpperCase();
    }
    return '?';
  };

  return (
    <>
      <Head>
        <title>Welcome to PITCHLY</title>
        <meta name="description" content="Let's get your account set up" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-3xl font-black text-gray-900 dark:text-gray-100">
                PITCHLY
              </span>
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome to PITCHLY!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Let's set up your account in just a few steps
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {num}
                  </div>
                  {num < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > num ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Tell us about yourself
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company/Business Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="input-field"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select your business type</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  What are your goals?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Select all that apply to help us personalize your experience
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goalOptions.map(goal => (
                    <button
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.goals.includes(goal)
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          formData.goals.includes(goal)
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-gray-300 dark:border-gray-500'
                        }`}>
                          {formData.goals.includes(goal) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{goal}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-600 to-blue-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
                  {getUserInitials()}
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  You're all set, {formData.name.split(' ')[0] || 'there'}!
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Welcome to PITCHLY! You're ready to start creating winning proposals.
                </p>

                <div className="bg-primary-50 dark:bg-primary-900 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-2">
                    🎉 Free Starter Plan
                  </h3>
                  <p className="text-primary-700 dark:text-primary-300 mb-4">
                    You have <strong>3 free proposals</strong> to get started. Perfect for testing out our AI-powered proposal generation!
                  </p>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    Upgrade anytime for unlimited proposals and advanced features.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`btn-ghost ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Back
              </button>
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="btn-primary"
                  disabled={step === 1 && !formData.name}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Setting up...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </div>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Skip for now →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Removed getServerSideProps to avoid timing issues with magic link authentication
// Onboarding will handle authentication client-side like dashboard