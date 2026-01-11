export default function PageRanking() {
  const pages = [
    { name: 'トップページ', path: '/', views: 8542, change: 12 },
    { name: '商品一覧', path: '/products', views: 5231, change: -8 },
    { name: '会社概要', path: '/about', views: 3892, change: 5 },
    { name: 'お問い合わせ', path: '/contact', views: 2156, change: 15 },
    { name: 'ブログ記事', path: '/blog/article-1', views: 1847, change: 22 },
  ];

  const maxViews = Math.max(...pages.map(p => p.views));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">ページ別アクセス</h2>
          <p className="text-sm text-slate-500">上位5ページ</p>
        </div>
        <button className="text-sm text-teal-600 font-medium hover:text-teal-700 whitespace-nowrap">
          すべて見る
        </button>
      </div>

      <div className="space-y-4">
        {pages.map((page, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 truncate">{page.name}</p>
                  <p className="text-xs text-slate-500 truncate">{page.path}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0 ml-3">
                <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                  {page.views.toLocaleString()}
                </span>
                <span
                  className={`text-xs font-bold whitespace-nowrap ${
                    page.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {page.change > 0 ? '+' : ''}{page.change}%
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(page.views / maxViews) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
