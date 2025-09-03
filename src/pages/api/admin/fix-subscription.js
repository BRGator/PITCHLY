import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Get user's subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (subscriptionError || !subscription) {
      return res.status(404).json({ message: 'No subscription found' });
    }

    // If subscription already has Stripe IDs, no need to fix
    if (subscription.stripe_customer_id) {
      return res.status(200).json({ 
        message: 'Subscription already has Stripe customer ID',
        subscription 
      });
    }

    // Create Stripe customer for this user
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name,
      metadata: {
        userId: session.user.id,
      },
    });

    // Update subscription with Stripe customer ID
    const { data: updatedSubscription, error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        stripe_customer_id: customer.id,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating subscription:', updateError);
      return res.status(500).json({ message: 'Failed to update subscription' });
    }

    res.status(200).json({ 
      message: 'Subscription fixed successfully',
      subscription: updatedSubscription,
      stripeCustomerId: customer.id
    });

  } catch (error) {
    console.error('Fix subscription error:', error);
    
    res.status(500).json({ 
      message: 'Failed to fix subscription',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}