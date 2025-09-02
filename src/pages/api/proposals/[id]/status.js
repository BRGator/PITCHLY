import { getSession } from 'next-auth/react';
import { supabase } from '../../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: proposalId } = req.query;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = [
      'draft', 'sent', 'viewed', 'under_review', 
      'accepted', 'won', 'rejected', 'expired', 'withdrawn'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
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