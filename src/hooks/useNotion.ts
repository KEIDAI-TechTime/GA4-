import { useState, useEffect, useCallback } from 'react';
import {
  getUserByEmail,
  upsertUser,
  updateSelectedProperty,
  updateSelectedIndustry,
  getUserSettings,
  updateUserSettings,
  type NotionUser,
  type NotionUserSettings,
} from '../api/notion';
import { useAuth } from '../context/AuthContext';

// Hook for managing current user data in Notion
export function useNotionUser() {
  const { user } = useAuth();
  const [notionUser, setNotionUser] = useState<NotionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync user to Notion on login
  useEffect(() => {
    if (!user?.email) {
      setNotionUser(null);
      setLoading(false);
      return;
    }

    async function syncUser() {
      try {
        setLoading(true);
        const savedUser = await upsertUser({
          email: user.email!,
          displayName: user.displayName || 'Unknown',
          photoUrl: user.photoURL || undefined,
        });
        setNotionUser(savedUser);
        setError(null);
      } catch (err) {
        console.error('Failed to sync user to Notion:', err);
        setError(err instanceof Error ? err.message : 'Failed to sync user');
      } finally {
        setLoading(false);
      }
    }

    syncUser();
  }, [user]);

  // Update selected property
  const saveSelectedProperty = useCallback(
    async (propertyId: string) => {
      if (!user?.email) return;

      try {
        await updateSelectedProperty(user.email, propertyId);
        setNotionUser((prev) =>
          prev ? { ...prev, selectedPropertyId: propertyId } : null
        );
      } catch (err) {
        console.error('Failed to save property:', err);
        throw err;
      }
    },
    [user?.email]
  );

  // Update selected industry
  const saveSelectedIndustry = useCallback(
    async (industry: string) => {
      if (!user?.email) return;

      try {
        await updateSelectedIndustry(user.email, industry);
        setNotionUser((prev) =>
          prev ? { ...prev, selectedIndustry: industry } : null
        );
      } catch (err) {
        console.error('Failed to save industry:', err);
        throw err;
      }
    },
    [user?.email]
  );

  return {
    notionUser,
    loading,
    error,
    saveSelectedProperty,
    saveSelectedIndustry,
  };
}

// Hook for user settings
export function useNotionSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotionUserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load settings
  useEffect(() => {
    if (!user?.uid) {
      setSettings(null);
      setLoading(false);
      return;
    }

    async function loadSettings() {
      try {
        setLoading(true);
        const userSettings = await getUserSettings(user.uid);
        setSettings(
          userSettings || {
            userId: user.uid,
            emailNotifications: true,
            weeklyReport: true,
            alertThreshold: 10,
            language: 'ja',
          }
        );
        setError(null);
      } catch (err) {
        console.error('Failed to load settings:', err);
        // Use defaults on error
        setSettings({
          userId: user.uid,
          emailNotifications: true,
          weeklyReport: true,
          alertThreshold: 10,
          language: 'ja',
        });
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [user?.uid]);

  // Save settings
  const saveSettings = useCallback(
    async (newSettings: Partial<NotionUserSettings>) => {
      if (!user?.uid || !settings) return;

      const updatedSettings = { ...settings, ...newSettings };

      try {
        await updateUserSettings(updatedSettings);
        setSettings(updatedSettings);
      } catch (err) {
        console.error('Failed to save settings:', err);
        throw err;
      }
    },
    [user?.uid, settings]
  );

  return {
    settings,
    loading,
    error,
    saveSettings,
  };
}

// Combined hook for property selection with Notion persistence
export function useSelectedPropertyWithNotion() {
  const { notionUser, loading: notionLoading, saveSelectedProperty } = useNotionUser();
  const [propertyId, setPropertyId] = useState<string | null>(null);

  // Initialize from Notion user data
  useEffect(() => {
    if (notionUser?.selectedPropertyId) {
      setPropertyId(notionUser.selectedPropertyId);
      // Also update localStorage for quick access
      localStorage.setItem('selected_property', notionUser.selectedPropertyId);
    }
  }, [notionUser?.selectedPropertyId]);

  // Select property and save to Notion
  const selectProperty = useCallback(
    async (id: string) => {
      setPropertyId(id);
      localStorage.setItem('selected_property', id);

      try {
        await saveSelectedProperty(id);
      } catch {
        console.error('Failed to save property to Notion, but continuing with local storage');
      }
    },
    [saveSelectedProperty]
  );

  return {
    propertyId,
    selectProperty,
    loading: notionLoading,
  };
}
