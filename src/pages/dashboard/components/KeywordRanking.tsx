export default function KeywordRanking() {
  const keywords = [
    { keyword: '商品名 口コミ', clicks: 1247, impressions: 8542, ctr: 14.6, change: 45 },
    { keyword: '商品名 価格', clicks: 892, impressions: 6231, ctr: 14.3, change: 12 },
    { keyword: '商品名 比較', clicks: 654, impressions: 4892, ctr: 13.4, change: -5 },
    { keyword: '商品名 評判', clicks: 521, impressions: 3156, ctr: 16.5, change: 28 },
    { keyword: '商品名 おすすめ', clicks: 438, impressions: 2847, ctr: 15.4, change: 8 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">検索キーワード</h2>
          <p className="text-sm text-slate-500">上位5キーワード</p>
        </div>
        <button className="text-sm text-teal-600 font-medium hover:text-teal-700 whitespace-nowrap">
          すべて見る
        </button>
      </div>

      <div className="space-y-4">
        {keywords.map((item, index) => (
          <div key={index} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 mb-1">{item.keyword}</p>
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <span className="whitespace-nowrap">クリック: {item.clicks}</span>
                    <span className="whitespace-nowrap">表示: {item.impressions.toLocaleString()}</span>
                    <span className="whitespace-nowrap">CTR: {item.ctr}%</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 ml-3 ${
                  item.change > 0
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
