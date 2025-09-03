// API endpoint to create setup intent for updating payment methods
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get user's subscription from database
    const { data: subscription, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error || !subscription?.stripe_customer_id) {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    // Create a setup intent for updating payment method
    const setupIntent = await stripe.setupIntents.create({
      customer: subscription.stripe_customer_id,
      usage: 'off_session',
      payment_method_types: ['card'],
    });

    // Create a hosted page for payment method update (simpler approach)
    // Alternatively, you could return the setup intent for client-side handling
    const session_url = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
      flow_data: {
        type: 'payment_method_update',
      }
    });

    res.status(200).json({ 
      url: session_url.url,
      setupIntent: setupIntent.client_secret 
    });

  } catch (error) {
    console.error('Payment method update error:', error);
    res.status(500).json({ 
      error: 'Failed to create payment method update session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}