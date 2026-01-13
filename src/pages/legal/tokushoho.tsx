import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Tokushoho() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-12 px-4">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 mb-8 transition-colors"
        >
          <i className="ri-arrow-left-line"></i>
          <span>トップページに戻る</span>
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-8">特定商取引法に基づく表記</h1>

          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">販売業者</h2>
              <p className="text-slate-900">TechTime</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">運営責任者</h2>
              <p className="text-slate-900">請求があれば遅滞なく開示いたします</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">所在地</h2>
              <p className="text-slate-900">請求があれば遅滞なく開示いたします</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">電話番号</h2>
              <p className="text-slate-900">請求があれば遅滞なく開示いたします</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">メールアドレス</h2>
              <p className="text-slate-900">support@techtime.jp</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">販売URL</h2>
              <p className="text-slate-900">https://techtime.jp/ga4-analytics</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">販売価格</h2>
              <div className="text-slate-900">
                <p>無料プラン: ¥0/月</p>
                <p>Proプラン: ¥980/月（税込）</p>
              </div>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">販売価格以外の必要料金</h2>
              <p className="text-slate-900">なし</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">支払方法</h2>
              <p className="text-slate-900">クレジットカード（Stripe決済）</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">支払時期</h2>
              <p className="text-slate-900">申込時に初回課金、以降毎月同日に自動更新</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">サービス提供時期</h2>
              <p className="text-slate-900">決済完了後、即時ご利用いただけます</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">返品・キャンセルについて</h2>
              <div className="text-slate-900 space-y-2">
                <p>デジタルサービスの性質上、購入後の返金は原則としてお受けしておりません。</p>
                <p>サブスクリプションの解約は、次回更新日の前日までいつでも可能です。</p>
                <p>解約後も、契約期間終了までサービスをご利用いただけます。</p>
              </div>
            </div>

            <div className="pb-4">
              <h2 className="text-sm font-medium text-slate-500 mb-1">動作環境</h2>
              <div className="text-slate-900">
                <p>推奨ブラウザ: Google Chrome、Safari、Firefox、Microsoft Edge（最新版）</p>
                <p>インターネット接続環境が必要です</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          最終更新日: 2025年1月
        </p>
      </motion.div>
    </div>
  );
}
