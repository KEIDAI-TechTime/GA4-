import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';

interface HeaderProps {
  dateRange: string;
  setDateRange: (range: string) => void;
  lastUpdated?: Date;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

function formatLastUpdated(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return 'たった今';
  if (diffMins < 60) return `${diffMins}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function Header({ dateRange, setDateRange, lastUpdated, onRefresh, isRefreshing }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [industryName, setIndustryName] = useState<string>('');

  useEffect(() => {
    const industry = localStorage.getItem('selected_industry');
    if (industry) {
      setIndustryName(industry);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <i className="ri-dashboard-3-line text-xl text-white"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">アクセス分析ダッシュボード</h1>
              <p className="text-xs text-slate-500">
                最終更新: {lastUpdated ? formatLastUpdated(lastUpdated) : '-'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* 期間選択 */}
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="7days">過去7日間</option>
                <option value="30days">過去30日間</option>
                <option value="90days">過去90日間</option>
              </select>
              <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
            </div>

            {/* 更新ボタン */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              title="データを更新"
            >
              <i className={`ri-refresh-line text-lg text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`}></i>
            </button>

            {/* メニュー */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full text-white font-bold hover:shadow-lg transition-shadow cursor-pointer"
              >
                U
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-800">{user?.email || 'ゲスト'}</p>
                    <p className="text-xs text-slate-500">{industryName || '業種未設定'}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/settings');
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 cursor-pointer"
                  >
                    <i className="ri-settings-3-line text-slate-500 w-5 h-5 flex items-center justify-center"></i>
                    <span>設定</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setShowHelpModal(true);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 cursor-pointer"
                  >
                    <i className="ri-question-line text-slate-500 w-5 h-5 flex items-center justify-center"></i>
                    <span>ヘルプ</span>
                  </button>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer"
                    >
                      <i className="ri-logout-box-line text-red-600 w-5 h-5 flex items-center justify-center"></i>
                      <span>ログアウト</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ヘルプモーダル */}
      <AnimatePresence>
        {showHelpModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowHelpModal(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <i className="ri-question-line text-teal-600"></i>
                    ヘルプ
                  </h2>
                  <button
                    onClick={() => setShowHelpModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-xl text-slate-500"></i>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <i className="ri-dashboard-line text-teal-600"></i>
                      ダッシュボードについて
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      このダッシュボードでは、Google Analytics 4 と Google Search Console のデータを統合して、サイトのアクセス状況を分析できます。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <i className="ri-calendar-line text-teal-600"></i>
                      期間の選択
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      画面右上のドロップダウンから、過去7日間、30日間、90日間のデータを切り替えて表示できます。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <i className="ri-refresh-line text-teal-600"></i>
                      データの更新
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      更新ボタン（<i className="ri-refresh-line"></i>）をクリックすると、最新のデータを取得します。Google Analytics のデータは最大24時間遅れる場合があります。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <i className="ri-lightbulb-line text-teal-600"></i>
                      AI分析
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      AIがサイトのデータを分析し、改善提案や業界平均との比較を提供します。業種設定を正しく行うと、より精度の高い分析が得られます。
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <i className="ri-building-line text-teal-600"></i>
                      業種設定
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      設定画面で業種を変更できます。業種を設定することで、業界平均との比較やより適切な改善提案を受けることができます。
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <i className="ri-mail-line text-teal-600"></i>
                      お問い合わせ
                    </h3>
                    <p className="text-sm text-slate-600">
                      ご不明点やご要望がございましたら、お気軽にお問い合わせください。
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
