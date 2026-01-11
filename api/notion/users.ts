// Vercel Serverless Function for Notion Users Database
import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
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

// Find user by email
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

// Create new user
async function createUser(user: {
  email: string;
  displayName: string;
  photoUrl?: string;
}) {
  return notionRequest('/pages', {
    method: 'POST',
    body: JSON.stringify({
      parent: { database_id: NOTION_USERS_DB_ID },
      properties: {
        Name: { title: [{ text: { content: user.displayName } }] },
        Email: { email: user.email },
        PhotoURL: user.photoUrl ? { url: user.photoUrl } : undefined,
        CreatedAt: { date: { start: new Date().toISOString() } },
        LastLoginAt: { date: { start: new Date().toISOString() } },
      },
    }),
  });
}

// Update user
async function updateUser(pageId: string, updates: Record<string, unknown>) {
  return notionRequest(`/pages/${pageId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties: updates }),
  });
}

// Parse Notion page to user object
function parseNotionUser(page: Record<string, unknown>): Record<string, unknown> {
  const props = page.properties as Record<string, Record<string, unknown>>;
  return {
    id: page.id,
    email: (props.Email as Record<string, string>)?.email || '',
    displayName: ((props.Name as Record<string, Array<Record<string, Record<string, string>>>>)?.title?.[0]?.text?.content) || '',
    photoUrl: (props.PhotoURL as Record<string, string>)?.url || '',
    selectedPropertyId: ((props.SelectedPropertyId as Record<string, Array<Record<string, Record<string, string>>>>)?.rich_text?.[0]?.text?.content) || '',
    selectedIndustry: (props.SelectedIndustry as Record<string, Record<string, string>>)?.select?.name || '',
    createdAt: (props.CreatedAt as Record<string, Record<string, string>>)?.date?.start || '',
    lastLoginAt: (props.LastLoginAt as Record<string, Record<string, string>>)?.date?.start || '',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!NOTION_API_KEY || !NOTION_USERS_DB_ID) {
    return res.status(500).json({ error: 'Notion configuration missing' });
  }

  try {
    // GET: Find user by email
    if (req.method === 'GET') {
      const email = req.query.email as string;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const page = await findUserByEmail(email);
      if (!page) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(parseNotionUser(page));
    }

    // POST: Create or update user (upsert)
    if (req.method === 'POST') {
      const { email, displayName, photoUrl } = req.body;

      if (!email || !displayName) {
        return res.status(400).json({ error: 'Email and displayName are required' });
      }

      // Check if user exists
      const existingPage = await findUserByEmail(email);

      if (existingPage) {
        // Update last login
        await updateUser(existingPage.id as string, {
          LastLoginAt: { date: { start: new Date().toISOString() } },
        });
        return res.status(200).json(parseNotionUser(existingPage));
      }

      // Create new user
      const newPage = await createUser({ email, displayName, photoUrl });
      return res.status(201).json(parseNotionUser(newPage));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Notion API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
