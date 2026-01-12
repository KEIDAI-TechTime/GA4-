import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getIndustryName } from '../../industry-selection/page';

interface HeaderProps {
  dateRange: string;
  setDateRange: (range: string) => void;
}

export default function Header({ dateRange, setDateRange }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [industryName, setIndustryName] = useState<string>('');

  useEffect(() => {
    const industryId = localStorage.getItem('selected_industry');
    if (industryId) {
      setIndustryName(getIndustryName(industryId));
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
              <p className="text-xs text-slate-500">最終更新: 2分前</p>
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
            <button className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
              <i className="ri-refresh-line text-lg text-slate-600"></i>
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
                  <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 cursor-pointer">
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
    </header>
  );
}
