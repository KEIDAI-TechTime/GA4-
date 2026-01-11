import { useState } from 'react';
import ImprovementModal from './ImprovementModal';

export default function ImprovementSuggestions() {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  const suggestions = [
    {
      id: 1,
      icon: 'ri-smartphone-line',
      title: 'スマホ比率が70%超',
      description: 'モバイル表示の最適化を推奨',
      priority: 'high' as const,
      modalData: {
        title: 'モバイル表示の最適化',
        description: 'スマホからのアクセスが全体の70%を超えています。モバイル体験の改善が重要です。',
        impact: '高',
        effort: '中',
        details: {
          currentStatus: {
            pageViews: 12450,
            bounceRate: 68,
            avgTimeOnPage: '1分15秒',
            conversionRate: 1.2
          },
          suggestions: [
            {
              title: 'タップ領域の拡大',
              description: 'ボタンやリンクのタップ領域を最低44×44pxに設定し、誤タップを防止',
              priority: '高',
              expectedImpact: 'CV率 +0.8%'
            },
            {
              title: 'フォントサイズの最適化',
              description: '本文を16px以上に設定し、ズームなしで読みやすく',
              priority: '高',
              expectedImpact: '滞在時間 +25秒'
            },
            {
              title: '画像の軽量化',
              description: 'WebP形式への変換と遅延読み込みで表示速度を改善',
              priority: '中',
              expectedImpact: '離脱率 -12%'
            },
            {
              title: 'ハンバーガーメニューの改善',
              description: 'ナビゲーションを見つけやすく、使いやすいデザインに',
              priority: '中',
              expectedImpact: 'PV/セッション +0.5'
            }
          ],
          benchmarkComparison: {
            industry: 'EC・小売',
            yourBounceRate: 68,
            industryAverage: 52,
            topPerformers: 38
          }
        }
      }
    },
    {
      id: 2,
      icon: 'ri-search-line',
      title: '「〇〇 口コミ」で検索されている',
      description: '口コミページの作成が有効',
      priority: 'medium' as const,
      modalData: {
        title: '口コミページの作成',
        description: '検索キーワードに「口コミ」が含まれるクエリが増えています。専用ページの作成が効果的です。',
        impact: '高',
        effort: '中',
        details: {
          currentStatus: {
            pageViews: 8320,
            bounceRate: 72,
            avgTimeOnPage: '0分45秒',
            conversionRate: 0.8
          },
          suggestions: [
            {
              title: '顧客レビューページの新設',
              description: '実際の利用者の声を集めた専用ページを作成',
              priority: '高',
              expectedImpact: 'CV率 +1.5%'
            },
            {
              title: '星評価システムの導入',
              description: '視覚的にわかりやすい評価表示で信頼性を向上',
              priority: '高',
              expectedImpact: '滞在時間 +40秒'
            },
            {
              title: '写真付きレビューの促進',
              description: '実際の使用例がわかる写真付きレビューを増やす',
              priority: '中',
              expectedImpact: 'CV率 +0.9%'
            },
            {
              title: 'Q&Aセクションの追加',
              description: 'よくある質問と回答を口コミページに統合',
              priority: '低',
              expectedImpact: '離脱率 -8%'
            }
          ],
          benchmarkComparison: {
            industry: 'EC・小売',
            yourBounceRate: 72,
            industryAverage: 55,
            topPerformers: 42
          }
        }
      }
    },
    {
      id: 3,
      icon: 'ri-time-line',
      title: '平均滞在時間が短い',
      description: 'コンテンツの充実化を検討',
      priority: 'medium' as const,
      modalData: {
        title: 'コンテンツの充実化',
        description: '平均滞在時間が短く、ユーザーが十分に情報を得られていない可能性があります。',
        impact: '中',
        effort: '高',
        details: {
          currentStatus: {
            pageViews: 15680,
            bounceRate: 65,
            avgTimeOnPage: '1分05秒',
            conversionRate: 1.5
          },
          suggestions: [
            {
              title: '動画コンテンツの追加',
              description: '商品説明や使い方を動画で紹介し、理解を深める',
              priority: '高',
              expectedImpact: '滞在時間 +1分20秒'
            },
            {
              title: '関連記事の表示',
              description: 'ページ下部に関連性の高い記事を3〜5件表示',
              priority: '高',
              expectedImpact: 'PV/セッション +0.8'
            },
            {
              title: 'インフォグラフィックの活用',
              description: '複雑な情報を視覚的にわかりやすく伝える',
              priority: '中',
              expectedImpact: '滞在時間 +35秒'
            },
            {
              title: '目次の設置',
              description: '長文記事に目次を追加し、読みたい箇所にすぐアクセス',
              priority: '中',
              expectedImpact: '離脱率 -10%'
            }
          ],
          benchmarkComparison: {
            industry: 'EC・小売',
            yourBounceRate: 65,
            industryAverage: 52,
            topPerformers: 40
          }
        }
      }
    },
    {
      id: 4,
      icon: 'ri-share-line',
      title: 'SNSからの流入が少ない',
      description: 'シェアボタンの設置を推奨',
      priority: 'low' as const,
      modalData: {
        title: 'SNS流入の強化',
        description: 'SNSからの流入が少なく、認知拡大の機会を逃している可能性があります。',
        impact: '中',
        effort: '低',
        details: {
          currentStatus: {
            pageViews: 5240,
            bounceRate: 58,
            avgTimeOnPage: '2分10秒',
            conversionRate: 2.1
          },
          suggestions: [
            {
              title: 'シェアボタンの最適配置',
              description: '記事上部と下部にシェアボタンを設置し、シェアしやすく',
              priority: '高',
              expectedImpact: 'SNS流入 +45%'
            },
            {
              title: 'OGP画像の最適化',
              description: 'SNSでシェアされた際の表示画像を魅力的に',
              priority: '高',
              expectedImpact: 'クリック率 +28%'
            },
            {
              title: 'SNS投稿の定期化',
              description: '週3回以上の投稿で認知度を向上',
              priority: '中',
              expectedImpact: 'SNS流入 +60%'
            },
            {
              title: 'ハッシュタグ戦略の見直し',
              description: '業界関連の人気ハッシュタグを活用',
              priority: '中',
              expectedImpact: 'リーチ数 +35%'
            }
          ],
          benchmarkComparison: {
            industry: 'EC・小売',
            yourBounceRate: 58,
            industryAverage: 52,
            topPerformers: 45
          }
        }
      }
    },
    {
      id: 5,
      icon: 'ri-file-list-line',
      title: 'お問い合わせページの離脱率が高い',
      description: 'フォームの簡素化を検討',
      priority: 'high' as const,
      modalData: {
        title: 'お問い合わせフォームの改善',
        description: 'フォームページの離脱率が高く、入力の負担が大きい可能性があります。',
        impact: '高',
        effort: '低',
        details: {
          currentStatus: {
            pageViews: 3890,
            bounceRate: 78,
            avgTimeOnPage: '0分35秒',
            conversionRate: 0.5
          },
          suggestions: [
            {
              title: '入力項目の削減',
              description: '必須項目を5つ以下に絞り、入力の負担を軽減',
              priority: '高',
              expectedImpact: 'CV率 +2.3%'
            },
            {
              title: '入力例の表示',
              description: '各項目にプレースホルダーで入力例を表示',
              priority: '高',
              expectedImpact: '完了率 +18%'
            },
            {
              title: 'エラー表示の改善',
              description: 'リアルタイムバリデーションで入力ミスをすぐに通知',
              priority: '中',
              expectedImpact: '離脱率 -15%'
            },
            {
              title: '送信完了ページの最適化',
              description: '次のアクションを明確に提示し、サイト内回遊を促進',
              priority: '低',
              expectedImpact: 'PV/セッション +0.3'
            }
          ],
          benchmarkComparison: {
            industry: 'EC・小売',
            yourBounceRate: 78,
            industryAverage: 52,
            topPerformers: 35
          }
        }
      }
    }
  ];

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getPriorityLabel = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">その他の改善提案</h2>
          <span className="text-sm text-slate-500">{suggestions.length}件の提案</span>
        </div>

        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-white rounded-lg flex-shrink-0 shadow-sm">
                <i className={`${suggestion.icon} text-xl text-teal-600`}></i>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-sm">{suggestion.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${getPriorityColor(suggestion.priority)}`}>
                    優先度: {getPriorityLabel(suggestion.priority)}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{suggestion.description}</p>
              </div>

              <button
                onClick={() => setSelectedSuggestion(suggestion.id)}
                className="w-9 h-9 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
              >
                <i className="ri-arrow-right-line text-slate-600"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedSuggestion && (
        <ImprovementModal
          isOpen={true}
          onClose={() => setSelectedSuggestion(null)}
          action={suggestions.find(s => s.id === selectedSuggestion)!.modalData}
        />
      )}
    </>
  );
}
