import { useState } from 'react';
import { useAIAnalysis } from '../../../hooks/useAIAnalysis';

interface NotificationAlertProps {
  dateRange?: string;
}

export default function NotificationAlert({ dateRange = '30days' }: NotificationAlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { analysis, loading } = useAIAnalysis(dateRange);

  if (!isVisible) return null;
  if (loading) return null;
  if (!analysis?.changeAlerts || analysis.changeAlerts.length === 0) return null;

  const alerts = analysis.changeAlerts;

  return (
    <div className="bg-amber-500/10 backdrop-blur-xl border border-amber-500/30 rounded-xl p-4 flex items-start space-x-3">
      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
        <i className="ri-notification-3-line text-xl text-amber-400"></i>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-bold text-amber-300">変化を検出しました</h3>
          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
            AI
          </span>
        </div>
        <p className="text-sm text-amber-200/80">
          {alerts.map((alert, index) => (
            <span key={index}>
              {index > 0 && '。また、'}
              {alert.metric}が
              <span className={`font-bold ${alert.type === 'increase' ? 'text-emerald-400' : 'text-red-400'}`}>
                {alert.message}
              </span>
            </span>
          ))}
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="w-8 h-8 flex items-center justify-center hover:bg-amber-500/20 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
      >
        <i className="ri-close-line text-amber-400"></i>
      </button>
    </div>
  );
}
