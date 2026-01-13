// Vercel Serverless Function for updating user's selected industry
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!NOTION_API_KEY || !NOTION_USERS_DB_ID) {
    return res.status(500).json({ error: 'Notion configuration missing' });
  }

  try {
    const { email, industry } = req.body;

    if (!email || !industry) {
      return res.status(400).json({ error: 'Email and industry are required' });
    }

    const page = await findUserByEmail(email);
    if (!page) {
      return res.status(404).json({ error: 'User not found' });
    }

    await notionRequest(`/pages/${page.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        properties: {
          SelectedIndustry: {
            select: { name: industry },
          },
        },
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Notion API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
