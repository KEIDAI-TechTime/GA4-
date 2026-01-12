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
        <div className="h-4 w-full bg-white/20 rounded animate-pulse mb-4"></div>
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-white/20 rounded-full animate-pulse"></div>
          <div className="h-8 w-28 bg-white/20 rounded-full animate-pulse"></div>
          <div className="h-8 w-20 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  // No data
  if (!analysis?.siteOverview) {
    return null;
  }

  const { description, highlights } = analysis.siteOverview;
  const industry = localStorage.getItem('selected_industry') || '未設定';

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <i className="ri-global-line text-xl"></i>
        </div>
        <div>
          <h2 className="font-bold text-lg">サイト概要</h2>
          <span className="text-xs text-white/60">{industry}</span>
        </div>
      </div>

      <p className="text-white/90 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {highlights && highlights.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-medium border border-white/20"
            >
              {highlight}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
