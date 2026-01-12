import { useAIAnalysis } from '../../../hooks/useAIAnalysis';

interface ImprovementSuggestionsProps {
  dateRange?: string;
}

export default function ImprovementSuggestions({ dateRange = '30days' }: ImprovementSuggestionsProps) {
  const { analysis, loading, error, refetch } = useAIAnalysis(dateRange);

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getPriorityLabel = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">AIによる改善提案</h2>
          <div className="flex items-center gap-2 text-sm text-teal-600">
            <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <span>分析中...</span>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-xl bg-slate-50">
              <div className="w-11 h-11 bg-slate-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">AIによる改善提案</h2>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-slate-600 text-sm mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition-colors"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  // No analysis yet
  if (!analysis || !analysis.improvements) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">AIによる改善提案</h2>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🤖</div>
          <p className="text-slate-600 text-sm mb-4">データを分析中です</p>
        </div>
      </div>
    );
  }

  const improvements = analysis.improvements;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-800">AIによる改善提案</h2>
          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
            AI
          </span>
        </div>
        <span className="text-sm text-slate-500">{improvements.length}件の提案</span>
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-700">{analysis.summary}</p>
        </div>
      )}

      <div className="space-y-3">
        {improvements.map((improvement, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 flex items-center justify-center bg-white rounded-lg flex-shrink-0 shadow-sm text-2xl">
                {improvement.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-slate-800">{improvement.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${getPriorityColor(improvement.priority)}`}>
                    優先度: {getPriorityLabel(improvement.priority)}
                  </span>
                </div>

                <div className="text-sm text-slate-500 mb-2">
                  <span className="font-medium text-slate-600">根拠: </span>
                  {improvement.reason}
                </div>

                <div className="text-sm bg-teal-50 text-teal-800 p-2 rounded-lg border border-teal-100">
                  <span className="font-medium">やること: </span>
                  {improvement.action}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Refresh button */}
      <div className="mt-4 text-center">
        <button
          onClick={refetch}
          className="text-sm text-teal-600 hover:text-teal-700 font-medium"
        >
          ↻ 再分析する
        </button>
      </div>
    </div>
  );
}
