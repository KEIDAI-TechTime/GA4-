import { useState, useEffect, useCallback } from 'react';
import {
  listGA4Properties,
  getBasicMetrics,
  getPageViewsByDate,
  getTopPages,
  getTrafficSources,
  getDeviceBreakdown,
  type GA4Property,
} from '../api/ga4';

// Get selected property from localStorage
export function useSelectedProperty() {
  const [propertyId, setPropertyId] = useState<string | null>(() => {
    return localStorage.getItem('selected_property');
  });

  const selectProperty = useCallback((id: string) => {
    localStorage.setItem('selected_property', id);
    setPropertyId(id);
  }, []);

  const clearProperty = useCallback(() => {
    localStorage.removeItem('selected_property');
    setPropertyId(null);
  }, []);

  return { propertyId, selectProperty, clearProperty };
}

// Fetch GA4 properties
export function useGA4Properties() {
  const [properties, setProperties] = useState<GA4Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const data = await listGA4Properties();
        setProperties(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return { properties, loading, error };
}

// Date range helper
function getDateRange(range: string): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date();

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

// Get previous period date range (same duration, immediately before current period)
function getPreviousPeriodDateRange(range: string): { startDate: string; endDate: string } {
  const { startDate, endDate } = getDateRange(range);
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = end.getTime() - start.getTime();

  const prevEnd = new Date(start.getTime() - 1); // 1 day before current start
  const prevStart = new Date(prevEnd.getTime() - duration);

  return {
    startDate: prevStart.toISOString().split('T')[0],
    endDate: prevEnd.toISOString().split('T')[0],
  };
}

// Basic metrics type
interface BasicMetrics {
  pageViews: number;
  users: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
}

// Fetch basic metrics (with previous period comparison)
export function useBasicMetrics(propertyId: string | null, dateRange: string = '30days') {
  const [data, setData] = useState<BasicMetrics | null>(null);
  const [previousData, setPreviousData] = useState<BasicMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const { startDate, endDate } = getDateRange(dateRange);
        const { startDate: prevStartDate, endDate: prevEndDate } = getPreviousPeriodDateRange(dateRange);

        // Fetch both current and previous period in parallel
        const [currentMetrics, prevMetrics] = await Promise.all([
          getBasicMetrics(propertyId, startDate, endDate),
          getBasicMetrics(propertyId, prevStartDate, prevEndDate),
        ]);

        setData(currentMetrics);
        setPreviousData(prevMetrics);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch metrics:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [propertyId, dateRange]);

  return { data, previousData, loading, error };
}

// Fetch page views by date (for charts)
export function usePageViewsByDate(propertyId: string | null, dateRange: string = '30days') {
  const [data, setData] = useState<{ date: string; pageViews: number; users: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const { startDate, endDate } = getDateRange(dateRange);
        const chartData = await getPageViewsByDate(propertyId, startDate, endDate);
        setData(chartData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch chart data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [propertyId, dateRange]);

  return { data, loading, error };
}

// Fetch top pages
export function useTopPages(propertyId: string | null, dateRange: string = '30days') {
  const [data, setData] = useState<{ pagePath: string; pageTitle: string; pageViews: number; avgTime: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const { startDate, endDate } = getDateRange(dateRange);
        const pages = await getTopPages(propertyId, startDate, endDate);
        setData(pages);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch top pages:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch top pages');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [propertyId, dateRange]);

  return { data, loading, error };
}

// Fetch traffic sources
export function useTrafficSources(propertyId: string | null, dateRange: string = '30days') {
  const [data, setData] = useState<{ source: string; sessions: number; users: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const { startDate, endDate } = getDateRange(dateRange);
        const sources = await getTrafficSources(propertyId, startDate, endDate);
        setData(sources);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch traffic sources:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch traffic sources');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [propertyId, dateRange]);

  return { data, loading, error };
}

// Fetch device breakdown
export function useDeviceBreakdown(propertyId: string | null, dateRange: string = '30days') {
  const [data, setData] = useState<{ device: string; sessions: number; percentage: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const { startDate, endDate } = getDateRange(dateRange);
        const devices = await getDeviceBreakdown(propertyId, startDate, endDate);
        setData(devices);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch device breakdown:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch device breakdown');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [propertyId, dateRange]);

  return { data, loading, error };
}
