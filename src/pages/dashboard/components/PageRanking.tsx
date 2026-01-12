import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTopPages, useSelectedProperty } from '../../../hooks/useGA4';

interface PageRankingProps {
  dateRange?: string;
}

export default function PageRanking({ dateRange = '30days' }: PageRankingProps) {
  const { propertyId } = useSelectedProperty();
  const { data, loading, error } = useTopPages(propertyId, dateRange);
  const [showAllModal, setShowAllModal] = useState(false);

  // データを整形（ページタイトルがあればそれを使用、なければパスから推測）
  const pages = data.slice(0, 5).map(item => ({
    name: item.pageTitle && item.pageTitle.trim() !== '' && isValidTitle(item.pageTitle)
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
        <button
          onClick={() => setShowAllModal(true)}
          className="text-sm text-teal-600 font-medium hover:text-teal-700 whitespace-nowrap cursor-pointer"
        >
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

      {/* すべて見るモーダル */}
      <AnimatePresence>
        {showAllModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowAllModal(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">ページ別アクセス</h2>
                    <p className="text-sm text-slate-500">全{data.length}ページ</p>
                  </div>
                  <button
                    onClick={() => setShowAllModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-xl text-slate-500"></i>
                  </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-3">
                  {data.map((item, index) => {
                    const pageName = item.pageTitle && item.pageTitle.trim() !== '' && isValidTitle(item.pageTitle)
                      ? cleanPageTitle(item.pageTitle)
                      : getPageName(item.pagePath);
                    const maxViewsInModal = Math.max(...data.map(p => p.pageViews), 1);

                    return (
                      <div key={index} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0 shadow-sm">
                              {index + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-slate-900 truncate">{pageName}</p>
                              <p className="text-xs text-slate-500 truncate">{item.pagePath}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 flex-shrink-0 ml-3">
                            <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                              {item.pageViews.toLocaleString()} PV
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-cyan-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${(item.pageViews / maxViewsInModal) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
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

// タイトルが有効か（日本語/英語のみ）を検証
// 韓国語（ハングル）や中国語のみのタイトルは除外
function isValidTitle(title: string): boolean {
  if (!title || title.trim() === '') return false;

  // ハングル文字の範囲をチェック（韓国語）
  const hasKorean = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(title);
  if (hasKorean) return false;

  // タイトルに日本語（ひらがな、カタカナ、漢字）または英字が含まれているか
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF]/.test(title); // ひらがな・カタカナ
  const hasKanji = /[\u4E00-\u9FFF]/.test(title); // 漢字（日中共通）
  const hasEnglish = /[a-zA-Z]/.test(title);

  // 日本語（ひらがな/カタカナ）があれば有効
  if (hasJapanese) return true;

  // 英語があれば有効
  if (hasEnglish) return true;

  // 漢字のみの場合は許可（日本語サイトでは一般的）
  if (hasKanji) return true;

  // 数字や記号のみの場合は無効
  return false;
}