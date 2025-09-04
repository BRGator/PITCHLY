import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '../lib/supabase';
import { useI18n } from '../lib/i18n';

export default function ProposalTemplates({ onSelectTemplate, subscription }) {
  const { t } = useI18n();
  const { data: session } = useSession();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateData, setTemplateData] = useState(null);

  const isProfessional = subscription?.tier === 'professional' || subscription?.tier === 'agency';

  useEffect(() => {
    loadTemplates();
  }, [session]);

  const loadTemplates = async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from('proposal_templates')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async () => {
    if (!templateName.trim() || !templateData) return;

    try {
      const { error } = await supabase
        .from('proposal_templates')
        .insert({
          user_id: session.user.id,
          name: templateName.trim(),
          template_data: templateData,
          description: `Template created from proposal: ${templateData.title}`
        });

      if (error) throw error;
      
      setShowSaveModal(false);
      setTemplateName('');
      setTemplateData(null);
      loadTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const deleteTemplate = async (templateId) => {
    if (!confirm(t('proposalTemplates.deleteConfirm'))) return;

    try {
      const { error } = await supabase
        .from('proposal_templates')
        .delete()
        .eq('id', templateId)
        .eq('user_id', session.user.id);

      if (error) throw error;
      loadTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleTemplateSelect = (template) => {
    if (!isProfessional) {
      // Show upgrade modal for free users
      return;
    }
    onSelectTemplate(template.template_data);
  };

  // Advanced templates for Professional+ users
  const advancedTemplates = [
    {
      id: 'enterprise-consulting',
      name: t('proposalTemplates.templates.enterpriseConsulting.name'),
      description: t('proposalTemplates.templates.enterpriseConsulting.description'),
      template_data: {
        projectTitle: 'Enterprise Digital Transformation & Strategic Consulting',
        projectDescription: 'End-to-end enterprise consulting including digital transformation roadmap, organizational change management, technology stack optimization, process reengineering, stakeholder alignment, executive coaching, and implementation oversight. Includes competitive analysis, market research, regulatory compliance review, and 12-month strategic planning with quarterly business reviews.',
        budgetAmount: '45000',
        budgetUnit: 'lump-sum',
        timelineType: 'duration',
        timelineDuration: '6-months',
        timelineDeadline: ''
      }
    },
    {
      id: 'saas-development',
      name: t('proposalTemplates.templates.saasDevelopment.name'),
      description: t('proposalTemplates.templates.saasDevelopment.description'),
      template_data: {
        projectTitle: 'Custom SaaS Platform Development & Launch',
        projectDescription: 'Complete SaaS platform development including user authentication, subscription billing, admin dashboard, API development, third-party integrations, automated testing, security implementation, scalable cloud infrastructure, monitoring setup, and go-to-market support. Includes user onboarding flows, analytics dashboard, multi-tenant architecture, and compliance features.',
        budgetAmount: '85000',
        budgetUnit: 'lump-sum',
        timelineType: 'duration',
        timelineDuration: '8-months',
        timelineDeadline: ''
      }
    },
    {
      id: 'brand-transformation',
      name: t('proposalTemplates.templates.brandTransformation.name'),
      description: t('proposalTemplates.templates.brandTransformation.description'),
      template_data: {
        projectTitle: 'Complete Brand Transformation & Market Repositioning',
        projectDescription: 'Comprehensive brand transformation including market research, brand strategy development, visual identity redesign, messaging framework, website redesign, marketing collateral creation, social media strategy, PR campaign launch, and brand guidelines documentation. Includes stakeholder workshops, customer journey mapping, competitive positioning, and 6-month post-launch optimization.',
        budgetAmount: '25000',
        budgetUnit: 'lump-sum',
        timelineType: 'duration',
        timelineDuration: '4-months',
        timelineDeadline: ''
      }
    },
    {
      id: 'ecommerce-platform',
      name: t('proposalTemplates.templates.ecommercePlatform.name'),
      description: t('proposalTemplates.templates.ecommercePlatform.description'),
      template_data: {
        projectTitle: 'Enterprise E-commerce Platform with Custom Integrations',
        projectDescription: 'Advanced e-commerce platform development including custom product configurators, inventory management system, multi-channel selling, automated marketing workflows, advanced analytics, payment processing, shipping integrations, customer portal, and admin dashboard. Includes mobile optimization, performance optimization, SEO implementation, and staff training.',
        budgetAmount: '65000',
        budgetUnit: 'lump-sum',
        timelineType: 'duration',
        timelineDuration: '5-months',
        timelineDeadline: ''
      }
    },
    {
      id: 'data-analytics',
      name: t('proposalTemplates.templates.dataAnalytics.name'),
      description: t('proposalTemplates.templates.dataAnalytics.description'),
      template_data: {
        projectTitle: 'Enterprise Data Analytics Platform & Business Intelligence',
        projectDescription: 'Custom data analytics platform including data warehouse design, ETL pipeline development, real-time dashboard creation, predictive analytics implementation, automated reporting system, data visualization, machine learning integration, and executive reporting suite. Includes data governance framework, security implementation, and team training on analytics tools.',
        budgetAmount: '55000',
        budgetUnit: 'lump-sum',
        timelineType: 'duration',
        timelineDuration: '7-months',
        timelineDeadline: ''
      }
    }
  ];

  // Built-in templates for all users - Updated with structured fields
  const builtInTemplates = [
    {
      id: 'web-design',
      name: t('proposalTemplates.templates.webDesign.name'),
      description: t('proposalTemplates.templates.webDesign.description'),
      template_data: {
        projectTitle: 'Professional Website Design & Development',
        projectDescription: 'Complete website design and development including responsive design, content management system, SEO optimization, and mobile-friendly layout. Includes user research, wireframing, custom design, development, testing, and launch support.',
        budgetAmount: '5500',
        budgetUnit: 'lump-sum',
        timelineType: 'duration',
        timelineDuration: '6-weeks',
        timelineDeadline: ''
      }
    },
    {
      id: 'marketing',
      name: t('proposalTemplates.templates.marketing.name'),
      description: t('proposalTemplates.templates.marketing.description'),
      template_data: {
        projectTitle: 'Digital Marketing Campaign Strategy',
        projectDescription: 'Comprehensive digital marketing strategy including social media management, content creation, paid advertising, and performance tracking. Includes market research, competitor analysis, content calendar, ad creation, and monthly reporting.',
        budgetAmount: '3500',
        budgetUnit: 'per-month',
        timelineType: 'duration', 
        timelineDuration: '3-months',
        timelineDeadline: ''
      }
    },
    {
      id: 'branding',
      name: t('proposalTemplates.templates.branding.name'),
      description: t('proposalTemplates.templates.branding.description'),
      template_data: {
        projectTitle: 'Complete Brand Identity & Logo Design',
        projectDescription: 'Full brand identity package including logo design, color palette, typography, brand guidelines, business card design, and brand application mockups. Includes market research, concept development, and 3 rounds of revisions.',
        budgetAmount: '2500',
        budgetUnit: 'lump-sum',
        timelineType: 'duration',
        timelineDuration: '3-weeks', 
        timelineDeadline: ''
      }
    },
    {
      id: 'app-development',
      name: t('proposalTemplates.templates.appDevelopment.name'),
      description: t('proposalTemplates.templates.appDevelopment.description'),
      template_data: {
        projectTitle: 'Custom Mobile Application Development',
        projectDescription: 'Full-stack mobile application development including user interface design, backend development, API integration, user authentication, push notifications, and app store deployment. Includes testing, documentation, and post-launch support.',
        budgetAmount: '15000',
        budgetUnit: 'lump-sum',
        timelineType: 'duration',
        timelineDuration: '4-months',
        timelineDeadline: ''
      }
    },
    {
      id: 'consulting',
      name: t('proposalTemplates.templates.consulting.name'),
      description: t('proposalTemplates.templates.consulting.description'),
      template_data: {
        projectTitle: 'Strategic Business Consulting & Advisory',
        projectDescription: 'Comprehensive business consulting including market analysis, operational review, growth strategy development, process optimization recommendations, and implementation roadmap. Includes stakeholder interviews, data analysis, and executive presentations.',
        budgetAmount: '200',
        budgetUnit: 'per-hour',
        timelineType: 'duration',
        timelineDuration: '2-months',
        timelineDeadline: ''
      }
    }
  ];

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t('proposalTemplates.title')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isProfessional 
              ? t('proposalTemplates.saveTimeDesc')
              : t('proposalTemplates.upgradeDesc')
            }
          </p>
        </div>
        {templateData && isProfessional && (
          <button
            onClick={() => setShowSaveModal(true)}
            className="btn-ghost text-sm"
          >
{t('proposalTemplates.saveAsTemplate')}
          </button>
        )}
      </div>

      {/* Advanced Templates (Professional+ only) */}
      {isProfessional && (
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">
            {t('proposalTemplates.advancedTemplates')}
            <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
              {t('proposalTemplates.professional')}
            </span>
          </h4>
          <div className="grid gap-3">
            {advancedTemplates.map(template => (
              <div
                key={template.id}
                className="p-4 border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 cursor-pointer transition-colors"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-gray-100">
                      {template.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {template.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">
                      {t('proposalTemplates.advanced')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Built-in Templates */}
      <div>
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">
          {t('proposalTemplates.starterTemplates')}
        </h4>
        <div className="grid gap-3">
          {builtInTemplates.map(template => (
            <div
              key={template.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer transition-colors"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 dark:text-gray-100">
                    {template.name}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {template.description}
                  </p>
                </div>
                <div className="ml-4">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {t('proposalTemplates.free')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Templates */}
      {(isProfessional || templates.length > 0) && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
              {t('proposalTemplates.yourTemplates')}
            </h4>
            {!isProfessional && (
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                {t('proposalTemplates.proFeature')}
              </span>
            )}
          </div>

          {!isProfessional ? (
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                {t('proposalTemplates.customTemplates')}
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t('proposalTemplates.customTemplatesDesc')}
              </p>
              <button className="btn-primary text-sm">
                {t('proposalTemplates.upgradeToPro')}
              </button>
            </div>
          ) : templates.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p>{t('proposalTemplates.noCustomTemplates')}</p>
              <p className="text-xs mt-1">{t('proposalTemplates.noCustomTemplatesDesc')}</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {templates.map(template => (
                <div
                  key={template.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 cursor-pointer transition-colors group"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100">
                        {template.name}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {template.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {t('proposalTemplates.created')} {new Date(template.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTemplate(template.id);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm"
                        title="Delete template"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Save Template Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {t('proposalTemplates.saveAsTemplate')}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('proposalTemplates.templateName')}
              </label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="input-field"
                placeholder={t('proposalTemplates.templateNamePlaceholder')}
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setTemplateName('');
                }}
                className="btn-ghost"
              >
                {t('proposalTemplates.cancel')}
              </button>
              <button
                onClick={saveTemplate}
                disabled={!templateName.trim()}
                className="btn-primary disabled:opacity-50"
              >
                {t('proposalTemplates.saveTemplate')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Expose method to save current proposal as template
  ProposalTemplates.saveCurrentProposal = (data) => {
    setTemplateData(data);
  };
}