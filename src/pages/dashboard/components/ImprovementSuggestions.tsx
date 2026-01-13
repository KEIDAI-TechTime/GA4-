import { useAIAnalysis } from '../../../hooks/useAIAnalysis';

interface ImprovementSuggestionsProps {
  dateRange?: string;
}

export default function ImprovementSuggestions({ dateRange = '30days' }: ImprovementSuggestionsProps) {
  const { analysis, loading, error, refetch, isStreaming, streamingText } = useAIAnalysis(dateRange);

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400';
      case 'low':
        return 'bg-blue-500/20 text-blue-400';
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

  // Streaming state - show streaming text
  if (isStreaming) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">AIによる改善提案</h2>
            <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
              AI
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-teal-400">
            <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            <span>AI分析中...</span>
          </div>
        </div>
        <div className="min-h-[200px] p-4 bg-white/5 rounded-xl border border-white/10">
          {streamingText ? (
            <div className="text-slate-300 text-sm font-mono whitespace-pre-wrap overflow-hidden leading-relaxed">
              <span className="opacity-80">{streamingText.slice(-800)}</span>
              <span className="inline-block w-2 h-4 bg-teal-400 animate-pulse ml-1"></span>
            </div>
          ) : (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-xl bg-white/5">
                  <div className="w-11 h-11 bg-white/10 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Loading state (non-streaming fallback)
  if (loading && !isStreaming) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">AIによる改善提案</h2>
          <div className="flex items-center gap-2 text-sm text-teal-400">
            <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
            <span>分析中...</span>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-11 h-11 bg-white/10 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-2/3"></div>
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
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">AIによる改善提案</h2>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-slate-300 text-sm mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition-colors cursor-pointer"
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
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">AIによる改善提案</h2>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🤖</div>
          <p className="text-slate-300 text-sm mb-4">データを分析中です</p>
        </div>
      </div>
    );
  }

  const improvements = analysis.improvements;

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white">AIによる改善提案</h2>
          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
            AI
          </span>
        </div>
        <span className="text-sm text-slate-400">{improvements.length}件の提案</span>
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-sm text-slate-300">{analysis.summary}</p>
        </div>
      )}

      <div className="space-y-3">
        {improvements.map((improvement, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0 text-2xl">
                {improvement.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-white">{improvement.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${getPriorityColor(improvement.priority)}`}>
                    優先度: {getPriorityLabel(improvement.priority)}
                  </span>
                </div>

                <div className="text-sm text-slate-400 mb-2">
                  <span className="font-medium text-slate-300">根拠: </span>
                  {improvement.reason}
                </div>

                <div className="text-sm bg-teal-500/10 text-teal-300 p-2 rounded-lg border border-teal-500/20">
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
          className="text-sm text-teal-400 hover:text-teal-300 font-medium cursor-pointer"
        >
          ↻ 再分析する
        </button>
      </div>
    </div>
  );
}
