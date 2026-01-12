import { useAIAnalysis } from '../../../hooks/useAIAnalysis';

interface SiteOverviewProps {
  dateRange?: string;
}

export default function SiteOverview({ dateRange = '30days' }: SiteOverviewProps) {
  const { analysis, loading } = useAIAnalysis(dateRange);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg animate-pulse"></div>
          <div className="h-6 w-48 bg-white/20 rounded animate-pulse"></div>
        </div>
        <div className="h-4 w-full bg-white/20 rounded animate-pulse mb-3"></div>
        <div className="h-4 w-3/4 bg-white/20 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="h-16 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-16 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-16 bg-white/10 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  // No data
  if (!analysis?.siteOverview) {
    return null;
  }

  const { siteType, description, targetAudience, contentFocus, trafficCharacteristics } = analysis.siteOverview;
  const industry = localStorage.getItem('selected_industry') || '未設定';

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <i className="ri-global-line text-xl"></i>
          </div>
          <div>
            <h2 className="font-bold text-lg">サイト概要</h2>
            <span className="text-xs text-white/60">{industry}</span>
          </div>
        </div>
        {siteType && (
          <span className="px-3 py-1 bg-teal-500/30 rounded-full text-xs font-medium border border-teal-400/30">
            {siteType}
          </span>
        )}
      </div>

      <p className="text-white/90 text-sm leading-relaxed mb-5">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {targetAudience && (
          <div className="bg-white/10 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-user-line text-teal-400 text-sm"></i>
              <span className="text-xs text-white/60">ターゲット</span>
            </div>
            <p className="text-sm font-medium">{targetAudience}</p>
          </div>
        )}

        {contentFocus && (
          <div className="bg-white/10 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-file-text-line text-teal-400 text-sm"></i>
              <span className="text-xs text-white/60">主なコンテンツ</span>
            </div>
            <p className="text-sm font-medium">{contentFocus}</p>
          </div>
        )}

        {trafficCharacteristics && (
          <div className="bg-white/10 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <i className="ri-line-chart-line text-teal-400 text-sm"></i>
              <span className="text-xs text-white/60">流入の特徴</span>
            </div>
            <p className="text-sm font-medium">{trafficCharacteristics}</p>
          </div>
        )}
      </div>
    </div>
  );
}
