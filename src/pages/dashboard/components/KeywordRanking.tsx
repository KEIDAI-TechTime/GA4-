import { useEffect, useState } from 'react';
import { useTopSearchKeywords, useSearchConsoleSites } from '../../../hooks/useSearchConsole';

export default function KeywordRanking() {
  const { sites, loading: sitesLoading } = useSearchConsoleSites();
  const [siteUrl, setSiteUrl] = useState<string | null>(null);

  // Auto-select site based on stored preference or first available
  useEffect(() => {
    const stored = localStorage.getItem('selected_search_console_site');
    if (stored) {
      setSiteUrl(stored);
    } else if (sites.length > 0) {
      // Auto-select first site and save it
      const firstSite = sites[0].siteUrl;
      localStorage.setItem('selected_search_console_site', firstSite);
      setSiteUrl(firstSite);
    }
  }, [sites]);

  const { data, loading, error } = useTopSearchKeywords(siteUrl, '30days');

  // Loading state
  if (sitesLoading || loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">検索キーワード</h2>
            <p className="text-sm text-slate-500">上位5キーワード</p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Error state or no site connected
  if (error || sites.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">検索キーワード</h2>
            <p className="text-sm text-slate-500">上位5キーワード</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-slate-600 text-sm mb-2">
            {sites.length === 0
              ? 'Search Consoleにサイトが登録されていません'
              : 'データの取得に失敗しました'}
          </p>
          <p className="text-slate-400 text-xs">
            {sites.length === 0
              ? 'Google Search Consoleでサイトを登録してください'
              : error}
          </p>
        </div>
      </div>
    );
  }

  // No data available
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">検索キーワード</h2>
            <p className="text-sm text-slate-500">上位5キーワード</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-slate-600 text-sm">検索データがありません</p>
          <p className="text-slate-400 text-xs mt-1">
            データが蓄積されるまでお待ちください
          </p>
        </div>
      </div>
    );
  }

  const keywords = data.slice(0, 5);

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
                  <p className="text-sm font-medium text-slate-900 mb-1 truncate" title={item.keyword}>
                    {item.keyword}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <span className="whitespace-nowrap">クリック: {item.clicks}</span>
                    <span className="whitespace-nowrap">表示: {item.impressions.toLocaleString()}</span>
                    <span className="whitespace-nowrap">CTR: {item.ctr.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              {item.change !== 0 && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 ml-3 ${
                    item.change > 0
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
