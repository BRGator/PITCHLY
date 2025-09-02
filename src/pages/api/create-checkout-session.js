import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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

  const { tier } = req.body;

  if (!tier || !['professional', 'agency'].includes(tier.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid tier specified' });
  }

  try {
    // Get or create Stripe customer
    let stripeCustomerId;
    
    // Check if user already has a Stripe customer ID
    const { data: existingSubscription } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', session.user.id)
      .single();

    if (existingSubscription?.stripe_customer_id) {
      stripeCustomerId = existingSubscription.stripe_customer_id;
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name,
        metadata: {
          userId: session.user.id,
        },
      });
      stripeCustomerId = customer.id;

      // Update our database with the Stripe customer ID
      await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: session.user.id,
          stripe_customer_id: stripeCustomerId,
          tier: 'free',
          proposals_limit: 3,
        });
    }

    // Price mapping
    const prices = {
      professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
      agency: process.env.STRIPE_AGENCY_PRICE_ID
    };

    const priceId = prices[tier.toLowerCase()];
    
    if (!priceId) {
      return res.status(400).json({ message: 'Price ID not configured for tier' });
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/upgrade?canceled=true`,
      metadata: {
        userId: session.user.id,
        tier: tier.toLowerCase(),
      },
      subscription_data: {
        metadata: {
          userId: session.user.id,
          tier: tier.toLowerCase(),
        },
      },
      // Enable customer portal access
      allow_promotion_codes: true,
    });

    res.status(200).json({ url: checkoutSession.url });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ message: 'Payment failed. Please try again.' });
    }
    
    res.status(500).json({ 
      message: 'Failed to create checkout session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}