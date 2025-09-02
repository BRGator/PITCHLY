import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';

// Use service role key for server-side operations
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Status update request:', { method: req.method, query: req.query, body: req.body });
    
    const session = await unstable_getServerSession(req, res, authOptions);
    console.log('Session check:', { hasSession: !!session, userId: session?.user?.id });
    
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: proposalId } = req.query;
    const { status } = req.body;

    console.log('Request data:', { proposalId, status, userId: session.user.id });

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    // Check user subscription to determine allowed statuses
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    const isProfessional = subscription?.tier === 'professional' || subscription?.tier === 'agency';
    console.log('Subscription check:', { subscription, isProfessional });

    const basicStatuses = ['draft', 'sent', 'viewed'];
    const enhancedStatuses = [
      'draft', 'sent', 'viewed', 'under_review', 
      'accepted', 'won', 'rejected', 'expired', 'withdrawn'
    ];

    const validStatuses = isProfessional ? enhancedStatuses : basicStatuses;

    if (!validStatuses.includes(status)) {
      console.log('Invalid status provided:', status, 'Valid statuses:', validStatuses, 'isProfessional:', isProfessional);
      return res.status(400).json({ 
        error: isProfessional ? 'Invalid status' : 'Upgrade to Professional to access advanced status tracking'
      });
    }

    // Update the proposal status
    const { data: proposal, error } = await supabase
      .from('proposals')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', proposalId)
      .eq('user_id', session.user.id) // Ensure user owns the proposal
      .select()
      .single();

    if (error) {
      console.error('Error updating proposal status:', error);
      return res.status(500).json({ error: 'Failed to update proposal status' });
    }

    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    // Track the status change in usage/analytics
    try {
      await supabase
        .from('proposal_usage')
        .insert({
          user_id: session.user.id,
          action: `status_changed_to_${status}`,
          proposal_id: proposalId,
          created_at: new Date().toISOString()
        });
    } catch (usageError) {
      // Don't fail the main request if usage tracking fails
      console.error('Error tracking status change:', usageError);
    }

    return res.status(200).json(proposal);

  } catch (error) {
    console.error('Status update error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}