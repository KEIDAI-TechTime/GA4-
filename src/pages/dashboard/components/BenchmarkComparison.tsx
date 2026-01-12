import { useAIAnalysis } from '../../../hooks/useAIAnalysis';

interface BenchmarkComparisonProps {
  dateRange?: string;
}

export default function BenchmarkComparison({ dateRange = '30days' }: BenchmarkComparisonProps) {
  const { analysis, loading, error } = useAIAnalysis(dateRange);

  // Get industry from localStorage
  const industry = typeof window !== 'undefined'
    ? localStorage.getItem('selected_industry') || '小売'
    : '小売';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-emerald-500';
      case 'needsWork':
        return 'bg-orange-500';
      default:
        return 'bg-slate-400';
    }
  };

  const getStatusText = (status: string, value: number, avg: number) => {
    const diff = ((value - avg) / avg * 100).toFixed(0);
    if (status === 'good') {
      return `業界平均より${Math.abs(Number(diff))}%良好`;
    } else if (status === 'needsWork') {
      return `業界平均より${Math.abs(Number(diff))}%改善余地あり`;
    }
    return '業界平均レベル';
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}分${secs}秒`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">競合との比較</h2>
            <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
              AI
            </span>
          </div>
          <p className="text-sm text-slate-400">業種別ベンチマーク（{industry}）</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse border border-white/10 rounded-lg p-4 bg-white/5">
              <div className="h-4 bg-white/10 rounded w-1/2 mb-3"></div>
              <div className="h-8 bg-white/10 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error or no data
  if (error || !analysis?.industryComparison) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">競合との比較</h2>
          <p className="text-sm text-slate-400">業種別ベンチマーク（{industry}）</p>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-slate-300 text-sm">
            {error ? 'データの取得に失敗しました' : 'データを分析中です'}
          </p>
        </div>
      </div>
    );
  }

  const comparison = analysis.industryComparison;

  const benchmarks = [
    {
      metric: '直帰率',
      value: `${comparison.bounceRate.value.toFixed(1)}%`,
      industryAvg: `${comparison.bounceRate.industryAvg.toFixed(1)}%`,
      benchmark: getStatusText(
        comparison.bounceRate.status,
        comparison.bounceRate.industryAvg, // For bounce rate, lower is better
        comparison.bounceRate.value
      ),
      status: comparison.bounceRate.status,
      icon: 'ri-logout-box-line',
    },
    {
      metric: 'セッション時間',
      value: formatDuration(comparison.avgSessionDuration.value),
      industryAvg: formatDuration(comparison.avgSessionDuration.industryAvg),
      benchmark: getStatusText(
        comparison.avgSessionDuration.status,
        comparison.avgSessionDuration.value,
        comparison.avgSessionDuration.industryAvg
      ),
      status: comparison.avgSessionDuration.status,
      icon: 'ri-time-line',
    },
    {
      metric: 'ページ/セッション',
      value: comparison.pagesPerSession.value.toFixed(1),
      industryAvg: comparison.pagesPerSession.industryAvg.toFixed(1),
      benchmark: getStatusText(
        comparison.pagesPerSession.status,
        comparison.pagesPerSession.value,
        comparison.pagesPerSession.industryAvg
      ),
      status: comparison.pagesPerSession.status,
      icon: 'ri-file-list-line',
    },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white">競合との比較</h2>
          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
            AI
          </span>
        </div>
        <p className="text-sm text-slate-400">業種別ベンチマーク（{industry}）</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {benchmarks.map((item, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-lg p-4 hover:border-teal-500/50 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                <i className={`${item.icon} text-lg text-slate-300`}></i>
              </div>
              <span className="text-sm font-medium text-white">{item.metric}</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
            <p className="text-xs text-slate-400 mb-2">業界平均: {item.industryAvg}</p>
            <div className="flex items-center space-x-2">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(item.status)}`}
              ></span>
              <span className="text-xs text-slate-300">{item.benchmark}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
