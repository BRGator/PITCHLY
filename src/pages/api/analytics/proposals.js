// Analytics API for proposal data
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch user's proposals using the analytics view
    const { data: proposals, error } = await supabase
      .from('proposal_analytics')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Calculate analytics
    const analytics = calculateAnalytics(proposals || []);

    res.status(200).json(analytics);

  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch analytics',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

function calculateAnalytics(proposals) {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];
  
  // Basic metrics
  const totalProposals = proposals.length;
  const totalValue = proposals.reduce((sum, p) => sum + (p.budget_amount || 0), 0);
  const averageValue = totalProposals > 0 ? totalValue / totalProposals : 0;
  
  // Budget breakdown
  const budgetBreakdown = {};
  const budgetUnits = proposals.reduce((acc, p) => {
    if (p.budget_unit) {
      acc[p.budget_unit] = (acc[p.budget_unit] || []).concat(p);
    }
    return acc;
  }, {});

  let colorIndex = 0;
  Object.entries(budgetUnits).forEach(([unit, unitProposals]) => {
    const count = unitProposals.length;
    const totalUnitValue = unitProposals.reduce((sum, p) => sum + (p.budget_amount || 0), 0);
    const avgValue = count > 0 ? totalUnitValue / count : 0;
    const percentage = totalProposals > 0 ? Math.round((count / totalProposals) * 100) : 0;
    
    budgetBreakdown[unit] = {
      count,
      percentage,
      avgValue,
      color: colors[colorIndex % colors.length]
    };
    colorIndex++;
  });

  // Timeline breakdown
  const timelineBreakdown = {};
  const timelineData = proposals.reduce((acc, p) => {
    let timelineKey = 'Unknown';
    if (p.timeline_type === 'duration' && p.timeline_duration) {
      timelineKey = p.timeline_duration.replace('-', ' ');
    } else if (p.timeline_type === 'deadline' && p.timeline_deadline) {
      timelineKey = 'Deadline-based';
    }
    
    acc[timelineKey] = (acc[timelineKey] || []).concat(p);
    return acc;
  }, {});

  colorIndex = 0;
  Object.entries(timelineData).forEach(([timeline, timelineProposals]) => {
    const count = timelineProposals.length;
    const totalTimelineValue = timelineProposals.reduce((sum, p) => sum + (p.budget_amount || 0), 0);
    const avgValue = count > 0 ? totalTimelineValue / count : 0;
    const percentage = totalProposals > 0 ? Math.round((count / totalProposals) * 100) : 0;
    
    timelineBreakdown[timeline] = {
      count,
      percentage,
      avgValue,
      color: colors[colorIndex % colors.length]
    };
    colorIndex++;
  });

  // Monthly trends
  const monthlyData = proposals.reduce((acc, p) => {
    const month = p.month_created || new Date(p.created_at).toISOString().substring(0, 7);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(p);
    return acc;
  }, {});

  const monthlyTrends = Object.entries(monthlyData)
    .map(([month, monthProposals]) => {
      const proposalCount = monthProposals.length;
      const totalValue = monthProposals.reduce((sum, p) => sum + (p.budget_amount || 0), 0);
      const avgValue = proposalCount > 0 ? totalValue / proposalCount : 0;
      
      return {
        month,
        monthName: new Date(month + '-01').toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }),
        proposalCount,
        totalValue,
        avgValue
      };
    })
    .sort((a, b) => b.month.localeCompare(a.month))
    .slice(0, 6); // Last 6 months

  // Status breakdown
  const statusBreakdown = {};
  const statusData = proposals.reduce((acc, p) => {
    const status = p.status || 'draft';
    acc[status] = (acc[status] || []).concat(p);
    return acc;
  }, {});

  colorIndex = 0;
  Object.entries(statusData).forEach(([status, statusProposals]) => {
    const count = statusProposals.length;
    const totalStatusValue = statusProposals.reduce((sum, p) => sum + (p.budget_amount || 0), 0);
    const avgValue = count > 0 ? totalStatusValue / count : 0;
    const percentage = totalProposals > 0 ? Math.round((count / totalProposals) * 100) : 0;
    
    statusBreakdown[status] = {
      count,
      percentage,
      avgValue,
      color: colors[colorIndex % colors.length]
    };
    colorIndex++;
  });

  // Top insights
  const topPricingUnit = Object.entries(budgetBreakdown)
    .sort(([,a], [,b]) => b.count - a.count)[0]?.[0]?.replace('-', ' ') || 'N/A';
  
  const topTimeline = Object.entries(timelineBreakdown)
    .sort(([,a], [,b]) => b.count - a.count)[0]?.[0] || 'N/A';

  return {
    totalProposals,
    totalValue,
    averageValue,
    budgetBreakdown,
    timelineBreakdown,
    statusBreakdown,
    monthlyTrends,
    topPricingUnit,
    topTimeline,
    conversionRate: 0 // TODO: Implement when we add proposal status tracking
  };
}