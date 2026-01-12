import type { VercelRequest, VercelResponse } from '@vercel/node';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

interface AnalyticsData {
  pageViews: number;
  users: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: { pagePath: string; pageTitle: string; pageViews: number }[];
  trafficSources: { source: string; sessions: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
  industry: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  try {
    const data: AnalyticsData = req.body;

    const prompt = buildPrompt(data);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API error:', error);
      return res.status(500).json({ error: 'Failed to get AI analysis' });
    }

    const result = await response.json();
    const content = result.content[0]?.text || '';

    // Parse the JSON response from Claude
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Error in analyze API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function buildPrompt(data: AnalyticsData): string {
  const mobileDevice = data.deviceBreakdown.find(d => d.device === 'mobile');
  const mobilePercentage = mobileDevice?.percentage || 0;

  const topSource = data.trafficSources[0]?.source || 'unknown';
  const topPages = data.topPages.slice(0, 5).map(p => p.pageTitle || p.pagePath).join(', ');

  return `あなたはウェブサイト分析の専門家です。以下のGA4データを分析し、改善提案と業界比較を提供してください。

## サイトデータ
- 業種: ${data.industry}
- PV（ページビュー）: ${data.pageViews}
- ユーザー数: ${data.users}
- セッション数: ${data.sessions}
- 直帰率: ${data.bounceRate.toFixed(1)}%
- 平均セッション時間: ${Math.floor(data.avgSessionDuration / 60)}分${Math.floor(data.avgSessionDuration % 60)}秒
- モバイル比率: ${mobilePercentage.toFixed(1)}%
- 主要流入元: ${topSource}
- 人気ページ: ${topPages}

## 出力形式
以下のJSON形式で回答してください。日本語で記述してください。

{
  "improvements": [
    {
      "title": "改善提案のタイトル（15文字以内）",
      "description": "具体的な改善内容（50文字以内）",
      "priority": "high" | "medium" | "low",
      "icon": "📈" | "📱" | "🔍" | "⚡" | "🎯" | "💡"
    }
  ],
  "industryComparison": {
    "bounceRate": {
      "value": ${data.bounceRate.toFixed(1)},
      "industryAvg": 業界平均値（数値）,
      "status": "good" | "average" | "needsWork"
    },
    "avgSessionDuration": {
      "value": ${data.avgSessionDuration.toFixed(0)},
      "industryAvg": 業界平均値（秒数）,
      "status": "good" | "average" | "needsWork"
    },
    "pagesPerSession": {
      "value": ${(data.pageViews / Math.max(data.sessions, 1)).toFixed(1)},
      "industryAvg": 業界平均値（数値）,
      "status": "good" | "average" | "needsWork"
    }
  },
  "summary": "全体的な分析サマリー（100文字以内）"
}

業界「${data.industry}」の最新のベンチマークデータを参考に、具体的で実行可能な提案を3〜5個提供してください。`;
}
