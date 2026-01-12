import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const industries: Industry[] = [
  { id: 'it', name: 'IT・テクノロジー', icon: 'ri-code-s-slash-line', description: 'ソフトウェア、SaaS、Web制作' },
  { id: 'retail', name: '小売・EC', icon: 'ri-shopping-cart-line', description: 'オンラインショップ、通販サイト' },
  { id: 'restaurant', name: '飲食', icon: 'ri-restaurant-line', description: 'レストラン、カフェ、居酒屋' },
  { id: 'beauty', name: '美容・サロン', icon: 'ri-scissors-line', description: 'ヘアサロン、エステ、ネイル' },
  { id: 'medical', name: '医療・ヘルスケア', icon: 'ri-hospital-line', description: '病院、クリニック、薬局' },
  { id: 'education', name: '教育', icon: 'ri-book-open-line', description: '学校、塾、オンライン講座' },
  { id: 'realestate', name: '不動産', icon: 'ri-home-line', description: '不動産売買、賃貸、管理' },
  { id: 'finance', name: '金融・保険', icon: 'ri-bank-line', description: '銀行、証券、保険' },
  { id: 'manufacturing', name: '製造業', icon: 'ri-settings-3-line', description: 'メーカー、工場' },
  { id: 'travel', name: '旅行・宿泊', icon: 'ri-plane-line', description: '旅行代理店、ホテル、観光' },
  { id: 'media', name: 'メディア・ブログ', icon: 'ri-article-line', description: '情報サイト、ブログ、ニュース' },
  { id: 'professional', name: '士業・コンサル', icon: 'ri-briefcase-line', description: '弁護士、税理士、コンサル' },
  { id: 'other', name: 'その他', icon: 'ri-more-line', description: '上記以外の業種' },
];

export function getIndustryName(id: string): string {
  const industry = industries.find(i => i.id === id);
  return industry?.name || 'その他';
}

export default function IndustrySelection() {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [customIndustry, setCustomIndustry] = useState<string>('');

  const handleComplete = () => {
    if (selectedIndustry) {
      // 業種名をlocalStorageに保存（AI分析で使用）
      if (selectedIndustry === 'other' && customIndustry.trim()) {
        localStorage.setItem('selected_industry', customIndustry.trim());
      } else {
        const industry = industries.find(i => i.id === selectedIndustry);
        localStorage.setItem('selected_industry', industry?.name || 'その他');
      }
      navigate('/dashboard');
    }
  };

  const isCompleteDisabled = !selectedIndustry || (selectedIndustry === 'other' && !customIndustry.trim());

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.main 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2">業種を選択</h1>
          <p className="text-slate-600">あなたのビジネスに最も近い業種を選択してください</p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {industries.map((industry, index) => (
              <motion.button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedIndustry === industry.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 ${
                    selectedIndustry === industry.id
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <i className={`${industry.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-900 text-base">{industry.name}</p>
                      {selectedIndustry === industry.id && (
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-teal-500 flex-shrink-0">
                          <i className="ri-check-line text-xs text-white"></i>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{industry.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* その他選択時の自由入力欄 */}
          {selectedIndustry === 'other' && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}

          <motion.button
            onClick={handleComplete}
            disabled={isCompleteDisabled}
            className="w-full mt-6 bg-teal-600 text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: !isCompleteDisabled ? 1.02 : 1 }}
            whileTap={{ scale: !isCompleteDisabled ? 0.98 : 1 }}
          >
            完了
          </motion.button>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
