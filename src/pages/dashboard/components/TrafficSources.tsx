import { useTrafficSources, useSelectedProperty } from '../../../hooks/useGA4';

interface TrafficSourcesProps {
  dateRange?: string;
}

// ソース名を日本語に変換し、アイコンと色を割り当て
function getSourceInfo(source: string): { name: string; icon: string; color: string } {
  const sourceLower = source.toLowerCase();

  if (sourceLower.includes('google') || sourceLower.includes('yahoo') || sourceLower.includes('bing')) {
    return { name: '検索', icon: 'ri-search-line', color: '#2dd4bf' };
  }
  if (sourceLower.includes('twitter') || sourceLower.includes('facebook') || sourceLower.includes('instagram') || sourceLower.includes('linkedin') || sourceLower === 'social') {
    return { name: 'SNS', icon: 'ri-share-line', color: '#c084fc' };
  }
  if (sourceLower === '(direct)' || sourceLower === 'direct') {
    return { name: '直接', icon: 'ri-link', color: '#fbbf24' };
  }
  if (sourceLower.includes('referral') || sourceLower.includes('ref')) {
    return { name: '参照', icon: 'ri-external-link-line', color: '#60a5fa' };
  }
  return { name: source || 'その他', icon: 'ri-more-line', color: '#94a3b8' };
}

export default function TrafficSources({ dateRange = '30days' }: TrafficSourcesProps) {
  const { propertyId } = useSelectedProperty();
  const { data, loading, error } = useTrafficSources(propertyId, dateRange);

  // データを集約してカテゴリ別に分類
  const aggregatedSources = data.reduce((acc, item) => {
    const info = getSourceInfo(item.source);
    const existing = acc.find(s => s.name === info.name);
    if (existing) {
      existing.sessions += item.sessions;
    } else {
      acc.push({
        name: info.name,
        sessions: item.sessions,
        icon: info.icon,
        color: info.color,
      });
    }
    return acc;
  }, [] as { name: string; sessions: number; icon: string; color: string }[]);

  // セッション数でソートして上位4つを取得
  const sortedSources = aggregatedSources
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 4);

  const total = sortedSources.reduce((sum, s) => sum + s.sessions, 0);

  // パーセンテージを計算
  const sourcesWithPercentage = sortedSources.map(s => ({
    ...s,
    value: total > 0 ? Math.round((s.sessions / total) * 100) : 0,
  }));

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">流入元</h2>
          <p className="text-sm text-slate-400">トラフィックソース別</p>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">流入元</h2>
          <p className="text-sm text-slate-400">トラフィックソース別</p>
        </div>
        <div className="h-48 flex items-center justify-center text-red-400">
          <p>データの取得に失敗しました</p>
        </div>
      </div>
    );
  }

  if (sourcesWithPercentage.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">流入元</h2>
          <p className="text-sm text-slate-400">トラフィックソース別</p>
        </div>
        <div className="h-48 flex items-center justify-center text-slate-400">
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  // 円グラフ用の角度計算
  let currentAngle = -90;

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-white">流入元</h2>
        <p className="text-sm text-slate-400">トラフィックソース別</p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90">
            {sourcesWithPercentage.map((source, index) => {
              const percentage = source.value;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              currentAngle += angle;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (currentAngle * Math.PI) / 180;
              const largeArc = angle > 180 ? 1 : 0;

              const x1 = 96 + 80 * Math.cos(startRad);
              const y1 = 96 + 80 * Math.sin(startRad);
              const x2 = 96 + 80 * Math.cos(endRad);
              const y2 = 96 + 80 * Math.sin(endRad);

              return (
                <path
                  key={index}
                  d={`M 96 96 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={source.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
            <circle cx="96" cy="96" r="50" fill="rgb(15, 23, 42)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{total.toLocaleString()}</p>
              <p className="text-xs text-slate-400">セッション</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sourcesWithPercentage.map((source, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${source.color}20` }}
            >
              <i className={`${source.icon} text-lg`} style={{ color: source.color }}></i>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">{source.name}</p>
              <p className="text-xs text-slate-400">{source.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
