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
      // Check if user has an active subscription but no Stripe customer ID
      if (subscription && subscription.tier !== 'free') {
        // Try to create a Stripe customer for existing subscription
        try {
          const customer = await stripe.customers.create({
            email: session.user.email,
            name: session.user.name,
            metadata: {
              userId: session.user.id,
            },
          });

          // Update subscription with Stripe customer ID
          await supabase
            .from('user_subscriptions')
            .update({
              stripe_customer_id: customer.id,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', session.user.id);

          console.log('Created Stripe customer for existing subscription:', customer.id);
          
          // Now create billing portal with new customer ID
          const portalSession = await stripe.billingPortal.sessions.create({
            customer: customer.id,
            return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
          });

          return res.status(200).json({ url: portalSession.url });

        } catch (error) {
          console.error('Failed to create Stripe customer:', error);
          return res.status(400).json({ 
            message: 'Unable to access billing portal. This appears to be a development subscription.',
            action: 'contact_support'
          });
        }
      } else {
        return res.status(400).json({ 
          message: 'No active subscription found. Please upgrade to a paid plan first.',
          action: 'upgrade'
        });
      }
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