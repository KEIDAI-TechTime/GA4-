// Notion API Client
// Note: Notion API requires server-side calls due to secret key
// This client is designed to work with Vercel API routes

const NOTION_API_BASE = '/api/notion';

// Types for Notion database records
export interface NotionUser {
  id?: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  selectedPropertyId?: string;
  selectedIndustry?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

export interface NotionUserSettings {
  id?: string;
  userId: string;
  emailNotifications: boolean;
  weeklyReport: boolean;
  alertThreshold: number;
  language: string;
}

// Create or update user
export async function upsertUser(user: NotionUser): Promise<NotionUser> {
  const response = await fetch(`${NOTION_API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Failed to save user');
  }

  return response.json();
}

// Get user by email
export async function getUserByEmail(email: string): Promise<NotionUser | null> {
  const response = await fetch(`${NOTION_API_BASE}/users?email=${encodeURIComponent(email)}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to get user');
  }

  return response.json();
}

// Update user settings
export async function updateUserSettings(settings: NotionUserSettings): Promise<NotionUserSettings> {
  const response = await fetch(`${NOTION_API_BASE}/settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    throw new Error('Failed to save settings');
  }

  return response.json();
}

// Get user settings
export async function getUserSettings(userId: string): Promise<NotionUserSettings | null> {
  const response = await fetch(`${NOTION_API_BASE}/settings?userId=${encodeURIComponent(userId)}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to get settings');
  }

  return response.json();
}

// Update selected property for user
export async function updateSelectedProperty(
  email: string,
  propertyId: string
): Promise<void> {
  const response = await fetch(`${NOTION_API_BASE}/users/property`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, propertyId }),
  });

  if (!response.ok) {
    throw new Error('Failed to update property');
  }
}

// Update selected industry for user
export async function updateSelectedIndustry(
  email: string,
  industry: string
): Promise<void> {
  const response = await fetch(`${NOTION_API_BASE}/users/industry`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, industry }),
  });

  if (!response.ok) {
    throw new Error('Failed to update industry');
  }
}
