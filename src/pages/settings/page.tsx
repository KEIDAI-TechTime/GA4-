import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const industries = [
  { id: 'it', name: 'IT・テクノロジー', icon: 'ri-code-s-slash-line' },
  { id: 'retail', name: '小売・EC', icon: 'ri-shopping-cart-line' },
  { id: 'restaurant', name: '飲食', icon: 'ri-restaurant-line' },
  { id: 'beauty', name: '美容・サロン', icon: 'ri-scissors-line' },
  { id: 'medical', name: '医療・ヘルスケア', icon: 'ri-hospital-line' },
  { id: 'education', name: '教育', icon: 'ri-book-open-line' },
  { id: 'realestate', name: '不動産', icon: 'ri-home-line' },
  { id: 'finance', name: '金融・保険', icon: 'ri-bank-line' },
  { id: 'manufacturing', name: '製造業', icon: 'ri-settings-3-line' },
  { id: 'travel', name: '旅行・宿泊', icon: 'ri-plane-line' },
  { id: 'media', name: 'メディア・ブログ', icon: 'ri-article-line' },
  { id: 'professional', name: '士業・コンサル', icon: 'ri-briefcase-line' },
  { id: 'other', name: 'その他', icon: 'ri-more-line' },
];

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // 実データを取得
  const propertyId = localStorage.getItem('selected_property') || '未設定';
  const siteUrl = localStorage.getItem('search_console_site') || '未連携';

  // 保存されている業種を取得し、既定リストにあるか確認
  const savedIndustry = localStorage.getItem('selected_industry') || 'IT・テクノロジー';
  const isCustomIndustry = !industries.some(i => i.name === savedIndustry);

  const [selectedIndustry, setSelectedIndustry] = useState(() => {
    return isCustomIndustry ? 'その他' : savedIndustry;
  });
  const [customIndustry, setCustomIndustry] = useState(() => {
    return isCustomIndustry ? savedIndustry : '';
  });

  const handleSave = () => {
    if (selectedIndustry === 'その他' && customIndustry.trim()) {
      localStorage.setItem('selected_industry', customIndustry.trim());
    } else {
      localStorage.setItem('selected_industry', selectedIndustry);
    }
    setShowSaveNotification(true);
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleDisconnect = async () => {
    // 連携解除: すべてのローカルデータをクリアしてログアウト
    localStorage.removeItem('selected_property');
    localStorage.removeItem('selected_industry');
    localStorage.removeItem('search_console_site');
    try {
      await logout();
    } catch (e) {
      console.error('Logout error:', e);
    }
    navigate('/login');
  };

  // ユーザー情報
  const userEmail = user?.email || 'ゲスト';
  const userInitial = userEmail.charAt(0).toUpperCase();
  const createdAt = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
    : '不明';

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-slate-700 text-xl"></i>
              </button>
              <h1 className="text-2xl font-bold text-slate-800">設定</h1>
            </div>
          </div>
        </div>
      </header>

      <motion.main 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* 連携情報 */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <i className="ri-link text-teal-600"></i>
            連携情報
          </h2>

          <div className="space-y-4">
            {/* Google Analytics */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <i className="ri-google-fill text-2xl text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Google Analytics 4</h3>
                  <p className="text-sm text-slate-600 font-mono">{propertyId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${propertyId !== '未設定' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {propertyId !== '未設定' ? '連携中' : '未連携'}
                </span>
              </div>
            </div>

            {/* Search Console */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <i className="ri-search-line text-2xl text-teal-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Google Search Console</h3>
                  <p className="text-sm text-slate-600">{siteUrl}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${siteUrl !== '未連携' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {siteUrl !== '未連携' ? '連携中' : '未連携'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowDisconnectModal(true)}
            className="mt-6 w-full py-3 bg-red-50 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors whitespace-nowrap cursor-pointer"
          >
            連携を解除する
          </button>
        </motion.div>

        {/* 業種設定 */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
            <i className="ri-building-4-line text-teal-600"></i>
            業種設定
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            業種を選択すると、業界平均との比較データが表示されます
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.name)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedIndustry === industry.name
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                    selectedIndustry === industry.name ? 'bg-teal-100' : 'bg-slate-100'
                  }`}>
                    <i className={`${industry.icon} text-2xl ${
                      selectedIndustry === industry.name ? 'text-teal-600' : 'text-slate-600'
                    }`}></i>
                  </div>
                  <span className={`text-sm font-bold ${
                    selectedIndustry === industry.name ? 'text-teal-700' : 'text-slate-700'
                  }`}>
                    {industry.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* その他選択時の自由入力欄 */}
          {selectedIndustry === 'その他' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                業種・サイトの種類を入力してください
              </label>
              <input
                type="text"
                value={customIndustry}
                onChange={(e) => setCustomIndustry(e.target.value)}
                placeholder="例: 人材紹介、ペットショップ、スポーツジム"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>
          )}
        </motion.div>

        {/* アカウント情報 */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <i className="ri-user-line text-teal-600"></i>
            アカウント情報
          </h2>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full text-white font-bold text-xl">
              {userInitial}
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{userEmail}</h3>
              <p className="text-sm text-slate-600">登録日: {createdAt}</p>
            </div>
          </div>
        </motion.div>

        {/* 保存ボタン */}
        <motion.div 
          className="flex items-center justify-end gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg font-bold text-sm text-slate-600 hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            キャンセル
          </motion.button>
          <motion.button
            onClick={handleSave}
            className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            変更を保存
          </motion.button>
        </motion.div>
      </motion.main>

      {/* 連携解除確認モーダル */}
      <AnimatePresence>
        {showDisconnectModal && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowDisconnectModal(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4">
                  <i className="ri-alert-line text-3xl text-red-600"></i>
                </div>
                
                <h2 className="text-xl font-bold text-slate-800 text-center mb-2">
                  連携を解除しますか？
                </h2>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Google Analytics と Search Console の連携を解除すると、ダッシュボードのデータが表示されなくなります。
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDisconnectModal(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="flex-1 py-3 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    解除する
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* 保存完了通知 */}
      <AnimatePresence>
        {showSaveNotification && (
          <motion.div 
            className="fixed bottom-8 right-8 bg-teal-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <i className="ri-check-line text-2xl"></i>
            <span className="font-bold">変更を保存しました</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
