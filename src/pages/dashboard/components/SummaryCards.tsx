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

function calculateChange(current: number, previous: number): { percent: string; isPositive: boolean } {
  if (previous === 0) return { percent: '-', isPositive: true };
  const change = ((current - previous) / previous) * 100;
  const isPositive = change >= 0;
  return {
    percent: `${isPositive ? '+' : ''}${change.toFixed(1)}%`,
    isPositive,
  };
}

export default function SummaryCards({ dateRange = '30days' }: SummaryCardsProps) {
  const { propertyId } = useSelectedProperty();
  const { data, previousData, loading, error } = useBasicMetrics(propertyId, dateRange);

  const cards = [
    {
      title: 'PV（ページビュー）',
      value: data ? formatNumber(data.pageViews) : '-',
      previousValue: previousData ? formatNumber(previousData.pageViews) : null,
      change: data && previousData ? calculateChange(data.pageViews, previousData.pageViews) : null,
      icon: 'ri-eye-line',
      color: 'from-blue-400 to-blue-500',
      shadowColor: 'shadow-blue-500/25',
    },
    {
      title: 'ユーザー数',
      value: data ? formatNumber(data.users) : '-',
      previousValue: previousData ? formatNumber(previousData.users) : null,
      change: data && previousData ? calculateChange(data.users, previousData.users) : null,
      icon: 'ri-user-line',
      color: 'from-teal-400 to-teal-500',
      shadowColor: 'shadow-teal-500/25',
    },
    {
      title: 'セッション数',
      value: data ? formatNumber(data.sessions) : '-',
      previousValue: previousData ? formatNumber(previousData.sessions) : null,
      change: data && previousData ? calculateChange(data.sessions, previousData.sessions) : null,
      icon: 'ri-check-double-line',
      color: 'from-purple-400 to-purple-500',
      shadowColor: 'shadow-purple-500/25',
    },
    {
      title: '平均滞在時間',
      value: data ? formatDuration(data.avgSessionDuration) : '-',
      previousValue: previousData ? formatDuration(previousData.avgSessionDuration) : null,
      change: data && previousData ? calculateChange(data.avgSessionDuration, previousData.avgSessionDuration) : null,
      icon: 'ri-time-line',
      color: 'from-orange-400 to-orange-500',
      shadowColor: 'shadow-orange-500/25',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 animate-pulse"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-white/10"></div>
              <div className="w-12 h-4 rounded bg-white/10"></div>
            </div>
            <div className="w-24 h-4 rounded bg-white/10 mb-2"></div>
            <div className="w-16 h-8 rounded bg-white/10"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center backdrop-blur-xl">
        <i className="ri-error-warning-line text-red-400 text-2xl mb-2"></i>
        <p className="text-red-400">データの取得に失敗しました</p>
        <p className="text-red-500/60 text-sm">{error}</p>
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
          className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg ${card.shadowColor}`}
            >
              <i className={`${card.icon} text-white text-xl`}></i>
            </div>
            {card.change && card.change.percent !== '-' && (
              <span
                className={`text-sm font-bold ${card.change.isPositive ? 'text-emerald-400' : 'text-red-400'}`}
              >
                {card.change.percent}
              </span>
            )}
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">{card.title}</h3>
          <div className="flex items-baseline gap-2">
            <motion.p
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: 'easeOut' }}
            >
              {card.value}
            </motion.p>
            {card.previousValue && (
              <span className="text-sm text-slate-500">
                ({card.previousValue})
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
