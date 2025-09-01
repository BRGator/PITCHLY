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

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    console.log('Updating user name:', name, 'for user ID:', session.user.id);
    
    const { data, error } = await supabase
      .from('users')
      .update({ name })
      .eq('id', session.user.id)
      .select()
      .single();

    console.log('Update result:', data, 'error:', error);

    if (error) throw error;

    res.status(200).json({ success: true, user: data });
  } catch (error) {
    console.error('Error updating user name:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}