// API endpoint to verify checkout session completion
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID required' });
  }

  try {
    // Retrieve the checkout session
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    
    if (checkoutSession.payment_status === 'paid') {
      res.status(200).json({ 
        success: true,
        session: {
          id: checkoutSession.id,
          tier: checkoutSession.metadata?.tier,
          amount_total: checkoutSession.amount_total,
          customer: checkoutSession.customer,
          subscription: checkoutSession.subscription
        }
      });
    } else {
      res.status(400).json({ 
        success: false, 
        error: 'Payment not completed',
        status: checkoutSession.payment_status 
      });
    }
  } catch (error) {
    console.error('Checkout verification error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to verify checkout session' 
    });
  }
}