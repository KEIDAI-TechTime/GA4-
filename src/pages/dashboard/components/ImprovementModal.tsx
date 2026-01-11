import { motion, AnimatePresence } from 'framer-motion';

interface ImprovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: {
    title: string;
    description: string;
    impact: string;
    effort: string;
    details: {
      currentStatus: {
        pageViews: number;
        bounceRate: number;
        avgTimeOnPage: string;
        conversionRate: number;
      };
      suggestions: Array<{
        title: string;
        description: string;
        priority: string;
        expectedImpact: string;
      }>;
      benchmarkComparison: {
        industry: string;
        yourBounceRate: number;
        industryAverage: number;
        topPerformers: number;
      };
    };
  };
}

export default function ImprovementModal({ isOpen, onClose, action }: ImprovementModalProps) {
  if (!action) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高':
        return 'bg-red-100 text-red-700';
      case '中':
        return 'bg-yellow-100 text-yellow-700';
      case '低':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-6 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-white text-2xl font-bold mb-2">{action.title}</h2>
                    <p className="text-white/90 text-sm">{action.description}</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-white text-xl"></i>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Current Status */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-bar-chart-box-line text-teal-600"></i>
                    現在の状況
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">ページビュー</p>
                      <p className="text-2xl font-bold text-gray-900">{action.details.currentStatus.pageViews.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">離脱率</p>
                      <p className="text-2xl font-bold text-red-600">{action.details.currentStatus.bounceRate}%</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">平均滞在時間</p>
                      <p className="text-2xl font-bold text-gray-900">{action.details.currentStatus.avgTimeOnPage}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-gray-600 mb-1">CV率</p>
                      <p className="text-2xl font-bold text-gray-900">{action.details.currentStatus.conversionRate}%</p>
                    </div>
                  </div>
                </div>

                {/* Benchmark Comparison */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-line-chart-line text-teal-600"></i>
                    業界比較
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-4">業種: {action.details.benchmarkComparison.industry}</p>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">あなたのサイト</span>
                          <span className="text-sm font-bold text-red-600">{action.details.benchmarkComparison.yourBounceRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-red-500 h-3 rounded-full"
                            style={{ width: `${action.details.benchmarkComparison.yourBounceRate}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">業界平均</span>
                          <span className="text-sm font-bold text-gray-600">{action.details.benchmarkComparison.industryAverage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gray-400 h-3 rounded-full"
                            style={{ width: `${action.details.benchmarkComparison.industryAverage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">上位サイト</span>
                          <span className="text-sm font-bold text-green-600">{action.details.benchmarkComparison.topPerformers}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-green-500 h-3 rounded-full"
                            style={{ width: `${action.details.benchmarkComparison.topPerformers}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Improvement Suggestions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-lightbulb-line text-teal-600"></i>
                    具体的な改善施策
                  </h3>
                  <div className="space-y-4">
                    {action.details.suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-white border-2 border-slate-100 rounded-lg p-6 hover:border-teal-200 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                              <span className="text-teal-600 font-bold text-sm">{index + 1}</span>
                            </div>
                            <h4 className="text-base font-bold text-gray-900">{suggestion.title}</h4>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getPriorityColor(suggestion.priority)}`}>
                            優先度: {suggestion.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 ml-11">{suggestion.description}</p>
                        <div className="flex items-center gap-2 ml-11">
                          <i className="ri-arrow-right-up-line text-green-600"></i>
                          <span className="text-sm font-bold text-green-600">{suggestion.expectedImpact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-slate-100">
                  <button 
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg font-bold text-sm text-gray-600 hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    閉じる
                  </button>
                  <button className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                    改善を開始する
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
