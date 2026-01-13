// Google Search Console API
// https://developers.google.com/webmaster-tools/v1/api_reference_index

const SEARCH_CONSOLE_API_BASE = 'https://www.googleapis.com/webmasters/v3';

export interface SearchConsoleSite {
  siteUrl: string;
  permissionLevel: string;
}

export interface SearchQueryRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchQueryResponse {
  rows?: SearchQueryRow[];
  responseAggregationType?: string;
}

// Get access token from localStorage (saved during OAuth)
function getAccessToken(): string | null {
  return localStorage.getItem('google_access_token');
}

// List all sites the user has access to in Search Console
export async function listSearchConsoleSites(): Promise<SearchConsoleSite[]> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await fetch(`${SEARCH_CONSOLE_API_BASE}/sites`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `Failed to list sites: ${response.statusText}`);
  }

  const data = await response.json();
  return data.siteEntry || [];
}

// Get search analytics data (keywords, clicks, impressions, CTR, position)
export async function getSearchAnalytics(
  siteUrl: string,
  startDate: string,
  endDate: string,
  dimensions: string[] = ['query'],
  rowLimit: number = 10
): Promise<SearchQueryRow[]> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('No access token available');
  }

  // URL encode the site URL for the API path
  const encodedSiteUrl = encodeURIComponent(siteUrl);

  const response = await fetch(
    `${SEARCH_CONSOLE_API_BASE}/sites/${encodedSiteUrl}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions,
        rowLimit,
        // Filter out branded queries with very low impressions
        // dimensionFilterGroups: [],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `Failed to get search analytics: ${response.statusText}`);
  }

  const data: SearchQueryResponse = await response.json();
  return data.rows || [];
}

// Helper: Get top search keywords
export async function getTopSearchKeywords(
  siteUrl: string,
  startDate: string,
  endDate: string,
  limit: number = 10
): Promise<{
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}[]> {
  const rows = await getSearchAnalytics(siteUrl, startDate, endDate, ['query'], limit);

  return rows.map((row) => ({
    keyword: row.keys[0] || '',
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr * 100, // Convert to percentage
    position: row.position,
  }));
}

// Helper: Get search keywords with comparison to previous period
export async function getTopSearchKeywordsWithChange(
  siteUrl: string,
  startDate: string,
  endDate: string,
  limit: number = 10
): Promise<{
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  change: number; // percentage change in clicks
}[]> {
  // Calculate previous period dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const periodLength = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setDate(prevStart.getDate() - periodLength);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  // Fetch current and previous period data
  const [currentData, previousData] = await Promise.all([
    getTopSearchKeywords(siteUrl, startDate, endDate, limit * 2), // Get more to ensure we have enough
    getTopSearchKeywords(siteUrl, formatDate(prevStart), formatDate(prevEnd), 100),
  ]);

  // Create a map of previous period clicks
  const prevClicksMap = new Map<string, number>();
  for (const item of previousData) {
    prevClicksMap.set(item.keyword, item.clicks);
  }

  // Calculate change percentage
  return currentData.slice(0, limit).map((item) => {
    const prevClicks = prevClicksMap.get(item.keyword) || 0;
    const change = prevClicks > 0 ? ((item.clicks - prevClicks) / prevClicks) * 100 : 0;

    return {
      ...item,
      change: Math.round(change),
    };
  });
}
