import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import AvatarUpload from '../components/AvatarUpload';
import UsageDashboard from '../components/UsageDashboard';
import RegionSelector from '../components/RegionSelector';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    businessType: '',
    goals: []
  });
  const [avatarUrl, setAvatarUrl] = useState(null);

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

  // Handle authentication
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      if (!session?.user?.id) return;

      try {
        // Get user settings
        const { data: userSettings } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        setFormData({
          name: session.user.name || '',
          email: session.user.email || '',
          company: userSettings?.company_name || '',
          businessType: userSettings?.business_type || '',
          goals: userSettings?.goals || []
        });
        setAvatarUrl(session.user.image);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [session]);

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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // Update user name if changed
      if (formData.name !== session.user.name) {
        const response = await fetch('/api/user/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name })
        });

        if (!response.ok) {
          throw new Error('Failed to update name');
        }

        // Update session
        await updateSession();
      }

      // Update user settings
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: session.user.id,
          company_name: formData.company,
          business_type: formData.businessType,
          goals: formData.goals,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const getUserInitials = () => {
    if (formData.name) {
      return formData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (formData.email) {
      return formData.email[0].toUpperCase();
    }
    return '?';
  };

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">Loading profile...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Profile Settings - PITCHLY</title>
        <meta name="description" content="Manage your PITCHLY profile and account settings" />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/dashboard" className="btn-ghost">
                ← Back to Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {message && (
              <div className={`rounded-lg p-4 mb-6 ${
                message.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <svg className={`w-5 h-5 ${message.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {message.type === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <p className="font-medium">{message.text}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
              {/* Profile Picture & Basic Info */}
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <AvatarUpload 
                    currentImage={avatarUrl}
                    onUploadSuccess={(newImageUrl) => setAvatarUrl(newImageUrl)}
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="input-field opacity-60 cursor-not-allowed"
                      title="Email cannot be changed"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Email address cannot be changed
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Business Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company/Business Name
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

              {/* Goals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Your Goals
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Select all that apply to help us personalize your experience
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {goalOptions.map(goal => (
                    <button
                      key={goal}
                      type="button"
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

              <hr className="border-gray-200 dark:border-gray-700" />

              {/* Regional Preferences */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    🌍 Regional Preferences
                  </h3>
                  <Link 
                    href="/settings/regional" 
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Advanced Settings →
                  </Link>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Set your preferred region, language, and currency format
                </p>
                <RegionSelector />
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              {/* Billing Management */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Billing & Subscription
                </h3>
                <UsageDashboard />
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Account Actions */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Account Actions
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Export Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download all your proposals and account data
                  </p>
                </div>
                <button className="btn-ghost text-sm">
                  Export
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100">Delete Account</h4>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Permanently delete your account and all data
                  </p>
                </div>
                <button 
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                  onClick={() => alert('Account deletion coming soon. Contact support for assistance.')}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}