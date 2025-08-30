// pages/api/delete.js

import { getSupabaseClient } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing proposal ID' });
  }

  const supabase = getSupabaseClient();

  const { error } = await supabase.from('proposals').delete().eq('id', id);

  if (error) {
    console.error('❌ Supabase delete error:', error.message);
    return res.status(500).json({ error: 'Failed to delete proposal' });
  }

  return res.status(200).json({ message: 'Proposal deleted successfully' });
}