import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Check if user can create proposal using database function
    const { data: canCreateResult, error: checkError } = await supabase
      .rpc('can_create_proposal', { p_user_id: session.user.id });

    if (checkError) {
      console.error('Error checking proposal limits:', checkError);
      return res.status(500).json({ message: 'Failed to check limits' });
    }

    // Get subscription details
    const { data: subscription, error: subError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (subError && subError.code !== 'PGRST116') {
      console.error('Error fetching subscription:', subError);
      return res.status(500).json({ message: 'Failed to fetch subscription' });
    }

    // If no subscription exists, create free tier
    if (!subscription) {
      const { data: newSub, error: createError } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: session.user.id,
          tier: 'free',
          proposals_limit: 3,
          proposals_used_this_period: 0
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating subscription:', createError);
        return res.status(500).json({ message: 'Failed to create subscription' });
      }

      return res.status(200).json({
        canCreate: true,
        subscription: newSub,
        usage: {
          used: 0,
          limit: 3,
          remaining: 3,
          unlimited: false
        }
      });
    }

    // Calculate usage
    const unlimited = subscription.proposals_limit === -1;
    const used = subscription.proposals_used_this_period;
    const limit = subscription.proposals_limit;
    const remaining = unlimited ? -1 : Math.max(0, limit - used);

    res.status(200).json({
      canCreate: canCreateResult,
      subscription,
      usage: {
        used,
        limit,
        remaining,
        unlimited
      }
    });

  } catch (error) {
    console.error('Subscription check error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}