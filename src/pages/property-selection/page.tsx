import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Property {
  id: string;
  name: string;
  url: string;
  type: 'GA4' | 'Search Console';
}

export default function PropertySelection() {
  const navigate = useNavigate();
  const [selectedGA4, setSelectedGA4] = useState<string>('');

  // モックデータ（実際はGoogle APIから取得）
  const ga4Properties: Property[] = [
    { id: 'ga4-1', name: 'マイサイト - GA4', url: 'https://mysite.com', type: 'GA4' },
    { id: 'ga4-2', name: 'ECショップ - GA4', url: 'https://shop.example.com', type: 'GA4' },
    { id: 'ga4-3', name: 'コーポレートサイト - GA4', url: 'https://corporate.example.com', type: 'GA4' },
  ];

  const handleContinue = () => {
    if (selectedGA4) {
      navigate('/industry-selection');
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">プロパティを選択</h1>
          <p className="text-slate-600">分析したいGA4プロパティを選択してください</p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-3">
            {ga4Properties.map((property, index) => (
              <motion.button
                key={property.id}
                onClick={() => setSelectedGA4(property.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${
                  selectedGA4 === property.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2 flex-shrink-0 mt-0.5 ${
                    selectedGA4 === property.id
                      ? 'border-teal-500 bg-teal-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedGA4 === property.id && (
                      <i className="ri-check-line text-xs text-white"></i>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm mb-1">{property.name}</p>
                    <p className="text-xs text-gray-500 truncate">{property.url}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={handleContinue}
            disabled={!selectedGA4}
            className="w-full mt-6 bg-teal-600 text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: selectedGA4 ? 1.02 : 1 }}
            whileTap={{ scale: selectedGA4 ? 0.98 : 1 }}
          >
            次へ
          </motion.button>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
