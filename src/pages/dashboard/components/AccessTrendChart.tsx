import { motion } from 'framer-motion';
import { usePageViewsByDate, useSelectedProperty } from '../../../hooks/useGA4';

interface AccessTrendChartProps {
  dateRange?: string;
}

export default function AccessTrendChart({ dateRange = '30days' }: AccessTrendChartProps) {
  const { propertyId } = useSelectedProperty();
  const { data, loading, error } = usePageViewsByDate(propertyId, dateRange);

  // データを日付でソートして整形
  const chartData = [...data].sort((a, b) => a.date.localeCompare(b.date)).map(item => ({
    date: formatDate(item.date),
    pv: item.pageViews,
    uu: item.users,
  }));

  const maxValue = Math.max(...chartData.map(d => Math.max(d.pv, d.uu)), 1);

  // SVGパスを生成
  const generatePath = (values: number[], height: number = 200): string => {
    if (values.length === 0) return '';
    const width = 800;
    const points = values.map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - (value / maxValue) * (height - 20);
      return `${x} ${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const generateAreaPath = (values: number[], height: number = 200): string => {
    if (values.length === 0) return '';
    const linePath = generatePath(values, height);
    return `${linePath} L 800 ${height} L 0 ${height} Z`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">アクセス推移</h2>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">アクセス推移</h2>
        </div>
        <div className="h-64 flex items-center justify-center text-red-500">
          <p>データの取得に失敗しました</p>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">アクセス推移</h2>
        </div>
        <div className="h-64 flex items-center justify-center text-slate-500">
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  const pvValues = chartData.map(d => d.pv);
  const uuValues = chartData.map(d => d.uu);

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">アクセス推移</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <span className="text-sm text-slate-600">PV</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-slate-600">UU</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pvGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="uuGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 50, 100, 150, 200].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="800"
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {/* PV Area */}
          <motion.path
            d={generateAreaPath(pvValues)}
            fill="url(#pvGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* PV Line */}
          <motion.path
            d={generatePath(pvValues)}
            fill="none"
            stroke="rgb(20, 184, 166)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* UU Area */}
          <motion.path
            d={generateAreaPath(uuValues)}
            fill="url(#uuGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* UU Line */}
          <motion.path
            d={generatePath(uuValues)}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
          />
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          {chartData.length > 0 && (
            <>
              <span>{chartData[0]?.date}</span>
              <span>{chartData[Math.floor(chartData.length / 2)]?.date}</span>
              <span>{chartData[chartData.length - 1]?.date}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function formatDate(dateStr: string): string {
  // YYYYMMDD形式を MM/DD形式に変換
  if (dateStr.length === 8) {
    const month = parseInt(dateStr.substring(4, 6), 10);
    const day = parseInt(dateStr.substring(6, 8), 10);
    return `${month}/${day}`;
  }
  return dateStr;
}
