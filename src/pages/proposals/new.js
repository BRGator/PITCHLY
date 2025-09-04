import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import ProposalTemplates from '../../components/ProposalTemplates';
import { useI18n } from '../../lib/i18n';

export default function NewProposal() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useI18n();

  // Handle authentication client-side and fetch subscription
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    // Fetch subscription data
    const fetchSubscription = async () => {
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
  }, [status, router]);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectTitle: '',
    projectDescription: '',
    budgetAmount: '',
    budgetUnit: 'lump-sum',
    timelineType: 'duration',
    timelineDuration: '',
    timelineDeadline: ''
  });
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTemplateSelect = (templateData) => {
    setFormData(prev => ({
      ...prev,
      projectTitle: templateData.projectTitle || prev.projectTitle,
      projectDescription: templateData.projectDescription || prev.projectDescription,
      budgetAmount: templateData.budgetAmount || prev.budgetAmount,
      budgetUnit: templateData.budgetUnit || prev.budgetUnit,
      timelineDuration: templateData.timelineDuration || prev.timelineDuration,
      timelineDeadline: templateData.timelineDeadline || prev.timelineDeadline
    }));
    setShowTemplates(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/proposals/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate proposal');
      }

      // Show success message and redirect to view the proposal
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Dark theme
        const popup = document.createElement('div');
        popup.innerHTML = `
          <div style="
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: #1f2937; color: #f9fafb; border: 1px solid #374151;
            padding: 20px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            z-index: 10000; font-family: system-ui; max-width: 400px; text-align: center;
          ">
            <div style="font-size: 24px; margin-bottom: 10px;">🎉</div>
            <div style="font-weight: bold; margin-bottom: 10px;">Proposal Generated Successfully!</div>
            <div style="margin-bottom: 15px;">"${data.proposal.title}"</div>
            <div style="font-size: 14px; color: #d1d5db;">Redirecting to your dashboard...</div>
          </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => document.body.removeChild(popup), 2000);
      } else {
        // Light theme  
        const popup = document.createElement('div');
        popup.innerHTML = `
          <div style="
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: white; color: #1f2937; border: 1px solid #d1d5db;
            padding: 20px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000; font-family: system-ui; max-width: 400px; text-align: center;
          ">
            <div style="font-size: 24px; margin-bottom: 10px;">🎉</div>
            <div style="font-weight: bold; margin-bottom: 10px;">Proposal Generated Successfully!</div>
            <div style="margin-bottom: 15px;">"${data.proposal.title}"</div>
            <div style="font-size: 14px; color: #6b7280;">Redirecting to your dashboard...</div>
          </div>
        `;
        document.body.appendChild(popup);
        setTimeout(() => document.body.removeChild(popup), 2000);
      }
      
      // Redirect to dashboard after a short delay
      setTimeout(() => router.push('/dashboard'), 2000);
      
    } catch (error) {
      alert('❌ Error generating proposal: ' + error.message + '\n\nPlease check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Proposal - PITCHLY</title>
        <meta name="description" content="Generate your AI-powered proposal" />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {t('proposalForm.createNewProposal')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('proposalForm.createSubtitle')}
                </p>
              </div>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="btn-ghost flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{showTemplates ? t('proposalForm.hideTemplates') : t('proposalForm.useTemplate')}</span>
              </button>
            </div>
          </div>

          {/* Templates Section */}
          {showTemplates && (
            <div className="mb-8">
              <ProposalTemplates 
                onSelectTemplate={handleTemplateSelect}
                subscription={subscription}
              />
            </div>
          )}

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('proposalForm.clientName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    className="input-field"
                    placeholder={t('proposalForm.clientNamePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('proposalForm.clientEmail')}
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                    className="input-field"
                    placeholder={t('proposalForm.clientEmailPlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('proposalForm.projectTitle')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                  className="input-field"
                  placeholder={t('proposalForm.projectTitlePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('proposalForm.projectDescription')} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  className="input-field"
                  placeholder={t('proposalForm.projectDescPlaceholder')}
                />
              </div>

              {/* Budget Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('proposalForm.projectBudget')} *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {t('proposalForm.amount')}
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.budgetAmount}
                      onChange={(e) => handleInputChange('budgetAmount', e.target.value)}
                      className="input-field"
                      placeholder={t('proposalForm.budgetPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {t('proposalForm.pricingStructure')}
                    </label>
                    <select
                      value={formData.budgetUnit}
                      onChange={(e) => handleInputChange('budgetUnit', e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="lump-sum">{t('proposalForm.lumpSum')}</option>
                      <option value="per-hour">{t('proposalForm.perHour')}</option>
                      <option value="per-day">{t('proposalForm.perDay')}</option>
                      <option value="per-week">{t('proposalForm.perWeek')}</option>
                      <option value="per-month">{t('proposalForm.perMonth')}</option>
                      <option value="per-deliverable">{t('proposalForm.perDeliverable')}</option>
                      <option value="per-milestone">{t('proposalForm.perMilestone')}</option>
                      <option value="retainer">{t('proposalForm.retainer')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('proposalForm.projectTimeline')} *
                </label>
                
                {/* Timeline Type Toggle */}
                <div className="flex space-x-4 mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="duration"
                      checked={formData.timelineType === 'duration'}
                      onChange={(e) => handleInputChange('timelineType', e.target.value)}
                      className="mr-2 text-primary-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t('proposalForm.durationBased')}</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="deadline"
                      checked={formData.timelineType === 'deadline'}
                      onChange={(e) => handleInputChange('timelineType', e.target.value)}
                      className="mr-2 text-primary-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t('proposalForm.specificDeadline')}</span>
                  </label>
                </div>

                {/* Duration Input */}
                {formData.timelineType === 'duration' && (
                  <select
                    value={formData.timelineDuration}
                    onChange={(e) => handleInputChange('timelineDuration', e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">{t('proposalForm.selectDuration')}</option>
                    <option value="1-week">{t('proposalForm.oneWeek')}</option>
                    <option value="2-weeks">{t('proposalForm.twoWeeks')}</option>
                    <option value="3-weeks">{t('proposalForm.threeWeeks')}</option>
                    <option value="1-month">{t('proposalForm.oneMonth')}</option>
                    <option value="6-weeks">{t('proposalForm.sixWeeks')}</option>
                    <option value="2-months">{t('proposalForm.twoMonths')}</option>
                    <option value="3-months">{t('proposalForm.threeMonths')}</option>
                    <option value="4-months">{t('proposalForm.fourMonths')}</option>
                    <option value="6-months">{t('proposalForm.sixMonths')}</option>
                    <option value="12-months">{t('proposalForm.twelveMonths')}</option>
                    <option value="ongoing">{t('proposalForm.ongoing')}</option>
                  </select>
                )}

                {/* Deadline Input */}
                {formData.timelineType === 'deadline' && (
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {t('proposalForm.completionDeadline')}
                    </label>
                    <input
                      type="date"
                      value={formData.timelineDeadline}
                      onChange={(e) => handleInputChange('timelineDeadline', e.target.value)}
                      className="input-field"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="btn-ghost"
                >
                  {t('proposalForm.cancel')}
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? t('proposalForm.generating') : t('proposalForm.generateProposal')}
                </button>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-primary-50 dark:bg-primary-900 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-2">
                  {t('proposalForm.aiPoweredGeneration')}
                </h3>
                <p className="text-primary-700 dark:text-primary-300">
                  {t('proposalForm.aiGenerationDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Removed getServerSideProps to avoid timing issues with magic link authentication
// NewProposal will handle authentication client-side like dashboard and onboarding