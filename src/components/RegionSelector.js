// Region and Language Selector Component
import { useState } from 'react';
import { useRegional } from './RegionalProvider';
import { REGIONS, LANGUAGES } from '../lib/regionalization';
import { useI18n } from '../lib/i18n';

export default function RegionSelector({ variant = 'full' }) {
  const { t } = useI18n();
  const { region, language, regionConfig, setRegion, setLanguage } = useRegional();
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('region');

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-lg">{regionConfig?.flag}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {regionConfig?.currency}
          </span>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute top-full mt-2 right-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-4">
              <CompactSelector 
                region={region}
                language={language}
                setRegion={setRegion}
                setLanguage={setLanguage}
                onClose={() => setShowDropdown(false)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t('regionSelector.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('regionSelector.subtitle')}
        </p>
      </div>

      {/* Tab Selector */}
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('region')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'region'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          🌍 {t('regionSelector.regionCurrency')}
        </button>
        <button
          onClick={() => setActiveTab('language')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'language'
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          🗣️ {t('regionSelector.language')}
        </button>
      </div>

      {activeTab === 'region' && (
        <RegionTab 
          currentRegion={region} 
          onRegionChange={setRegion}
          t={t}
        />
      )}

      {activeTab === 'language' && (
        <LanguageTab 
          currentLanguage={language} 
          onLanguageChange={setLanguage}
          t={t}
        />
      )}
    </div>
  );
}

function RegionTab({ currentRegion, onRegionChange, t }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(REGIONS).map(([code, config]) => (
          <button
            key={code}
            onClick={() => onRegionChange(code)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              currentRegion === code
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{config.flag}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {config.name}
                </span>
              </div>
              {currentRegion === code && (
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div>{t('regionSelector.currency')}: {config.currencySymbol} ({config.currency})</div>
              <div>{t('regionSelector.date')}: {config.dateFormat}</div>
              <div>{t('regionSelector.numbers')}: {config.numberFormat}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LanguageTab({ currentLanguage, onLanguageChange, t }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(LANGUAGES).map(([code, config]) => (
          <button
            key={code}
            onClick={() => onLanguageChange(code)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              currentLanguage === code
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {config.nativeName}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {config.name}
                </div>
              </div>
              {currentLanguage === code && (
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CompactSelector({ region, language, setRegion, setLanguage, onClose }) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('region');
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">
          {t('regionSelector.title')}
        </h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('region')}
          className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'region'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {t('regionSelector.regionCurrency')}
        </button>
        <button
          onClick={() => setActiveTab('language')}
          className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'language'
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {t('regionSelector.language')}
        </button>
      </div>

      {activeTab === 'region' && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {Object.entries(REGIONS).map(([code, config]) => (
            <button
              key={code}
              onClick={() => {
                setRegion(code);
                onClose();
              }}
              className={`w-full p-2 rounded-md text-left transition-colors ${
                region === code
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-100'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{config.flag}</span>
                <span className="text-sm font-medium">{config.name}</span>
                <span className="text-xs text-gray-500">({config.currency})</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'language' && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {Object.entries(LANGUAGES).map(([code, config]) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code);
                onClose();
              }}
              className={`w-full p-2 rounded-md text-left transition-colors ${
                language === code
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-100'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{config.nativeName}</span>
                <span className="text-xs text-gray-500">{config.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}