import { useState, useEffect, useCallback } from 'react';
import {
  listSearchConsoleSites,
  getTopSearchKeywordsWithChange,
  type SearchConsoleSite,
} from '../api/searchConsole';

// Get selected site from localStorage
export function useSelectedSite() {
  const [siteUrl, setSiteUrl] = useState<string | null>(() => {
    return localStorage.getItem('selected_search_console_site');
  });

  const selectSite = useCallback((url: string) => {
    localStorage.setItem('selected_search_console_site', url);
    setSiteUrl(url);
  }, []);

  const clearSite = useCallback(() => {
    localStorage.removeItem('selected_search_console_site');
    setSiteUrl(null);
  }, []);

  return { siteUrl, selectSite, clearSite };
}

// Fetch Search Console sites
export function useSearchConsoleSites() {
  const [sites, setSites] = useState<SearchConsoleSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSites() {
      try {
        setLoading(true);
        const data = await listSearchConsoleSites();
        setSites(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch Search Console sites:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch sites');
      } finally {
        setLoading(false);
      }
    }

    fetchSites();
  }, []);

  return { sites, loading, error };
}

// Date range helper
function getDateRange(range: string): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date();

  // Search Console data has a 2-3 day delay, so adjust end date
  end.setDate(end.getDate() - 3);

  switch (range) {
    case '7days':
      start.setDate(end.getDate() - 7);
      break;
    case '30days':
      start.setDate(end.getDate() - 30);
      break;
    case '90days':
      start.setDate(end.getDate() - 90);
      break;
    default:
      start.setDate(end.getDate() - 30);
  }

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  };
}

// Fetch top search keywords with change percentage
export function useTopSearchKeywords(siteUrl: string | null, dateRange: string = '30days') {
  const [data, setData] = useState<{
    keyword: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    change: number;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteUrl) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const { startDate, endDate } = getDateRange(dateRange);
        const keywords = await getTopSearchKeywordsWithChange(siteUrl, startDate, endDate, 10);
        setData(keywords);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch search keywords:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch keywords');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [siteUrl, dateRange]);

  return { data, loading, error };
}
