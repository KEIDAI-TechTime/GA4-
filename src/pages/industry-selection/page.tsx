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
  { id: 'retail', name: '小売・EC', icon: 'ri-shopping-cart-line', description: 'オンラインショップ、通販サイト' },
  { id: 'restaurant', name: '飲食店', icon: 'ri-restaurant-line', description: 'レストラン、カフェ、居酒屋' },
  { id: 'beauty', name: '美容・サロン', icon: 'ri-scissors-line', description: 'ヘアサロン、エステ、ネイル' },
  { id: 'medical', name: '医療・クリニック', icon: 'ri-hospital-line', description: '病院、クリニック、歯科医院' },
  { id: 'education', name: '教育・スクール', icon: 'ri-book-open-line', description: '学習塾、語学教室、習い事' },
  { id: 'realestate', name: '不動産', icon: 'ri-home-line', description: '不動産売買、賃貸、管理' },
  { id: 'corporate', name: '企業サイト', icon: 'ri-building-line', description: 'コーポレートサイト、採用サイト' },
  { id: 'media', name: 'メディア・ブログ', icon: 'ri-article-line', description: '情報サイト、ブログ、ニュース' },
  { id: 'service', name: 'サービス業', icon: 'ri-customer-service-line', description: '各種サービス業全般' },
  { id: 'other', name: 'その他', icon: 'ri-more-line', description: '上記以外の業種' },
];

export function getIndustryName(id: string): string {
  const industry = industries.find(i => i.id === id);
  return industry?.name || 'その他';
}

export default function IndustrySelection() {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  const handleComplete = () => {
    if (selectedIndustry) {
      // 業種情報をlocalStorageに保存
      localStorage.setItem('selected_industry', selectedIndustry);
      navigate('/dashboard');
    }
  };

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

          <motion.button
            onClick={handleComplete}
            disabled={!selectedIndustry}
            className="w-full mt-6 bg-teal-600 text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: selectedIndustry ? 1.02 : 1 }}
            whileTap={{ scale: selectedIndustry ? 0.98 : 1 }}
          >
            完了
          </motion.button>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
