// API endpoint for creating embedded Stripe checkout sessions
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { tier } = req.body;
    console.log('Creating embedded checkout for tier:', tier);
    
    // Get the price ID based on tier
    let priceId;
    switch (tier) {
      case 'professional':
        priceId = process.env.STRIPE_PROFESSIONAL_PRICE_ID;
        break;
      case 'agency':
        priceId = process.env.STRIPE_AGENCY_PRICE_ID;
        break;
      default:
        console.error('Invalid tier provided:', tier);
        return res.status(400).json({ error: 'Invalid tier' });
    }

    console.log('Using price ID:', priceId ? 'configured' : 'missing');
    if (!priceId) {
      return res.status(500).json({ error: 'Price ID not configured for tier: ' + tier });
    }

    // Create embedded checkout session
    console.log('Creating Stripe checkout session with:', {
      priceId,
      userId: session.user.id,
      email: session.user.email,
      tier
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {
        userId: session.user.id,
        tier: tier,
      },
      customer_email: session.user.email,
      subscription_data: {
        metadata: {
          userId: session.user.id,
        },
      },
      return_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log('Stripe checkout session created:', {
      id: checkoutSession.id,
      hasClientSecret: !!checkoutSession.client_secret
    });

    res.status(200).json({ 
      clientSecret: checkoutSession.client_secret 
    });

  } catch (error) {
    console.error('Embedded checkout error:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}