import { useTopPages, useSelectedProperty } from '../../../hooks/useGA4';

interface PageRankingProps {
  dateRange?: string;
}

export default function PageRanking({ dateRange = '30days' }: PageRankingProps) {
  const { propertyId } = useSelectedProperty();
  const { data, loading, error } = useTopPages(propertyId, dateRange);

  // データを整形（ページタイトルがあればそれを使用、なければパスから推測）
  const pages = data.slice(0, 5).map(item => ({
    name: item.pageTitle && item.pageTitle.trim() !== ''
      ? cleanPageTitle(item.pageTitle)
      : getPageName(item.pagePath),
    path: item.pagePath,
    views: item.pageViews,
  }));

  const maxViews = Math.max(...pages.map(p => p.views), 1);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">ページ別アクセス</h2>
            <p className="text-sm text-slate-500">上位5ページ</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">ページ別アクセス</h2>
            <p className="text-sm text-slate-500">上位5ページ</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center text-red-500">
          <p>データの取得に失敗しました</p>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">ページ別アクセス</h2>
            <p className="text-sm text-slate-500">上位5ページ</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center text-slate-500">
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">ページ別アクセス</h2>
          <p className="text-sm text-slate-500">上位5ページ</p>
        </div>
        <button className="text-sm text-teal-600 font-medium hover:text-teal-700 whitespace-nowrap">
          すべて見る
        </button>
      </div>

      <div className="space-y-4">
        {pages.map((page, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 truncate">{page.name}</p>
                  <p className="text-xs text-slate-500 truncate">{page.path}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0 ml-3">
                <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                  {page.views.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(page.views / maxViews) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// パスからページ名を推測
function getPageName(path: string): string {
  if (path === '/' || path === '') return 'トップページ';

  // パスの最後のセグメントを取得
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';

  // 一般的なパスを日本語に変換
  const pathMap: Record<string, string> = {
    'about': '会社概要',
    'contact': 'お問い合わせ',
    'products': '商品一覧',
    'services': 'サービス',
    'blog': 'ブログ',
    'news': 'ニュース',
    'faq': 'よくある質問',
    'privacy': 'プライバシーポリシー',
    'terms': '利用規約',
    'company': '会社情報',
    'access': 'アクセス',
    'recruit': '採用情報',
    'price': '料金',
    'pricing': '料金',
    'features': '機能',
    'support': 'サポート',
    'help': 'ヘルプ',
    'works': '実績',
    'portfolio': 'ポートフォリオ',
    'case': '事例',
    'cases': '事例',
    'flow': 'ご利用の流れ',
    'voice': 'お客様の声',
    'review': 'レビュー',
    'reviews': 'レビュー',
  };

  // マッピングがあれば使用
  if (pathMap[lastSegment.toLowerCase()]) {
    return pathMap[lastSegment.toLowerCase()];
  }

  // 日付形式のパターンを検出（例: 20250613-2, 2025-06-13, 20250613 など）
  const datePattern = /^(\d{8}|\d{4}-\d{2}-\d{2})(-\d+)?$/;
  if (datePattern.test(lastSegment)) {
    // 日付を抽出してフォーマット
    const dateMatch = lastSegment.match(/^(\d{4})(\d{2}|\-\d{2})(\d{2}|\-\d{2})/);
    if (dateMatch) {
      const year = dateMatch[1];
      const month = dateMatch[2].replace('-', '');
      const day = dateMatch[3].replace('-', '');
      return `記事 (${year}/${month}/${day})`;
    }
    return '記事';
  }

  // 数字とハイフンのみの場合は記事として扱う
  if (/^[\d\-]+$/.test(lastSegment)) {
    return '記事';
  }

  // IDっぽい文字列（長い英数字）は記事として扱う
  if (/^[a-zA-Z0-9]{10,}$/.test(lastSegment)) {
    return '記事';
  }

  // blogやnewsの配下は記事
  if (segments.some(s => ['blog', 'news', 'article', 'articles', 'post', 'posts'].includes(s.toLowerCase()))) {
    return '記事: ' + lastSegment;
  }

  // なければパスをそのまま表示（先頭を大文字に）
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

// ページタイトルをクリーンアップ（サイト名の重複除去など）
function cleanPageTitle(title: string): string {
  // よくあるセパレータでサイト名を除去
  const separators = [' | ', ' - ', ' – ', ' — ', ' :: ', ' : '];
  for (const sep of separators) {
    if (title.includes(sep)) {
      const parts = title.split(sep);
      // 最初の部分がページタイトル、最後がサイト名のことが多い
      if (parts.length >= 2) {
        const firstPart = parts[0].trim();
        // 最初の部分が短すぎる場合は次の部分も含める
        if (firstPart.length < 5 && parts.length > 2) {
          return parts.slice(0, 2).join(sep).trim();
        }
        return firstPart;
      }
    }
  }
  // 長すぎるタイトルは切り詰め
  if (title.length > 40) {
    return title.substring(0, 37) + '...';
  }
  return title;
}
