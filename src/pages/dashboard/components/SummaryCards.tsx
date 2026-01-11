import { motion } from 'framer-motion';
import { useBasicMetrics, useSelectedProperty } from '../../../hooks/useGA4';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

interface SummaryCardsProps {
  dateRange?: string;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function SummaryCards({ dateRange = '30days' }: SummaryCardsProps) {
  const { propertyId } = useSelectedProperty();
  const { data, loading, error } = useBasicMetrics(propertyId, dateRange);

  const cards = [
    {
      title: 'PV（ページビュー）',
      value: data ? formatNumber(data.pageViews) : '-',
      change: '-', // 前期比は別途API呼び出しが必要
      isPositive: true,
      icon: 'ri-eye-line',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'ユーザー数',
      value: data ? formatNumber(data.users) : '-',
      change: '-',
      isPositive: true,
      icon: 'ri-user-line',
      color: 'from-teal-500 to-teal-600',
    },
    {
      title: 'セッション数',
      value: data ? formatNumber(data.sessions) : '-',
      change: '-',
      isPositive: true,
      icon: 'ri-check-double-line',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: '平均滞在時間',
      value: data ? formatDuration(data.avgSessionDuration) : '-',
      change: '-',
      isPositive: true,
      icon: 'ri-time-line',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 animate-pulse"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-200"></div>
              <div className="w-12 h-4 rounded bg-slate-200"></div>
            </div>
            <div className="w-24 h-4 rounded bg-slate-200 mb-2"></div>
            <div className="w-16 h-8 rounded bg-slate-200"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <i className="ri-error-warning-line text-red-500 text-2xl mb-2"></i>
        <p className="text-red-600">データの取得に失敗しました</p>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
            >
              <i className={`${card.icon} text-white text-xl`}></i>
            </div>
            {card.change !== '-' && (
              <span
                className={`text-sm font-bold ${card.isPositive ? 'text-teal-600' : 'text-red-600'}`}
              >
                {card.change}
              </span>
            )}
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">{card.title}</h3>
          <motion.p
            className="text-3xl font-bold text-slate-900"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: 'easeOut' }}
          >
            {card.value}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}
