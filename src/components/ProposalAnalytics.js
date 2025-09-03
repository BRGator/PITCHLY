// Analytics Dashboard for Proposal Data
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProposalAnalytics() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState({
    totalProposals: 0,
    totalValue: 0,
    averageValue: 0,
    budgetBreakdown: {},
    timelineBreakdown: {},
    monthlyTrends: [],
    loading: true
  });

  useEffect(() => {
    if (session) {
      fetchAnalytics();
    }
  }, [session]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics/proposals');
      const data = await response.json();
      
      if (response.ok) {
        setAnalytics({
          ...data,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics(prev => ({ ...prev, loading: false }));
    }
  };

  if (analytics.loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Proposal Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Insights into your proposal performance and trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-premium p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {analytics.totalProposals}
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Proposals
          </div>
        </div>

        <div className="card-premium p-6 text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {formatCurrency(analytics.totalValue)}
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Proposal Value
          </div>
        </div>

        <div className="card-premium p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {formatCurrency(analytics.averageValue)}
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Average Value
          </div>
        </div>

        <div className="card-premium p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {analytics.conversionRate || 0}%
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Win Rate
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proposal Status Breakdown */}
        <div className="card-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Proposal Status Breakdown
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.statusBreakdown || {}).map(([status, data]) => {
              // Match the color coding from dashboard.js
              const statusColors = {
                draft: { bg: 'bg-gray-100', text: 'text-gray-800', darkBg: 'dark:bg-gray-700', darkText: 'dark:text-gray-300' },
                sent: { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-300' },
                viewed: { bg: 'bg-purple-100', text: 'text-purple-800', darkBg: 'dark:bg-purple-900', darkText: 'dark:text-purple-300' },
                under_review: { bg: 'bg-yellow-100', text: 'text-yellow-800', darkBg: 'dark:bg-yellow-900', darkText: 'dark:text-yellow-300' },
                accepted: { bg: 'bg-green-100', text: 'text-green-800', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-300' },
                won: { bg: 'bg-emerald-100', text: 'text-emerald-800', darkBg: 'dark:bg-emerald-900', darkText: 'dark:text-emerald-300' },
                rejected: { bg: 'bg-red-100', text: 'text-red-800', darkBg: 'dark:bg-red-900', darkText: 'dark:text-red-300' },
                expired: { bg: 'bg-gray-100', text: 'text-gray-800', darkBg: 'dark:bg-gray-700', darkText: 'dark:text-gray-300' },
                withdrawn: { bg: 'bg-gray-100', text: 'text-gray-800', darkBg: 'dark:bg-gray-700', darkText: 'dark:text-gray-300' },
                revision: { bg: 'bg-blue-100', text: 'text-blue-800', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-300' }
              };
              
              const colors = statusColors[status] || statusColors.draft;
              const statusLabel = status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}>
                      {statusLabel}
                      {status === 'won' && ' 🎉'}
                      {status === 'accepted' && ' ✅'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {data.count} ({data.percentage}%)
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatCurrency(data.avgValue)} avg
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Budget Breakdown */}
        <div className="card-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Pricing Structure Breakdown
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.budgetBreakdown).map(([unit, data]) => (
              <div key={unit} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: data.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {unit.replace('-', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {data.count} ({data.percentage}%)
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCurrency(data.avgValue)} avg
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Breakdown */}
        <div className="card-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Project Timeline Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(analytics.timelineBreakdown).map(([timeline, data]) => (
              <div key={timeline} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: data.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {timeline}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {data.count} ({data.percentage}%)
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCurrency(data.avgValue)} avg value
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Monthly Proposal Trends
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Proposals
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Avg Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {analytics.monthlyTrends.map((month) => (
                <tr key={month.month}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {month.monthName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {month.proposalCount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {formatCurrency(month.totalValue)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {formatCurrency(month.avgValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-3">
          💡 Insights & Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-700 dark:text-primary-300">
          {analytics.totalProposals > 0 && (
            <>
              <div>
                • Your most popular pricing structure: <strong>{analytics.topPricingUnit}</strong>
              </div>
              <div>
                • Most common timeline: <strong>{analytics.topTimeline}</strong>
              </div>
              {analytics.averageValue > 0 && (
                <div>
                  • Consider raising rates if win rate {">"} 80%
                </div>
              )}
              <div>
                • Track conversion rates to optimize pricing
              </div>
            </>
          )}
          {analytics.totalProposals === 0 && (
            <div>
              Create your first proposal to start seeing analytics insights!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}