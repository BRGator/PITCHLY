// Regional Settings Page
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import RegionSelector from '../../components/RegionSelector';
import { useRegional } from '../../components/RegionalProvider';
import { REGIONS, formatCurrency, formatDate, formatNumber } from '../../lib/regionalization';

export default function RegionalSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { region, regionConfig, language, languageConfig } = useRegional();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/auth/signin?from=settings');
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) return null;

  // Sample data for preview
  const sampleAmount = 5000;
  const sampleDate = new Date();
  const sampleNumber = 1234567.89;

  return (
    <>
      <Head>
        <title>Regional Settings - PITCHLY</title>
        <meta name="description" content="Configure your regional preferences for currency, language, and business practices" />
      </Head>

      <Navbar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Link href="/profile" className="btn-ghost mr-4">
                ← Back to Profile
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              🌍 Regional Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Customize your experience with localized formats, currency, and business practices
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Region Selector */}
            <div className="lg:col-span-1">
              <RegionSelector />
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Preview
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  See how your regional settings affect formatting
                </p>

                <div className="space-y-4">
                  {/* Current Selection */}
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{regionConfig?.flag}</span>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {regionConfig?.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {languageConfig?.nativeName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formatting Examples */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Currency:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(sampleAmount, region)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Date:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatDate(sampleDate, region)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Numbers:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatNumber(sampleNumber, region)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Business Style:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                        {regionConfig?.businessStyle?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Information */}
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-3">
                  💡 What This Affects
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
                  <li>• Currency symbols and formatting in proposals</li>
                  <li>• Date formats in contracts and documents</li>
                  <li>• Number formatting in analytics</li>
                  <li>• Business tone and style in AI-generated proposals</li>
                  <li>• Regional business practice recommendations</li>
                  <li>• Payment processing preferences (coming soon)</li>
                </ul>
              </div>

              {/* Future Features */}
              <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h4 className="font-medium text-purple-900 dark:text-purple-200 mb-3">
                  🚀 Coming Soon
                </h4>
                <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-2">
                  <li>• Interface translation to your language</li>
                  <li>• Regional payment methods (SEPA, iDEAL, etc.)</li>
                  <li>• Local tax calculation support</li>
                  <li>• Culture-specific proposal templates</li>
                  <li>• Regional compliance guidelines</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}