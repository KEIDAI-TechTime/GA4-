import { useState, useEffect, useCallback } from 'react';
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

  const dataLoading = metricsLoading || pagesLoading || sourcesLoading || devicesLoading;

  const fetchAnalysis = useCallback(async () => {
    if (!basicMetrics || !topPages || !trafficSources || !deviceBreakdown) {
      return;
    }

    // Get industry from localStorage
    const industry = localStorage.getItem('selected_industry') || '小売';

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI analysis');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error('AI analysis error:', err);
      setError(err instanceof Error ? err.message : 'AI分析に失敗しました');
    } finally {
      setLoading(false);
    }
  }, [basicMetrics, topPages, trafficSources, deviceBreakdown]);

  // Auto-fetch when data is ready
  useEffect(() => {
    if (!dataLoading && basicMetrics && !analysis && !loading) {
      fetchAnalysis();
    }
  }, [dataLoading, basicMetrics, analysis, loading, fetchAnalysis]);

  return {
    analysis,
    loading: loading || dataLoading,
    error,
    refetch: fetchAnalysis,
  };
}
