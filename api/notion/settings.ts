// Vercel Serverless Function for Notion User Settings Database
import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_SETTINGS_DB_ID = process.env.NOTION_SETTINGS_DATABASE_ID;

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

async function findSettingsByUserId(userId: string) {
  const response = await notionRequest(`/databases/${NOTION_SETTINGS_DB_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        property: 'UserId',
        rich_text: { equals: userId },
      },
    }),
  });

  return response.results[0] || null;
}

function parseNotionSettings(page: Record<string, unknown>): Record<string, unknown> {
  const props = page.properties as Record<string, Record<string, unknown>>;
  return {
    id: page.id,
    userId: ((props.UserId as Record<string, Array<Record<string, Record<string, string>>>>)?.rich_text?.[0]?.text?.content) || '',
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

  if (!NOTION_API_KEY || !NOTION_SETTINGS_DB_ID) {
    return res.status(500).json({ error: 'Notion configuration missing' });
  }

  try {
    // GET: Get settings by userId
    if (req.method === 'GET') {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const page = await findSettingsByUserId(userId);
      if (!page) {
        return res.status(404).json({ error: 'Settings not found' });
      }

      return res.status(200).json(parseNotionSettings(page));
    }

    // POST: Create or update settings
    if (req.method === 'POST') {
      const {
        userId,
        emailNotifications = true,
        weeklyReport = true,
        alertThreshold = 10,
        language = 'ja',
      } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const existingPage = await findSettingsByUserId(userId);

      const properties = {
        UserId: { rich_text: [{ text: { content: userId } }] },
        EmailNotifications: { checkbox: emailNotifications },
        WeeklyReport: { checkbox: weeklyReport },
        AlertThreshold: { number: alertThreshold },
        Language: { select: { name: language } },
      };

      if (existingPage) {
        // Update existing
        await notionRequest(`/pages/${existingPage.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ properties }),
        });
        return res.status(200).json({ success: true, updated: true });
      }

      // Create new
      await notionRequest('/pages', {
        method: 'POST',
        body: JSON.stringify({
          parent: { database_id: NOTION_SETTINGS_DB_ID },
          properties: {
            Name: { title: [{ text: { content: `Settings for ${userId}` } }] },
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
