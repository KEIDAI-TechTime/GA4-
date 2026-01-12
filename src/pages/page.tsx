import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = useState<'free' | 'pro'>('free');

  const features = [
    {
      icon: 'ri-robot-2-line',
      title: 'サイト概要の自動生成',
      description: 'AIがページのタイトルやURL、流入データからサイトの特色を自動で分析。サイトの種類、ターゲット層、主なコンテンツ、流入特性を一目で把握できます。',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: 'ri-dashboard-3-line',
      title: '重要指標のダッシュボード表示',
      description: 'PV、ユーザー数、セッション数、平均滞在時間など、重要な指標を一画面に集約。前期間との比較を自動計算し、増減率を併記します。',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'アクセス推移グラフ',
      description: '期間別（7日・30日・90日）のPV/UU推移を美しいグラフで可視化。トレンドを一目で把握できます。',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'ri-file-list-3-line',
      title: '人気ページランキング',
      description: 'アクセス数の多い上位ページを自動抽出。ページタイトルを自動整形し、見やすく表示します。',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: 'ri-search-line',
      title: '検索キーワード分析',
      description: 'Google Search Console連携で、検索からの流入キーワードを表示。クリック数・表示回数・CTR・変動率を一覧でき、SEO改善のヒントに。',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'ri-pie-chart-line',
      title: '流入元・デバイス分析',
      description: '流入元（検索・SNS・直接・参照）とデバイス（スマホ・PC・タブレット）の割合を円グラフで表示。AIがアドバイスも提供します。',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: 'ri-bar-chart-grouped-line',
      title: '業界ベンチマーク比較',
      description: '直帰率・セッション時間・ページ/セッションを業界平均と比較。15以上の業種に対応し、改善余地を自動判定します。',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'AIによる改善提案',
      description: 'データに基づく具体的な改善アクションを提示。根拠とやることを明確に分離し、優先度付きで表示します。',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: 'ri-flag-line',
      title: '今やるべきこと',
      description: 'AIが分析した最も効果的な施策をハイライト表示。期待効果と実装難易度を明示します。',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: 'ri-notification-3-line',
      title: '変化アラート',
      description: 'アクセス数の急増・急減など異常を自動検知。見逃しやすい変化をプッシュ通知でお知らせします。',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const targetUsers = [
    {
      icon: 'ri-computer-line',
      title: 'Webサイト運営者',
      description: '専門知識なしでアクセス解析したい'
    },
    {
      icon: 'ri-megaphone-line',
      title: 'マーケティング担当者',
      description: '施策の効果を素早く把握したい'
    },
    {
      icon: 'ri-briefcase-line',
      title: '経営者・事業責任者',
      description: 'サイトの健康状態を一目で知りたい'
    },
    {
      icon: 'ri-palette-line',
      title: 'フリーランス・制作会社',
      description: 'クライアントへのレポート作成を効率化したい'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Googleアカウントでログイン',
      description: 'GA4・Search Consoleと自動連携',
      icon: 'ri-google-fill'
    },
    {
      number: '2',
      title: '業種を選択',
      description: '業界ベンチマークの精度がアップ',
      icon: 'ri-building-line'
    },
    {
      number: '3',
      title: 'ダッシュボードで確認',
      description: 'すぐにAI分析結果と改善提案を確認',
      icon: 'ri-dashboard-line'
    }
  ];

  const techSpecs = [
    { label: 'データソース', value: 'Google Analytics 4 / Google Search Console' },
    { label: 'AI分析', value: 'Claude AI（Anthropic）による高度な分析' },
    { label: '認証', value: 'Googleアカウントでワンクリックログイン' },
    { label: 'UI/UX', value: 'ダークモード＋グラスモーフィズムのモダンデザイン' },
    { label: 'レスポンシブ', value: 'PC・タブレット・スマホ対応' },
    { label: 'リアルタイム', value: 'ワンクリックでデータ更新' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* ヘッダー */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <i className="ri-dashboard-3-line text-xl text-white"></i>
              </div>
              <span className="text-lg font-bold text-slate-900">アクセス分析ダッシュボード</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
            >
              無料で始める
            </button>
          </div>
        </div>
      </motion.header>

      {/* ヒーローセクション */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-cyan-500/5 to-blue-500/5"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              className="inline-block mb-6"
            >
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                AI搭載アクセス分析ツール
              </span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              サイト分析をもっと<br />
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                シンプルに。
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-4 leading-relaxed">
              AIが導く、次のアクション。
            </p>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-3xl mx-auto">
              Google Analytics 4のデータを、わかりやすく可視化。<br />
              AIがあなたのサイトを分析し、今やるべきことを教えてくれます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-google-fill mr-2"></i>
                今すぐ無料で始める
              </button>
              <button className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold text-lg border-2 border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-play-circle-line mr-2"></i>
                デモを見る
              </button>
            </div>
            <p className="text-sm text-slate-400 mt-6">
              <i className="ri-check-line text-teal-500"></i> クレジットカード不要 
              <i className="ri-check-line text-teal-500 ml-4"></i> 30秒で開始
            </p>
          </motion.div>

          {/* ダッシュボードプレビュー */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <img
                src="https://readdy.ai/api/search-image?query=modern%20analytics%20dashboard%20interface%20with%20clean%20design%20showing%20colorful%20charts%20graphs%20and%20data%20visualization%20on%20white%20background%2C%20professional%20UI%20UX%20design%2C%20teal%20and%20cyan%20accent%20colors%2C%20minimalist%20style%2C%20high%20quality%20screenshot&width=1200&height=700&seq=dashboard-preview-001&orientation=landscape"
                alt="ダッシュボードプレビュー"
                className="w-full h-auto object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 主な機能紹介 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">主な機能</h2>
            <p className="text-lg text-slate-600">
              AIが自動で分析し、具体的なアクションを提案します
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <i className={`${feature.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 技術的特徴 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">技術的特徴</h2>
            <p className="text-lg text-slate-600">
              最新のAI技術とモダンなデザインで、快適な分析体験を提供
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all"
              >
                <h4 className="text-sm font-bold text-teal-600 mb-2">{spec.label}</h4>
                <p className="text-slate-700 font-medium">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* こんな方におすすめ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">こんな方におすすめ</h2>
            <p className="text-lg text-slate-600">
              様々な立場の方に、最適な分析体験を提供します
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetUsers.map((user, index) => (
              <motion.div
                key={user.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 text-center border border-teal-100 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${user.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{user.title}</h3>
                <p className="text-slate-600 text-sm">{user.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 利用の流れ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">利用の流れ</h2>
            <p className="text-lg text-slate-600">
              たった3ステップで、すぐに始められます
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* 接続線 */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-600"></div>

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 text-center border-2 border-slate-200 hover:border-teal-500 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <i className={`${step.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl -z-10 opacity-20">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 価格プラン */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">シンプルな料金プラン</h2>
            <p className="text-lg text-slate-600">
              まずは無料で始めて、必要に応じてアップグレード
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Freeプラン */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`bg-white rounded-2xl p-8 border-2 ${
                activePlan === 'free' ? 'border-teal-500 shadow-xl' : 'border-slate-200'
              } transition-all cursor-pointer`}
              onClick={() => setActivePlan('free')}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-slate-900">¥0</span>
                  <span className="text-slate-500 ml-2">/月</span>
                </div>
                <p className="text-slate-600">まずは無料で試してみる</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-teal-500 text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-slate-700">基本機能すべて利用可能</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-teal-500 text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-slate-700">1サイトまで登録可能</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-teal-500 text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-slate-700">AI分析（月10回まで）</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-teal-500 text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-slate-700">データ保存期間30日</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                無料で始める
              </button>
            </motion.div>

            {/* Proプラン */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 border-2 ${
                activePlan === 'pro' ? 'border-white shadow-2xl' : 'border-teal-400'
              } transition-all cursor-pointer relative overflow-hidden`}
              onClick={() => setActivePlan('pro')}
            >
              <div className="absolute top-4 right-4">
                <span className="bg-white text-teal-600 px-3 py-1 rounded-full text-xs font-bold">
                  おすすめ
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-white">¥980</span>
                  <span className="text-white/80 ml-2">/月</span>
                </div>
                <p className="text-white/90">本格的に分析したい方に</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-white text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-white">すべての機能が無制限</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-white text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-white">複数サイト登録可能</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-white text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-white">AI分析無制限</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-white text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-white">データ保存期間無制限</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-white text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-white">優先サポート</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-white text-teal-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
              >
                Proで始める
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              今すぐ始めて、<br />
              サイトの可能性を最大化しよう
            </h2>
            <p className="text-xl text-white/90 mb-10">
              30秒で登録完了。クレジットカード不要で今すぐ無料で始められます。
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-teal-600 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-3"
            >
              <i className="ri-google-fill text-2xl"></i>
              <span>Googleアカウントで無料登録</span>
            </button>
            <p className="text-white/80 mt-6 text-sm">
              登録後すぐにダッシュボードをご利用いただけます
            </p>
          </motion.div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <i className="ri-dashboard-3-line text-xl text-white"></i>
                </div>
                <span className="text-lg font-bold">アクセス分析ダッシュボード</span>
              </div>
              <p className="text-slate-400 text-sm">
                AIが導く、次のアクション。サイト分析をもっとシンプルに。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">プロダクト</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">機能</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">料金</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">事例</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">アップデート</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">サポート</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">ヘルプセンター</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">ドキュメント</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">会社情報</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">会社概要</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">利用規約</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">特定商取引法</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 アクセス分析ダッシュボード. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer">
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
