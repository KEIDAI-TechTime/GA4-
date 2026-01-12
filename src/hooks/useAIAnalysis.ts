import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelectedProperty, useBasicMetrics, useTopPages, useTrafficSources, useDeviceBreakdown } from './useGA4';

interface Improvement {
  title: string;
  reason: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

interface MetricComparison {
  value: number;
  industryAvg: number;
  status: 'good' | 'average' | 'needsWork';
}

interface IndustryComparison {
  bounceRate: MetricComparison;
  avgSessionDuration: MetricComparison;
  pagesPerSession: MetricComparison;
}

interface PriorityAction {
  title: string;
  description: string;
  impact: '高' | '中' | '低';
  effort: '高' | '中' | '低';
}

interface ChangeAlert {
  type: 'increase' | 'decrease';
  metric: string;
  message: string;
}

interface SiteOverview {
  siteType: string;
  description: string;
  targetAudience: string;
  contentFocus: string;
  trafficCharacteristics: string;
}

interface AIAnalysis {
  siteOverview: SiteOverview;
  improvements: Improvement[];
  industryComparison: IndustryComparison;
  priorityAction: PriorityAction;
  changeAlerts: ChangeAlert[];
  summary: string;
}

export function useAIAnalysis(dateRange: string = '30days') {
  const { propertyId } = useSelectedProperty();
  const { data: basicMetrics, loading: metricsLoading } = useBasicMetrics(propertyId, dateRange);
  const { data: topPages, loading: pagesLoading } = useTopPages(propertyId, dateRange);
  const { data: trafficSources, loading: sourcesLoading } = useTrafficSources(propertyId, dateRange);
  const { data: deviceBreakdown, loading: devicesLoading } = useDeviceBreakdown(propertyId, dateRange);

  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingText, setStreamingText] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const dataLoading = metricsLoading || pagesLoading || sourcesLoading || devicesLoading;

  const fetchAnalysis = useCallback(async () => {
    if (!basicMetrics || !topPages || !trafficSources || !deviceBreakdown) {
      return;
    }

    // Cancel previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    // Get industry from localStorage
    const industry = localStorage.getItem('selected_industry') || '小売';

    setLoading(true);
    setError(null);
    setStreamingText('');
    setIsStreaming(true);
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({
          pageViews: basicMetrics.pageViews,
          users: basicMetrics.users,
          sessions: basicMetrics.sessions,
          bounceRate: basicMetrics.bounceRate,
          avgSessionDuration: basicMetrics.avgSessionDuration,
          topPages: topPages.slice(0, 10).map(p => ({
            pagePath: p.pagePath,
            pageTitle: p.pageTitle,
            pageViews: p.pageViews,
          })),
          trafficSources: trafficSources.slice(0, 10).map(s => ({
            source: s.source,
            sessions: s.sessions,
          })),
          deviceBreakdown: deviceBreakdown.map(d => ({
            device: d.device,
            percentage: d.percentage,
          })),
          industry,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI analysis');
      }

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('text/event-stream')) {
        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                setIsStreaming(false);
                continue;
              }

              try {
                const parsed = JSON.parse(data);

                if (parsed.type === 'chunk') {
                  setStreamingText(prev => prev + parsed.text);
                } else if (parsed.type === 'complete') {
                  setAnalysis(parsed.analysis);
                  setIsStreaming(false);
                } else if (parsed.type === 'error' || parsed.error) {
                  throw new Error(parsed.error || 'AI分析に失敗しました');
                }
              } catch (e) {
                if (e instanceof SyntaxError) {
                  // Ignore JSON parse errors for incomplete data
                } else {
                  throw e;
                }
              }
            }
          }
        }
      } else {
        // Handle non-streaming response (fallback)
        const data = await response.json();
        setAnalysis(data);
        setIsStreaming(false);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was cancelled, ignore
        return;
      }
      console.error('AI analysis error:', err);
      setError(err instanceof Error ? err.message : 'AI分析に失敗しました');
      setIsStreaming(false);
    } finally {
      setLoading(false);
    }
  }, [basicMetrics, topPages, trafficSources, deviceBreakdown]);

  // Auto-fetch when data is ready
  useEffect(() => {
    if (!dataLoading && basicMetrics && !analysis && !loading && !isStreaming) {
      fetchAnalysis();
    }
  }, [dataLoading, basicMetrics, analysis, loading, isStreaming, fetchAnalysis]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    analysis,
    loading: loading || dataLoading,
    error,
    streamingText,
    isStreaming,
    refetch: fetchAnalysis,
  };
}
