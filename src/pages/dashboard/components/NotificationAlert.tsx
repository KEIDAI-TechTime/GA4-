import { useState } from 'react';

export default function NotificationAlert() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 shadow-sm">
      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <i className="ri-notification-3-line text-xl text-amber-600"></i>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-amber-900 mb-1">変化を検出しました</h3>
        <p className="text-sm text-amber-800">先週比でページビューが<span className="font-bold text-red-600">30%減少</span>しています。また、「商品 口コミ」からの検索流入が<span className="font-bold text-green-600">2倍に増加</span>しています。</p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="w-8 h-8 flex items-center justify-center hover:bg-amber-100 rounded-lg transition-colors flex-shrink-0"
      >
        <i className="ri-close-line text-amber-600"></i>
      </button>
    </div>
  );
}
