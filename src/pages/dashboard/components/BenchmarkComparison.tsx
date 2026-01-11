export default function BenchmarkComparison() {
  const benchmarks = [
    {
      metric: 'PV数',
      value: '24,582',
      benchmark: '同業種平均より上位35%',
      status: 'good',
      icon: 'ri-eye-line',
    },
    {
      metric: '直帰率',
      value: '52.3%',
      benchmark: '平均的',
      status: 'normal',
      icon: 'ri-logout-box-line',
    },
    {
      metric: 'スマホ比率',
      value: '68%',
      benchmark: 'やや高め',
      status: 'warning',
      icon: 'ri-smartphone-line',
    },
    {
      metric: 'セッション時間',
      value: '2分18秒',
      benchmark: '同業種平均より上位20%',
      status: 'good',
      icon: 'ri-time-line',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">競合との比較</h2>
        <p className="text-sm text-slate-500">業種別ベンチマーク（小売業）</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benchmarks.map((item, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-lg p-4 hover:border-teal-300 transition-colors"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                <i className={`${item.icon} text-lg text-slate-600`}></i>
              </div>
              <span className="text-sm font-medium text-slate-900">{item.metric}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-2">{item.value}</p>
            <div className="flex items-center space-x-2">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  item.status === 'good'
                    ? 'bg-green-500'
                    : item.status === 'warning'
                    ? 'bg-orange-500'
                    : 'bg-slate-400'
                }`}
              ></span>
              <span className="text-xs text-slate-600">{item.benchmark}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
