import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Disable body parsing for webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};

const getTierFromPrice = (priceId) => {
  if (priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID) return 'professional';
  if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) return 'agency';
  return 'free';
};

const getProposalLimit = (tier) => {
  switch (tier) {
    case 'professional': return 100;
    case 'agency': return -1; // unlimited
    default: return 3; // free
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier;

        if (!userId) {
          console.error('No userId in checkout session metadata');
          break;
        }

        // Get the subscription details
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        const priceId = subscription.items.data[0].price.id;
        const detectedTier = getTierFromPrice(priceId) || tier;

        // Update user subscription in database
        await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: userId,
            tier: detectedTier,
            status: 'active',
            stripe_customer_id: session.customer,
            stripe_subscription_id: subscription.id,
            proposals_limit: getProposalLimit(detectedTier),
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString()
          });

        console.log(`✅ Subscription activated for user ${userId} - ${detectedTier} tier`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;
        
        if (!userId) {
          // Try to find user by customer ID
          const { data: userSub } = await supabase
            .from('user_subscriptions')
            .select('user_id')
            .eq('stripe_customer_id', subscription.customer)
            .single();
          
          if (userSub) {
            userId = userSub.user_id;
          }
        }

        if (!userId) {
          console.error('No userId found for subscription update');
          break;
        }

        const priceId = subscription.items.data[0].price.id;
        const tier = getTierFromPrice(priceId);
        const status = subscription.status === 'active' ? 'active' : 
                     subscription.status === 'canceled' ? 'cancelled' : 
                     subscription.status === 'past_due' ? 'expired' : 'active';

        await supabase
          .from('user_subscriptions')
          .update({
            tier: status === 'active' ? tier : 'free',
            status: status,
            proposals_limit: status === 'active' ? getProposalLimit(tier) : 3,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);

        console.log(`✅ Subscription updated for user ${userId} - ${tier} tier, status: ${status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          // Try to find user by customer ID
          const { data: userSub } = await supabase
            .from('user_subscriptions')
            .select('user_id')
            .eq('stripe_customer_id', subscription.customer)
            .single();
          
          if (userSub) {
            userId = userSub.user_id;
          }
        }

        if (!userId) {
          console.error('No userId found for subscription deletion');
          break;
        }

        // Downgrade to free tier
        await supabase
          .from('user_subscriptions')
          .update({
            tier: 'free',
            status: 'cancelled',
            proposals_limit: 3,
            stripe_subscription_id: null,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);

        console.log(`✅ Subscription cancelled for user ${userId} - downgraded to free`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const userId = subscription.metadata?.userId;

          if (userId) {
            // Reset monthly usage on successful payment (new billing period)
            await supabase
              .from('user_subscriptions')
              .update({
                proposals_used_this_period: 0,
                current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                updated_at: new Date().toISOString()
              })
              .eq('user_id', userId);

            console.log(`✅ Payment succeeded for user ${userId} - usage reset`);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const userId = subscription.metadata?.userId;

          if (userId) {
            // Mark subscription as past due but don't downgrade immediately
            await supabase
              .from('user_subscriptions')
              .update({
                status: 'past_due',
                updated_at: new Date().toISOString()
              })
              .eq('user_id', userId);

            console.log(`⚠️ Payment failed for user ${userId} - marked as past due`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}