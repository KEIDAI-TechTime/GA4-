import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY is not configured' });
  }

  try {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return res.status(200).json({
        hasSubscription: false,
        plan: 'free',
        customerId: null,
      });
    }

    const customer = customers.data[0];

    // Get active subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return res.status(200).json({
        hasSubscription: false,
        plan: 'free',
        customerId: customer.id,
      });
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0]?.price.id;

    return res.status(200).json({
      hasSubscription: true,
      plan: 'pro',
      customerId: customer.id,
      subscriptionId: subscription.id,
      priceId: priceId,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  } catch (error) {
    console.error('Stripe subscription check error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to check subscription',
    });
  }
}
