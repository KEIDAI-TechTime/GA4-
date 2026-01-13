import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activePlan, setActivePlan] = useState<'free' | 'pro'>('free');

  const handleStartPro = () => {
    // Store intent to purchase Pro plan - will redirect to Stripe after login
    localStorage.setItem('pending_plan', 'pro');
    navigate('/login');
  };

  const features = [
    {
      icon: 'ri-robot-2-line',
      title: 'サイト概要の自動生成',
      description: 'AIがページのタイトルやURL、流入データからサイトの特色を自動で分析。サイトの種類、ターゲット層、主なコンテンツ、流入特性を一目で把握できます。',
      color: 'from-teal-400 to-cyan-500'
    },
    {
      icon: 'ri-dashboard-3-line',
      title: '重要指標のダッシュボード表示',
      description: 'PV、ユーザー数、セッション数、平均滞在時間など、重要な指標を一画面に集約。前期間との比較を自動計算し、増減率を併記します。',
      color: 'from-blue-400 to-blue-500'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'アクセス推移グラフ',
      description: '期間別（7日・30日・90日）のPV/UU推移を美しいグラフで可視化。トレンドを一目で把握できます。',
      color: 'from-purple-400 to-purple-500'
    },
    {
      icon: 'ri-file-list-3-line',
      title: '人気ページランキング',
      description: 'アクセス数の多い上位ページを自動抽出。ページタイトルを自動整形し、見やすく表示します。',
      color: 'from-orange-400 to-orange-500'
    },
    {
      icon: 'ri-search-line',
      title: '検索キーワード分析',
      description: 'Google Search Console連携で、検索からの流入キーワードを表示。クリック数・表示回数・CTR・変動率を一覧でき、SEO改善のヒントに。',
      color: 'from-emerald-400 to-emerald-500'
    },
    {
      icon: 'ri-pie-chart-line',
      title: '流入元・デバイス分析',
      description: '流入元（検索・SNS・直接・参照）とデバイス（スマホ・PC・タブレット）の割合を円グラフで表示。AIがアドバイスも提供します。',
      color: 'from-pink-400 to-pink-500'
    },
    {
      icon: 'ri-bar-chart-grouped-line',
      title: '業界ベンチマーク比較',
      description: '直帰率・セッション時間・ページ/セッションを業界平均と比較。15以上の業種に対応し、改善余地を自動判定します。',
      color: 'from-indigo-400 to-indigo-500'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'AIによる改善提案',
      description: 'データに基づく具体的な改善アクションを提示。根拠とやることを明確に分離し、優先度付きで表示します。',
      color: 'from-amber-400 to-amber-500'
    },
    {
      icon: 'ri-flag-line',
      title: '今やるべきこと',
      description: 'AIが分析した最も効果的な施策をハイライト表示。期待効果と実装難易度を明示します。',
      color: 'from-red-400 to-red-500'
    },
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
    { label: 'データソース', value: 'Google Analytics 4 / Google Search Console', icon: 'ri-database-2-line' },
    { label: 'AI分析', value: 'Claude AI（Anthropic）による高度な分析', icon: 'ri-brain-line' },
    { label: '認証', value: 'Googleアカウントでワンクリックログイン', icon: 'ri-shield-check-line' },
    { label: 'UI/UX', value: 'ダークモード＋グラスモーフィズムのモダンデザイン', icon: 'ri-palette-line' },
    { label: 'レスポンシブ', value: 'PC・タブレット・スマホ対応', icon: 'ri-smartphone-line' },
    { label: 'リアルタイム', value: 'ワンクリックでデータ更新', icon: 'ri-refresh-line' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* ヘッダー */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}logo-white.png`} alt="TechTime" className="h-7" />
              <span className="font-semibold text-lg leading-none mt-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Analytics</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-teal-500/25 transition-all whitespace-nowrap cursor-pointer"
            >
              無料で始める
            </button>
          </div>
        </div>
      </motion.header>

      {/* ヒーローセクション */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

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
              <span className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-teal-500/25">
                AI搭載アクセス分析ツール
              </span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              サイト分析をもっと<br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                シンプルに。
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 leading-relaxed">
              AIが導く、次のアクション。
            </p>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-3xl mx-auto">
              Google Analytics 4のデータを、わかりやすく可視化。<br />
              AIがあなたのサイトを分析し、今やるべきことを教えてくれます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-teal-500/30 hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-google-fill mr-2"></i>
                今すぐ無料で始める
              </button>
              <button className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-play-circle-line mr-2"></i>
                デモを見る
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-6">
              <i className="ri-check-line text-teal-400"></i> クレジットカード不要
              <i className="ri-check-line text-teal-400 ml-4"></i> 30秒で開始
            </p>
          </motion.div>

          {/* ダッシュボードプレビュー */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="bg-slate-900/80 px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-4 text-sm text-slate-400">アクセス分析ダッシュボード</span>
              </div>
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {['PV', 'ユーザー', 'セッション', '滞在時間'].map((label, i) => (
                    <div key={label} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                      <p className="text-slate-400 text-xs mb-1">{label}</p>
                      <p className="text-white text-2xl font-bold">{['12.5K', '8.2K', '10.1K', '2:34'][i]}</p>
                      <p className="text-emerald-400 text-xs">+{[12, 8, 15, 5][i]}%</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 h-32">
                    <p className="text-slate-400 text-sm mb-2">アクセス推移</p>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 h-32">
                    <p className="text-slate-400 text-sm mb-2">流入元</p>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full border-8 border-teal-500 border-r-purple-500 border-b-amber-500 border-l-blue-500"></div>
                      <div className="text-xs space-y-1">
                        <p className="text-slate-300"><span className="inline-block w-2 h-2 bg-teal-500 rounded mr-1"></span>検索 45%</p>
                        <p className="text-slate-300"><span className="inline-block w-2 h-2 bg-purple-500 rounded mr-1"></span>SNS 25%</p>
                        <p className="text-slate-300"><span className="inline-block w-2 h-2 bg-amber-500 rounded mr-1"></span>直接 20%</p>
                        <p className="text-slate-300"><span className="inline-block w-2 h-2 bg-blue-500 rounded mr-1"></span>参照 10%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 主な機能紹介 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">主な機能</h2>
            <p className="text-lg text-slate-400">
              AIが自動で分析し、具体的なアクションを提案します
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <i className={`${feature.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 技術的特徴 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">技術的特徴</h2>
            <p className="text-lg text-slate-400">
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
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <i className={`${spec.icon} text-teal-400 text-lg`}></i>
                  </div>
                  <h4 className="text-sm font-bold text-teal-400">{spec.label}</h4>
                </div>
                <p className="text-slate-300">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* こんな方におすすめ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">こんな方におすすめ</h2>
            <p className="text-lg text-slate-400">
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
                className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl p-6 text-center border border-teal-500/20 hover:border-teal-500/40 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/25">
                  <i className={`${user.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{user.title}</h3>
                <p className="text-slate-400 text-sm">{user.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 利用の流れ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">利用の流れ</h2>
            <p className="text-lg text-slate-400">
              たった3ステップで、すぐに始められます
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* 接続線 */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500"></div>

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 hover:border-teal-500/50 hover:bg-white/10 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-teal-500/25">
                    <i className={`${step.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-teal-400 font-bold text-sm border border-teal-500/30">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 価格プラン */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">シンプルな料金プラン</h2>
            <p className="text-lg text-slate-400">
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
              className={`bg-white/5 backdrop-blur-xl rounded-2xl p-8 border-2 ${
                activePlan === 'free' ? 'border-teal-500 shadow-xl shadow-teal-500/10' : 'border-white/10'
              } transition-all cursor-pointer`}
              onClick={() => setActivePlan('free')}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-white">¥0</span>
                  <span className="text-slate-400 ml-2">/月</span>
                </div>
                <p className="text-slate-400">まずは無料で試してみる</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-teal-400 text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-slate-300">基本機能すべて利用可能</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-teal-400 text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-slate-300">1サイトまで登録可能</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-teal-400 text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-slate-300">AI分析（月10回まで）</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-teal-400 text-xl mt-0.5 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-slate-300">データ保存期間30日</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/20"
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
              className={`bg-gradient-to-br from-teal-500/90 to-cyan-500/90 backdrop-blur-xl rounded-2xl p-8 border-2 ${
                activePlan === 'pro' ? 'border-white shadow-2xl shadow-teal-500/20' : 'border-teal-400/50'
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
                onClick={handleStartPro}
                className="w-full bg-white text-teal-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
              >
                Proで始める
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"></div>

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
            <p className="text-xl text-slate-300 mb-10">
              30秒で登録完了。クレジットカード不要で今すぐ無料で始められます。
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-teal-500/30 hover:scale-105 transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-3"
            >
              <i className="ri-google-fill text-2xl"></i>
              <span>Googleアカウントで無料登録</span>
            </button>
            <p className="text-slate-400 mt-6 text-sm">
              登録後すぐにダッシュボードをご利用いただけます
            </p>
          </motion.div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-950 border-t border-white/10 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={`${import.meta.env.BASE_URL}logo-white.png`} alt="TechTime" className="h-7" />
                <span className="font-semibold text-lg leading-none mt-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Analytics</span>
              </div>
              <p className="text-slate-500 text-sm">
                AIが導く、次のアクション。サイト分析をもっとシンプルに。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-300">プロダクト</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">機能</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">料金</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">事例</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">アップデート</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-300">サポート</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">ヘルプセンター</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">ドキュメント</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-300">法的情報</h4>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><Link to="/privacy" className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors cursor-pointer">利用規約</Link></li>
                <li><Link to="/tokushoho" className="hover:text-white transition-colors cursor-pointer">特定商取引法</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 アクセス分析ダッシュボード. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
