// Stripe configuration
// Replace these with your actual Stripe price IDs from your Stripe Dashboard

export const STRIPE_CONFIG = {
  // Monthly Pro plan price ID
  // Create this in Stripe Dashboard: Products > Add product > Add pricing
  proPriceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID || 'price_XXXXXXXXXXXXX',

  // Yearly Pro plan price ID (optional, for discount)
  proYearlyPriceId: import.meta.env.VITE_STRIPE_PRO_YEARLY_PRICE_ID || 'price_XXXXXXXXXXXXX',
};

export const PLANS = {
  free: {
    name: '無料プラン',
    price: 0,
    priceLabel: '¥0/月',
    features: [
      'GA4データの閲覧',
      '基本的な指標表示',
      '7日間のデータ保持',
      'AI分析（月3回まで）',
    ],
    limitations: {
      aiAnalysisPerMonth: 3,
      dataRetentionDays: 7,
      exportEnabled: false,
      alertsEnabled: false,
    },
  },
  pro: {
    name: 'Proプラン',
    price: 980,
    priceLabel: '¥980/月',
    features: [
      'GA4データの閲覧',
      '全ての指標表示',
      '90日間のデータ保持',
      'AI分析（無制限）',
      'PDF/Excelエクスポート',
      'メール通知',
      '週次レポート',
      '優先サポート',
    ],
    limitations: {
      aiAnalysisPerMonth: -1, // unlimited
      dataRetentionDays: 90,
      exportEnabled: true,
      alertsEnabled: true,
    },
  },
};
