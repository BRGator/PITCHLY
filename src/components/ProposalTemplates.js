import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '../lib/supabase';

export default function ProposalTemplates({ onSelectTemplate, subscription }) {
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
    if (!confirm('Are you sure you want to delete this template?')) return;

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

  // Built-in templates for all users
  const builtInTemplates = [
    {
      id: 'web-design',
      name: 'Web Design Project',
      description: 'Template for web design and development projects',
      template_data: {
        projectTitle: 'Professional Website Design & Development',
        projectDescription: 'Complete website design and development including responsive design, content management system, SEO optimization, and mobile-friendly layout.',
        budget: '$3,000 - $8,000',
        timeline: '4-6 weeks'
      }
    },
    {
      id: 'marketing',
      name: 'Marketing Campaign',
      description: 'Template for marketing and advertising campaigns',
      template_data: {
        projectTitle: 'Digital Marketing Campaign Strategy',
        projectDescription: 'Comprehensive digital marketing strategy including social media management, content creation, paid advertising, and performance tracking.',
        budget: '$2,000 - $5,000/month',
        timeline: '3-month initial campaign'
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
            Proposal Templates
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isProfessional 
              ? 'Save time with pre-made templates'
              : 'Upgrade to Professional to create custom templates'
            }
          </p>
        </div>
        {templateData && isProfessional && (
          <button
            onClick={() => setShowSaveModal(true)}
            className="btn-ghost text-sm"
          >
            💾 Save as Template
          </button>
        )}
      </div>

      {/* Built-in Templates */}
      <div>
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">
          Starter Templates
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
                    Free
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
              Your Templates
            </h4>
            {!isProfessional && (
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                Pro Feature
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
                Custom Templates
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Save your best proposals as templates and reuse them for similar projects.
              </p>
              <button className="btn-primary text-sm">
                ⭐ Upgrade to Professional
              </button>
            </div>
          ) : templates.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p>No custom templates yet</p>
              <p className="text-xs mt-1">Generate a proposal first, then save it as a template</p>
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
                        Created {new Date(template.created_at).toLocaleDateString()}
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
              Save as Template
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Template Name
              </label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="input-field"
                placeholder="e.g., Web Design Template"
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
                Cancel
              </button>
              <button
                onClick={saveTemplate}
                disabled={!templateName.trim()}
                className="btn-primary disabled:opacity-50"
              >
                Save Template
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