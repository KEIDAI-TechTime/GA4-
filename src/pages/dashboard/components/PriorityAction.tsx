import { useState } from 'react';
import ImprovementModal from './ImprovementModal';

export default function PriorityAction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const priorityAction = {
    title: '商品一覧ページの離脱率改善',
    description: '商品一覧ページは月間12,450PVと高アクセスですが、離脱率が68%と高い状態です。CTAボタンを目立たせることで、CV率を1.5〜2.0%改善できる可能性があります。',
    impact: '高',
    effort: '低',
    details: {
      currentStatus: {
        pageViews: 12450,
        bounceRate: 68,
        avgTimeOnPage: '1分15秒',
        conversionRate: 1.2
      },
      suggestions: [
        {
          title: 'CTAボタンの色とサイズを変更',
          description: '現在のボタンが背景に埋もれているため、コントラストの高い色（例：オレンジ、赤）に変更し、サイズを1.5倍に拡大',
          priority: '高',
          expectedImpact: 'CV率 +1.2%'
        },
        {
          title: 'ボタンの配置を最適化',
          description: '商品画像の直下にCTAボタンを配置し、スクロールせずに見える位置に',
          priority: '高',
          expectedImpact: 'クリック率 +35%'
        },
        {
          title: '緊急性を示すテキストを追加',
          description: '「残りわずか」「期間限定」などの文言で行動を促進',
          priority: '中',
          expectedImpact: 'CV率 +0.8%'
        },
        {
          title: 'ホバーエフェクトの追加',
          description: 'マウスオーバー時のアニメーションでクリック可能性を明示',
          priority: '低',
          expectedImpact: 'クリック率 +15%'
        }
      ],
      benchmarkComparison: {
        industry: 'EC・小売',
        yourBounceRate: 68,
        industryAverage: 52,
        topPerformers: 38
      }
    }
  };

  const handleLaterClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg p-8 text-white transition-opacity duration-300">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-xl flex-shrink-0">
            <i className="ri-lightbulb-flash-line text-3xl"></i>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">今やるべきこと</h2>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">最優先</span>
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
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-teal-600 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/90 transition-colors whitespace-nowrap cursor-pointer"
              >
                改善方法を見る
              </button>
              <button 
                onClick={handleLaterClick}
                className="bg-white/10 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer"
              >
                後で確認
              </button>
            </div>
          </div>
        </div>
      </div>

      <ImprovementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action={priorityAction}
      />
    </>
  );
}
