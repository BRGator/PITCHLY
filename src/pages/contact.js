import { useState } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Navbar from '../components/Navbar';
import { useI18n } from '../lib/i18n';
import { pageSEO } from '../lib/seo-config';

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NextSeo
        title={t('contact.pageTitle')}
        description={t('contact.pageDescription')}
        canonical={pageSEO.contact.canonical}
      />

      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('contact.getInTouch')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  {t('contact.contactInformation')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('contact.email')}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 ml-13">
                      <a href="mailto:hello@usepitchly.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                        hello@usepitchly.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 ml-13">
                      {t('contact.responseWithin24Hours')}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('contact.responseTime')}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 ml-13">
                      {t('contact.responseTime24Hours')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 ml-13">
                      {t('contact.businessHours')}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('contact.supportTopics')}</h3>
                    </div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 ml-13 space-y-1">
                      <li>• {t('contact.topics.technicalSupport')}</li>
                      <li>• {t('contact.topics.featureRequests')}</li>
                      <li>• {t('contact.topics.accountQuestions')}</li>
                      <li>• {t('contact.topics.partnershipInquiries')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  {t('contact.sendUsAMessage')}
                </h2>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        {t('contact.messageSentSuccessfully')}
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        {t('contact.failedToSendMessage')}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="input-field"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input-field"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.subject')} *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="input-field"
                    >
                      <option value="">{t('contact.form.selectSubject')}</option>
                      <option value="Technical Support">{t('contact.form.subjects.technicalSupport')}</option>
                      <option value="Feature Request">{t('contact.form.subjects.featureRequest')}</option>
                      <option value="Account Question">{t('contact.form.subjects.accountQuestion')}</option>
                      <option value="Bug Report">{t('contact.form.subjects.bugReport')}</option>
                      <option value="Partnership Inquiry">{t('contact.form.subjects.partnershipInquiry')}</option>
                      <option value="General Question">{t('contact.form.subjects.generalQuestion')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="input-field"
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('contact.form.requiredFields')}
                    </p>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                    >
                      {isSubmitting ? t('contact.form.sending') : t('contact.form.sendMessage')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('contact.needImmediateHelp')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('contact.checkOutResources')}
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/about" className="btn-secondary">
                {t('contact.learnMoreAboutUs')}
              </Link>
              <a href="mailto:hello@usepitchly.com" className="btn-primary">
                {t('contact.emailUsDirectly')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}