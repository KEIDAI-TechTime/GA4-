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

  // Check if streaming is requested
  const useStreaming = req.headers.accept === 'text/event-stream';

  try {
    const data: AnalyticsData = req.body;
    const prompt = buildPrompt(data);

    if (useStreaming) {
      // Streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

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
          stream: true,
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
        res.write(`data: ${JSON.stringify({ error: 'Failed to get AI analysis' })}\n\n`);
        return res.end();
      }

      const reader = response.body?.getReader();
      if (!reader) {
        res.write(`data: ${JSON.stringify({ error: 'No response body' })}\n\n`);
        return res.end();
      }

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta') {
                const text = parsed.delta?.text || '';
                fullContent += text;
                // Send the text chunk to client
                res.write(`data: ${JSON.stringify({ type: 'chunk', text })}\n\n`);
              }
            } catch {
              // Ignore parse errors for incomplete JSON
            }
          }
        }
      }

      // Parse final JSON and send complete analysis
      const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const analysis = JSON.parse(jsonMatch[0]);
          res.write(`data: ${JSON.stringify({ type: 'complete', analysis })}\n\n`);
        } catch {
          res.write(`data: ${JSON.stringify({ type: 'error', error: 'Failed to parse response' })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      return res.end();
    } else {
      // Non-streaming response (backward compatible)
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

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return res.status(500).json({ error: 'Failed to parse AI response' });
      }

      const analysis = JSON.parse(jsonMatch[0]);
      return res.status(200).json(analysis);
    }
  } catch (error) {
    console.error('Error in analyze API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function buildPrompt(data: AnalyticsData): string {
  const mobileDevice = data.deviceBreakdown.find(d => d.device === 'mobile');
  const mobilePercentage = mobileDevice?.percentage || 0;

  // 流入元を詳細に
  const trafficDetails = data.trafficSources.slice(0, 5).map(s =>
    `${s.source}(${s.sessions}セッション)`
  ).join(', ');

  // ページ情報を詳細に（タイトルとパス両方）
  const pageDetails = data.topPages.slice(0, 10).map(p =>
    `「${p.pageTitle || '(タイトルなし)'}」(${p.pagePath}, ${p.pageViews}PV)`
  ).join('\n  ');

  return `あなたはウェブサイト分析の専門家です。以下のGA4データを分析し、サイトの特色を把握した上で改善提案と業界比較を提供してください。

## サイト基本情報
- 業種: ${data.industry}
- PV（ページビュー）: ${data.pageViews}
- ユーザー数: ${data.users}
- セッション数: ${data.sessions}
- 直帰率: ${data.bounceRate.toFixed(1)}%
- 平均セッション時間: ${Math.floor(data.avgSessionDuration / 60)}分${Math.floor(data.avgSessionDuration % 60)}秒
- モバイル比率: ${mobilePercentage.toFixed(1)}%

## 流入元の内訳
${trafficDetails}

## 人気ページ（上位10件）
  ${pageDetails}

## 出力形式
以下のJSON形式で回答してください。日本語で記述してください。

{
  "siteOverview": {
    "siteType": "サイトの種類（例：企業サイト、メディア、ブログ、ECサイト、サービス紹介など）",
    "description": "人気ページのタイトルやURLパスから推測されるサイトの内容・目的を具体的に説明（120文字以内）",
    "targetAudience": "想定される主なターゲット層（例：IT企業の経営者、転職を考えているエンジニアなど。30文字以内）",
    "contentFocus": "主に扱っているコンテンツや情報（人気ページから判断。40文字以内）",
    "trafficCharacteristics": "流入元の特徴から読み取れること（例：検索流入が主力で情報発信型。40文字以内）"
  },
  "improvements": [
    {
      "title": "改善提案のタイトル（15文字以内）",
      "reason": "データに基づく根拠（例：直帰率が65%で業界平均より15%高い）",
      "action": "具体的にやるべきこと（例：トップページに人気記事3つへのリンクを追加する）",
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
  "priorityAction": {
    "title": "最優先で実行すべきアクションのタイトル（20文字以内）",
    "description": "具体的な説明と期待効果（100文字以内）",
    "impact": "高" | "中" | "低",
    "effort": "高" | "中" | "低"
  },
  "changeAlerts": [
    {
      "type": "increase" | "decrease",
      "metric": "変化が検出された指標名",
      "message": "変化の説明（50文字以内）"
    }
  ],
  "summary": "全体的な分析サマリー（100文字以内）"
}

## 重要な指示
- siteOverviewは人気ページのタイトルやURLパス、流入元から、このサイトが何のサイトか詳しく推測する
- ページタイトルに含まれるキーワード（例：「採用」「サービス」「ブログ」「料金」など）からサイトの目的を判断する
- URLパス（例：/blog/, /service/, /about/など）からもサイト構造を推測する
- improvementsは3〜5個。各提案には必ず「reason（数値を含む根拠）」と「action（具体的な作業内容）」を含める
- 専門用語は使わないか、使う場合は括弧内で簡単に説明する（例：CTR（クリック率）、CVR（成約率））
- actionは「〜を確認する」「〜を追加する」「〜を変更する」など、すぐ実行できる形で書く
- changeAlertsには、データから読み取れる注目すべき特徴を1〜2個含める
- priorityActionには、最も効果が高く実行しやすい改善アクションを1つ選ぶ
- 業界「${data.industry}」のベンチマークデータを参考にする`;
}
