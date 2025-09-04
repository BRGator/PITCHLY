import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useI18n } from '../lib/i18n';

export default function ProposalForm() {
  const { data: session } = useSession();
  const { t } = useI18n();
  
  // Enhanced form state matching main proposal form
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectTitle: '',
    projectDescription: '',
    budgetAmount: '',
    budgetUnit: 'lump-sum',
    timelineDuration: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    // If user is not signed in, show sign-in prompt instead of generating
    if (!session) {
      setShowSignIn(true);
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Use the main proposal generation API with enhanced data
      const response = await fetch('/api/proposals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('demoForm.generationError'));
      }

      // Redirect to view the generated proposal
      if (data.proposalId) {
        window.location.href = `/proposals/${data.proposalId}`;
      } else {
        setError(t('demoForm.generationError'));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (showSignIn) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card-premium p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('demoForm.signInToSee')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('demoForm.signInMessage')}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => signIn()}
              className="btn-primary"
            >
              {t('demoForm.signInButton')}
            </button>
            <button
              onClick={() => setShowSignIn(false)}
              className="btn-ghost"
            >
              {t('landing.hideDemo')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {t('demoForm.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('demoForm.subtitle')}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('demoForm.clientName')} {t('demoForm.required')}
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                className="input-field"
                placeholder={t('demoForm.clientNamePlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('demoForm.clientEmail')}
              </label>
              <input
                type="email"
                value={formData.clientEmail}
                onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                className="input-field"
                placeholder={t('demoForm.clientEmailPlaceholder')}
              />
            </div>
          </div>

          {/* Project Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('demoForm.projectTitle')} {t('demoForm.required')}
            </label>
            <input
              type="text"
              required
              value={formData.projectTitle}
              onChange={(e) => handleInputChange('projectTitle', e.target.value)}
              className="input-field"
              placeholder={t('demoForm.projectTitlePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('demoForm.projectDescription')} {t('demoForm.required')}
            </label>
            <textarea
              required
              rows={4}
              value={formData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              className="input-field"
              placeholder={t('demoForm.projectDescriptionPlaceholder')}
            />
          </div>

          {/* Budget Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('demoForm.projectBudget')} {t('demoForm.required')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {t('demoForm.budgetAmount')}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.budgetAmount}
                  onChange={(e) => handleInputChange('budgetAmount', e.target.value)}
                  className="input-field"
                  placeholder={t('demoForm.budgetAmountPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {t('demoForm.budgetUnit')}
                </label>
                <select
                  value={formData.budgetUnit}
                  onChange={(e) => handleInputChange('budgetUnit', e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="lump-sum">{t('demoForm.budgetUnits.lumpSum')}</option>
                  <option value="per-hour">{t('demoForm.budgetUnits.perHour')}</option>
                  <option value="per-day">{t('demoForm.budgetUnits.perDay')}</option>
                  <option value="per-week">{t('demoForm.budgetUnits.perWeek')}</option>
                  <option value="per-month">{t('demoForm.budgetUnits.perMonth')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('demoForm.projectTimeline')} {t('demoForm.required')}
            </label>
            <select
              value={formData.timelineDuration}
              onChange={(e) => handleInputChange('timelineDuration', e.target.value)}
              className="input-field"
              required
            >
              <option value="">{t('demoForm.selectDuration')}</option>
              <option value="1-week">{t('demoForm.durations.oneWeek')}</option>
              <option value="2-weeks">{t('demoForm.durations.twoWeeks')}</option>
              <option value="1-month">{t('demoForm.durations.oneMonth')}</option>
              <option value="2-months">{t('demoForm.durations.twoMonths')}</option>
              <option value="3-months">{t('demoForm.durations.threeMonths')}</option>
              <option value="6-months">{t('demoForm.durations.sixMonths')}</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('demoForm.generating')}<span className="loading-dots"></span>
              </span>
            ) : (
              t('demoForm.generateProposal')
            )}
          </button>
        </form>
      </div>
    </div>
  );
}