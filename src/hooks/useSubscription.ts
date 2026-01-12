import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

interface SubscriptionData {
  hasSubscription: boolean;
  plan: 'free' | 'pro';
  customerId: string | null;
  subscriptionId?: string;
  priceId?: string;
  currentPeriodEnd?: number;
  cancelAtPeriodEnd?: boolean;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!user?.email) {
      setSubscription({
        hasSubscription: false,
        plan: 'free',
        customerId: null,
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const basePath = typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : '';
      const response = await fetch(
        `${basePath}/api/stripe/subscription?email=${encodeURIComponent(user.email)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch subscription');
      }

      const data = await response.json();
      setSubscription(data);
      setError(null);
    } catch (err) {
      console.error('Subscription fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      setSubscription({
        hasSubscription: false,
        plan: 'free',
        customerId: null,
      });
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const createCheckout = useCallback(async (priceId: string) => {
    if (!user?.email) {
      throw new Error('User not logged in');
    }

    const basePath = typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : '';
    const response = await fetch(`${basePath}/api/stripe/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        userId: user.uid,
        priceId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const data = await response.json();

    // Redirect to Stripe Checkout
    if (data.url) {
      window.location.href = data.url;
    }

    return data;
  }, [user]);

  const openPortal = useCallback(async () => {
    if (!subscription?.customerId) {
      throw new Error('No customer ID found');
    }

    const basePath = typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : '';
    const response = await fetch(`${basePath}/api/stripe/portal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: subscription.customerId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create portal session');
    }

    const data = await response.json();

    // Redirect to Customer Portal
    if (data.url) {
      window.location.href = data.url;
    }

    return data;
  }, [subscription?.customerId]);

  const isPro = subscription?.plan === 'pro' && subscription?.hasSubscription;

  return {
    subscription,
    loading,
    error,
    isPro,
    createCheckout,
    openPortal,
    refetch: fetchSubscription,
  };
}
