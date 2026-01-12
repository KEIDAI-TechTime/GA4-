// Google Analytics Data API v1
// https://developers.google.com/analytics/devguides/reporting/data/v1

const GA4_API_BASE = 'https://analyticsdata.googleapis.com/v1beta';

export interface GA4Property {
  name: string;
  propertyId: string;
  displayName: string;
  websiteUrl?: string;
}

export interface GA4ReportRequest {
  propertyId: string;
  startDate: string;
  endDate: string;
  metrics: string[];
  dimensions?: string[];
}

export interface GA4MetricValue {
  value: string;
}

export interface GA4DimensionValue {
  value: string;
}

export interface GA4Row {
  dimensionValues?: GA4DimensionValue[];
  metricValues: GA4MetricValue[];
}

export interface GA4ReportResponse {
  rows?: GA4Row[];
  totals?: GA4Row[];
  rowCount?: number;
}

// Get access token from localStorage (saved during OAuth)
function getAccessToken(): string | null {
  return localStorage.getItem('google_access_token');
}

// List all GA4 properties the user has access to
export async function listGA4Properties(): Promise<GA4Property[]> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await fetch(
    'https://analyticsadmin.googleapis.com/v1beta/accountSummaries',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to list properties: ${response.statusText}`);
  }

  const data = await response.json();
  const properties: GA4Property[] = [];

  for (const account of data.accountSummaries || []) {
    for (const property of account.propertySummaries || []) {
      properties.push({
        name: property.property,
        propertyId: property.property.split('/')[1],
        displayName: property.displayName,
      });
    }
  }

  return properties;
}

// Run a GA4 report
export async function runGA4Report(request: GA4ReportRequest): Promise<GA4ReportResponse> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await fetch(
    `${GA4_API_BASE}/properties/${request.propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [
          {
            startDate: request.startDate,
            endDate: request.endDate,
          },
        ],
        metrics: request.metrics.map((name) => ({ name })),
        dimensions: request.dimensions?.map((name) => ({ name })) || [],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `Failed to run report: ${response.statusText}`);
  }

  return response.json();
}

// Helper: Get basic metrics (PV, Users, Sessions, etc.)
export async function getBasicMetrics(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<{
  pageViews: number;
  users: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
}> {
  const report = await runGA4Report({
    propertyId,
    startDate,
    endDate,
    metrics: [
      'screenPageViews',
      'totalUsers',
      'sessions',
      'bounceRate',
      'averageSessionDuration',
    ],
  });

  const values = report.rows?.[0]?.metricValues || [];

  return {
    pageViews: parseInt(values[0]?.value || '0', 10),
    users: parseInt(values[1]?.value || '0', 10),
    sessions: parseInt(values[2]?.value || '0', 10),
    bounceRate: parseFloat(values[3]?.value || '0'),
    avgSessionDuration: parseFloat(values[4]?.value || '0'),
  };
}

// Helper: Get page views by date (for charts)
export async function getPageViewsByDate(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<{ date: string; pageViews: number; users: number }[]> {
  const report = await runGA4Report({
    propertyId,
    startDate,
    endDate,
    metrics: ['screenPageViews', 'totalUsers'],
    dimensions: ['date'],
  });

  return (report.rows || []).map((row) => ({
    date: row.dimensionValues?.[0]?.value || '',
    pageViews: parseInt(row.metricValues[0]?.value || '0', 10),
    users: parseInt(row.metricValues[1]?.value || '0', 10),
  }));
}

// タイトルが日本語/英語かどうかを判定（韓国語は除外）
function isValidJapaneseOrEnglishTitle(title: string): boolean {
  if (!title || title.trim() === '') return false;

  // ハングル文字の範囲をチェック（韓国語）
  const hasKorean = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(title);
  if (hasKorean) return false;

  // 日本語（ひらがな、カタカナ）があれば有効
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF]/.test(title);
  if (hasJapanese) return true;

  // 英字があれば有効
  const hasEnglish = /[a-zA-Z]/.test(title);
  if (hasEnglish) return true;

  // 漢字があれば有効（日本語サイトでは一般的）
  const hasKanji = /[\u4E00-\u9FFF]/.test(title);
  if (hasKanji) return true;

  return false;
}

// Helper: Get top pages
export async function getTopPages(
  propertyId: string,
  startDate: string,
  endDate: string,
  limit: number = 10
): Promise<{ pagePath: string; pageTitle: string; pageViews: number; avgTime: number }[]> {
  const report = await runGA4Report({
    propertyId,
    startDate,
    endDate,
    metrics: ['screenPageViews', 'averageSessionDuration'],
    dimensions: ['pagePath', 'pageTitle'],
  });

  // パスごとにPVを集計（同じパスで異なるタイトルがある場合があるため）
  const pageMap = new Map<string, { pageTitle: string; pageViews: number; avgTime: number }>();

  for (const row of report.rows || []) {
    const pagePath = row.dimensionValues?.[0]?.value || '';
    const pageTitle = row.dimensionValues?.[1]?.value || '';
    const pageViews = parseInt(row.metricValues[0]?.value || '0', 10);
    const avgTime = parseFloat(row.metricValues[1]?.value || '0');

    const existing = pageMap.get(pagePath);
    if (existing) {
      existing.pageViews += pageViews;
      // 日本語/英語のタイトルを優先
      const existingIsValid = isValidJapaneseOrEnglishTitle(existing.pageTitle);
      const newIsValid = isValidJapaneseOrEnglishTitle(pageTitle);

      if (newIsValid && !existingIsValid) {
        // 新しいタイトルが有効で、既存が無効なら置き換え
        existing.pageTitle = pageTitle;
      } else if (newIsValid && existingIsValid && pageTitle.length > existing.pageTitle.length) {
        // 両方有効なら、より長いタイトルを優先
        existing.pageTitle = pageTitle;
      }
    } else {
      pageMap.set(pagePath, { pageTitle, pageViews, avgTime });
    }
  }

  return Array.from(pageMap.entries())
    .map(([pagePath, data]) => ({
      pagePath,
      pageTitle: data.pageTitle,
      pageViews: data.pageViews,
      avgTime: data.avgTime,
    }))
    .sort((a, b) => b.pageViews - a.pageViews)
    .slice(0, limit);
}

// Helper: Get traffic sources
export async function getTrafficSources(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<{ source: string; sessions: number; users: number }[]> {
  const report = await runGA4Report({
    propertyId,
    startDate,
    endDate,
    metrics: ['sessions', 'totalUsers'],
    dimensions: ['sessionSource'],
  });

  return (report.rows || [])
    .map((row) => ({
      source: row.dimensionValues?.[0]?.value || '(direct)',
      sessions: parseInt(row.metricValues[0]?.value || '0', 10),
      users: parseInt(row.metricValues[1]?.value || '0', 10),
    }))
    .sort((a, b) => b.sessions - a.sessions);
}

// Helper: Get device breakdown
export async function getDeviceBreakdown(
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<{ device: string; sessions: number; percentage: number }[]> {
  const report = await runGA4Report({
    propertyId,
    startDate,
    endDate,
    metrics: ['sessions'],
    dimensions: ['deviceCategory'],
  });

  const total = (report.rows || []).reduce(
    (sum, row) => sum + parseInt(row.metricValues[0]?.value || '0', 10),
    0
  );

  return (report.rows || []).map((row) => {
    const sessions = parseInt(row.metricValues[0]?.value || '0', 10);
    return {
      device: row.dimensionValues?.[0]?.value || 'unknown',
      sessions,
      percentage: total > 0 ? (sessions / total) * 100 : 0,
    };
  });
}
