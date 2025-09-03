// API endpoint to fetch comprehensive billing data
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
  if (req.method !== 'GET') {
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
      return res.status(200).json({ 
        subscription: null,
        paymentMethods: [],
        invoices: []
      });
    }

    // Fetch data from Stripe
    const [customer, paymentMethods, invoices] = await Promise.all([
      stripe.customers.retrieve(subscription.stripe_customer_id),
      stripe.paymentMethods.list({
        customer: subscription.stripe_customer_id,
        type: 'card',
      }),
      stripe.invoices.list({
        customer: subscription.stripe_customer_id,
        limit: 10,
      })
    ]);

    // Format payment methods
    const formattedPaymentMethods = paymentMethods.data.map(pm => ({
      id: pm.id,
      card: pm.card,
      isDefault: customer.invoice_settings?.default_payment_method === pm.id
    }));

    // Format subscription data
    const subscriptionData = {
      ...subscription,
      customer: {
        name: customer.name,
        email: customer.email
      }
    };

    res.status(200).json({
      subscription: subscriptionData,
      paymentMethods: formattedPaymentMethods,
      invoices: invoices.data
    });

  } catch (error) {
    console.error('Billing data fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch billing data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}