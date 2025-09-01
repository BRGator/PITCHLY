import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { proposalId } = req.body;

  if (!proposalId) {
    return res.status(400).json({ message: 'Proposal ID is required' });
  }

  try {
    // Update proposal status from 'draft' to 'viewed' when user opens it
    const { data, error } = await supabase
      .from('proposals')
      .update({ 
        status: 'viewed',
        updated_at: new Date().toISOString()
      })
      .eq('id', proposalId)
      .eq('user_id', session.user.id)
      .eq('status', 'draft') // Only update if currently draft
      .select()
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows updated (already viewed)
      throw error;
    }

    res.status(200).json({ success: true, updated: !!data });
  } catch (error) {
    console.error('Error marking proposal as viewed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}