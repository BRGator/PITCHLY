import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Get user's subscription data from our database
    const { data: subscription, error: subscriptionError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    console.log('Billing portal debug:', { 
      userId: session.user.id, 
      subscription, 
      subscriptionError,
      hasCustomerId: !!subscription?.stripe_customer_id 
    });

    if (!subscription?.stripe_customer_id) {
      return res.status(400).json({ 
        message: 'No active subscription found. Please upgrade to a paid plan first.',
        debug: process.env.NODE_ENV === 'development' ? { subscription, subscriptionError } : undefined
      });
    }

    // Create billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
    });

    res.status(200).json({ url: portalSession.url });

  } catch (error) {
    console.error('Billing portal error:', error);
    
    res.status(500).json({ 
      message: 'Failed to create billing portal session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}