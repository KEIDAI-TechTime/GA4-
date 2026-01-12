// Vercel Serverless Function for Notion User Settings Database
// Using Relation to Users table
import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_SETTINGS_DB_ID = process.env.NOTION_SETTINGS_DATABASE_ID;
const NOTION_USERS_DB_ID = process.env.NOTION_USERS_DATABASE_ID;

async function notionRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Notion API error');
  }

  return response.json();
}

// Find user page by email to get the page ID for relation
async function findUserByEmail(email: string) {
  const response = await notionRequest(`/databases/${NOTION_USERS_DB_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        property: 'Email',
        email: { equals: email },
      },
    }),
  });

  return response.results[0] || null;
}

// Find settings by User relation
async function findSettingsByUserPageId(userPageId: string) {
  const response = await notionRequest(`/databases/${NOTION_SETTINGS_DB_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        property: 'User',
        relation: { contains: userPageId },
      },
    }),
  });

  return response.results[0] || null;
}

function parseNotionSettings(page: Record<string, unknown>): Record<string, unknown> {
  const props = page.properties as Record<string, Record<string, unknown>>;
  return {
    id: page.id,
    userPageId: ((props.User as Record<string, Array<Record<string, string>>>)?.relation?.[0]?.id) || '',
    emailNotifications: (props.EmailNotifications as Record<string, boolean>)?.checkbox || false,
    weeklyReport: (props.WeeklyReport as Record<string, boolean>)?.checkbox || false,
    alertThreshold: (props.AlertThreshold as Record<string, number>)?.number || 10,
    language: (props.Language as Record<string, Record<string, string>>)?.select?.name || 'ja',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!NOTION_API_KEY || !NOTION_SETTINGS_DB_ID || !NOTION_USERS_DB_ID) {
    return res.status(500).json({ error: 'Notion configuration missing' });
  }

  try {
    // GET: Get settings by user email
    if (req.method === 'GET') {
      const email = req.query.email as string;
      if (!email) {
        return res.status(400).json({ error: 'email is required' });
      }

      // First find the user page
      const userPage = await findUserByEmail(email);
      if (!userPage) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Then find settings linked to that user
      const settingsPage = await findSettingsByUserPageId(userPage.id);
      if (!settingsPage) {
        // Return default settings if none exist
        return res.status(200).json({
          userPageId: userPage.id,
          emailNotifications: true,
          weeklyReport: true,
          alertThreshold: 10,
          language: 'ja',
        });
      }

      return res.status(200).json(parseNotionSettings(settingsPage));
    }

    // POST: Create or update settings
    if (req.method === 'POST') {
      const {
        email,
        emailNotifications = true,
        weeklyReport = true,
        alertThreshold = 10,
        language = 'ja',
      } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'email is required' });
      }

      // First find the user page
      const userPage = await findUserByEmail(email);
      if (!userPage) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if settings already exist
      const existingSettings = await findSettingsByUserPageId(userPage.id);

      const properties = {
        User: { relation: [{ id: userPage.id }] },
        EmailNotifications: { checkbox: emailNotifications },
        WeeklyReport: { checkbox: weeklyReport },
        AlertThreshold: { number: alertThreshold },
        Language: { select: { name: language } },
      };

      if (existingSettings) {
        // Update existing
        await notionRequest(`/pages/${existingSettings.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ properties }),
        });
        return res.status(200).json({ success: true, updated: true });
      }

      // Create new settings
      const userName = ((userPage.properties as Record<string, Record<string, Array<Record<string, Record<string, string>>>>>).Name?.title?.[0]?.text?.content) || 'Unknown';

      await notionRequest('/pages', {
        method: 'POST',
        body: JSON.stringify({
          parent: { database_id: NOTION_SETTINGS_DB_ID },
          properties: {
            Name: { title: [{ text: { content: `${userName}の設定` } }] },
            ...properties,
          },
        }),
      });

      return res.status(201).json({ success: true, created: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Notion API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
