import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTopSearchKeywords, useSearchConsoleSites } from '../../../hooks/useSearchConsole';

export default function KeywordRanking() {
  const { sites, loading: sitesLoading } = useSearchConsoleSites();
  const [siteUrl, setSiteUrl] = useState<string | null>(null);
  const [showAllModal, setShowAllModal] = useState(false);

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
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">検索キーワード</h2>
            <p className="text-sm text-slate-400">上位5キーワード</p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Error state or no site connected
  if (error || sites.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">検索キーワード</h2>
            <p className="text-sm text-slate-400">上位5キーワード</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-slate-300 text-sm mb-2">
            {sites.length === 0
              ? 'Search Consoleにサイトが登録されていません'
              : 'データの取得に失敗しました'}
          </p>
          <p className="text-slate-500 text-xs">
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
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">検索キーワード</h2>
            <p className="text-sm text-slate-400">上位5キーワード</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-slate-300 text-sm">検索データがありません</p>
          <p className="text-slate-500 text-xs mt-1">
            データが蓄積されるまでお待ちください
          </p>
        </div>
      </div>
    );
  }

  const keywords = data.slice(0, 5);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white">検索キーワード</h2>
          <p className="text-sm text-slate-400">上位5キーワード</p>
        </div>
        <button
          onClick={() => setShowAllModal(true)}
          className="text-sm text-teal-400 font-medium hover:text-teal-300 whitespace-nowrap cursor-pointer"
        >
          すべて見る
        </button>
      </div>

      <div className="space-y-4">
        {keywords.map((item, index) => (
          <div key={index} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <span className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white mb-1 truncate" title={item.keyword}>
                    {item.keyword}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
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
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* すべて見るモーダル */}
      <AnimatePresence>
        {showAllModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowAllModal(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-slate-800/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">検索キーワード</h2>
                    <p className="text-sm text-slate-400">全{data.length}キーワード</p>
                  </div>
                  <button
                    onClick={() => setShowAllModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-xl text-slate-400"></i>
                  </button>
                </div>

                <div className="overflow-y-auto p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-xs font-medium text-slate-400 pb-3">#</th>
                        <th className="text-left text-xs font-medium text-slate-400 pb-3">キーワード</th>
                        <th className="text-right text-xs font-medium text-slate-400 pb-3">クリック</th>
                        <th className="text-right text-xs font-medium text-slate-400 pb-3">表示回数</th>
                        <th className="text-right text-xs font-medium text-slate-400 pb-3">CTR</th>
                        <th className="text-right text-xs font-medium text-slate-400 pb-3">変化</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index} className="border-b border-white/5 last:border-0">
                          <td className="py-3 text-sm text-slate-500">{index + 1}</td>
                          <td className="py-3">
                            <span className="text-sm font-medium text-white">{item.keyword}</span>
                          </td>
                          <td className="py-3 text-right text-sm text-slate-300">{item.clicks}</td>
                          <td className="py-3 text-right text-sm text-slate-300">{item.impressions.toLocaleString()}</td>
                          <td className="py-3 text-right text-sm text-slate-300">{item.ctr.toFixed(1)}%</td>
                          <td className="py-3 text-right">
                            {item.change !== 0 && (
                              <span
                                className={`text-xs font-bold ${
                                  item.change > 0 ? 'text-emerald-400' : 'text-red-400'
                                }`}
                              >
                                {item.change > 0 ? '+' : ''}{item.change}%
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
