import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '../lib/supabase';

export default function ProposalAnalytics({ subscription }) {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30'); // days

  const isProfessional = subscription?.tier === 'professional' || subscription?.tier === 'agency';

  useEffect(() => {
    if (isProfessional) {
      loadAnalytics();
    } else {
      setLoading(false);
    }
  }, [session, timeframe, isProfessional]);

  const loadAnalytics = async () => {
    if (!session?.user?.id) return;

    try {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(timeframe));

      // Get proposal counts and status distribution
      const { data: proposals } = await supabase
        .from('proposals')
        .select('id, status, created_at, budget_range')
        .eq('user_id', session.user.id)
        .gte('created_at', daysAgo.toISOString());

      // Get usage data
      const { data: usage } = await supabase
        .from('proposal_usage')
        .select('action, created_at')
        .eq('user_id', session.user.id)
        .gte('created_at', daysAgo.toISOString());

      // Calculate analytics
      const totalProposals = proposals?.length || 0;
      const statusCounts = proposals?.reduce((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      }, {}) || {};

      // Calculate conversion rates (assuming accepted/won status means success)
      const successfulProposals = (statusCounts.accepted || 0) + (statusCounts.won || 0);
      const conversionRate = totalProposals > 0 ? (successfulProposals / totalProposals) * 100 : 0;

      // Calculate daily activity
      const dailyActivity = usage?.reduce((acc, u) => {
        const date = new Date(u.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {}) || {};

      // Estimate total value (sum budget ranges - approximate)
      const totalValue = proposals?.reduce((sum, p) => {
        if (p.budget_range) {
          // Extract numbers from budget range string (e.g., "$5,000 - $10,000")
          const matches = p.budget_range.match(/\$?[\d,]+/g);
          if (matches && matches.length >= 2) {
            const min = parseInt(matches[0].replace(/[$,]/g, ''));
            const max = parseInt(matches[1].replace(/[$,]/g, ''));
            return sum + ((min + max) / 2); // Use average
          } else if (matches && matches.length === 1) {
            return sum + parseInt(matches[0].replace(/[$,]/g, ''));
          }
        }
        return sum;
      }, 0) || 0;

      setAnalytics({
        totalProposals,
        statusCounts,
        conversionRate,
        dailyActivity,
        totalValue,
        successfulProposals,
        timeframe: parseInt(timeframe)
      });

    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isProfessional) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Advanced Analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Track your proposal performance, conversion rates, and business metrics.
          </p>
          <button 
            onClick={() => window.location.href = '/upgrade'}
            className="btn-primary"
          >
            ⭐ Upgrade to Professional
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Proposal Analytics
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Performance metrics for the last {timeframe} days
          </p>
        </div>
        
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="input-field w-auto text-sm"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {analytics && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analytics.totalProposals}
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Total Proposals
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analytics.conversionRate.toFixed(1)}%
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                Win Rate
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {analytics.successfulProposals}
              </div>
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Successful
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {formatCurrency(analytics.totalValue)}
              </div>
              <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                Total Value
              </div>
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Proposal Status Breakdown
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(analytics.statusCounts).map(([status, count]) => {
                const percentage = analytics.totalProposals > 0 ? (count / analytics.totalProposals) * 100 : 0;
                const statusColors = {
                  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
                  sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                  accepted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                  won: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                };

                return (
                  <div key={status} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                        {status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{count}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insights */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Insights & Recommendations
            </h4>
            <div className="space-y-3 text-sm">
              {analytics.conversionRate < 20 && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Improve your win rate</p>
                      <p className="text-yellow-700 dark:text-yellow-300">Your conversion rate is {analytics.conversionRate.toFixed(1)}%. Consider personalizing proposals more or following up sooner.</p>
                    </div>
                  </div>
                </div>
              )}

              {analytics.totalProposals >= 5 && analytics.conversionRate >= 30 && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">Great performance!</p>
                      <p className="text-green-700 dark:text-green-300">Your {analytics.conversionRate.toFixed(1)}% win rate is excellent. Keep up the great work!</p>
                    </div>
                  </div>
                </div>
              )}

              {analytics.totalProposals < 3 && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-200">Build momentum</p>
                      <p className="text-blue-700 dark:text-blue-300">Create more proposals to start seeing meaningful analytics trends.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}