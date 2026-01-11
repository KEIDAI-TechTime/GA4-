export default function TrafficSources() {
  const sources = [
    { name: '検索', value: 45, color: '#14b8a6', icon: 'ri-search-line' },
    { name: 'SNS', value: 25, color: '#a855f7', icon: 'ri-share-line' },
    { name: '直接', value: 20, color: '#f59e0b', icon: 'ri-link' },
    { name: 'その他', value: 10, color: '#64748b', icon: 'ri-more-line' },
  ];

  const total = sources.reduce((sum, s) => sum + s.value, 0);
  let currentAngle = -90;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">流入元</h2>
        <p className="text-sm text-slate-500">トラフィックソース別</p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90">
            {sources.map((source, index) => {
              const percentage = (source.value / total) * 100;
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
            <circle cx="96" cy="96" r="50" fill="white" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">100%</p>
              <p className="text-xs text-slate-500">合計</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sources.map((source, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${source.color}15` }}
            >
              <i className={`${source.icon} text-lg`} style={{ color: source.color }}></i>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900">{source.name}</p>
              <p className="text-xs text-slate-500">{source.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
