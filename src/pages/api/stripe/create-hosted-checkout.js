// Fallback API endpoint for hosted Stripe checkout (in case embedded fails)
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Map our language codes to Stripe's supported locales
function mapLanguageToStripeLocale(language) {
  const localeMap = {
    'en': 'en', // English
    'es': 'es', // Spanish
    'pt': 'pt-BR', // Portuguese (Brazil)
  };
  return localeMap[language] || 'auto'; // Fallback to 'auto' for unsupported languages
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { tier, language } = req.body;
    
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
        return res.status(400).json({ error: 'Invalid tier' });
    }

    if (!priceId) {
      return res.status(500).json({ error: 'Price ID not configured for tier: ' + tier });
    }

    // Map language to Stripe locale
    const stripeLocale = mapLanguageToStripeLocale(language);

    // Create hosted checkout session (fallback)
    const checkoutSession = await stripe.checkout.sessions.create({
      ui_mode: 'hosted', // Use hosted instead of embedded
      locale: stripeLocale,
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
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/upgrade`,
    });

    res.status(200).json({ 
      url: checkoutSession.url 
    });

  } catch (error) {
    console.error('Hosted checkout error:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}