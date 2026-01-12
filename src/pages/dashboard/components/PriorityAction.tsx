import { useState } from 'react';
import { useAIAnalysis } from '../../../hooks/useAIAnalysis';

interface PriorityActionProps {
  dateRange?: string;
}

export default function PriorityAction({ dateRange = '30days' }: PriorityActionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { analysis, loading } = useAIAnalysis(dateRange);

  const handleLaterClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-teal-500/20 p-8 text-white border border-teal-400/30">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-xl flex-shrink-0">
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">今やるべきこと</h2>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">分析中...</span>
            </div>
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-2/3 mb-3"></div>
              <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data
  if (!analysis?.priorityAction) {
    return null;
  }

  const priorityAction = analysis.priorityAction;

  return (
    <div className="bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-teal-500/20 p-8 text-white transition-opacity duration-300 border border-teal-400/30">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-xl flex-shrink-0">
          <i className="ri-lightbulb-flash-line text-3xl"></i>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">今やるべきこと</h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">最優先</span>
            <span className="px-2 py-0.5 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs font-bold rounded-full">
              AI
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3">{priorityAction.title}</h3>
          <p className="text-white/90 mb-6 leading-relaxed">{priorityAction.description}</p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <i className="ri-arrow-up-line text-lg"></i>
              <span className="text-sm font-bold">期待効果: {priorityAction.impact}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-time-line text-lg"></i>
              <span className="text-sm font-bold">実装難易度: {priorityAction.effort}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLaterClick}
              className="bg-white/10 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/20"
            >
              後で確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
