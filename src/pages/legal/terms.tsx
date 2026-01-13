import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Terms() {
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
          <h1 className="text-2xl font-bold text-slate-900 mb-8">利用規約</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-6">
              この利用規約（以下「本規約」）は、TechTime（以下「当社」）が提供する
              アクセス分析ダッシュボード（以下「本サービス」）の利用条件を定めるものです。
              本サービスをご利用いただく前に、本規約をよくお読みください。
            </p>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第1条（適用）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>本規約は、お客様と当社との間の本サービスの利用に関わる一切の関係に適用されます。</li>
                <li>本サービスを利用することにより、お客様は本規約に同意したものとみなされます。</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第2条（サービス内容）</h2>
              <p className="text-slate-600 mb-3">本サービスは、以下の機能を提供します。</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>Google Analytics 4のデータ可視化</li>
                <li>Google Search Consoleのデータ可視化</li>
                <li>AIによるサイト分析・改善提案</li>
                <li>各種レポート機能</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第3条（利用登録）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>本サービスの利用には、Googleアカウントによる認証が必要です。</li>
                <li>お客様は、正確かつ最新の情報を提供するものとします。</li>
                <li>当社は、以下の場合に利用登録を拒否することがあります。
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>虚偽の情報を提供した場合</li>
                    <li>過去に本規約に違反したことがある場合</li>
                    <li>その他、当社が不適切と判断した場合</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第4条（料金・支払い）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>本サービスには無料プランと有料プラン（Proプラン）があります。</li>
                <li>Proプランの料金は月額980円（税込）です。</li>
                <li>支払いはクレジットカード（Stripe決済）で行います。</li>
                <li>サブスクリプションは毎月自動更新されます。</li>
                <li>料金は変更される場合があります。変更時は事前にお知らせします。</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第5条（解約・返金）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>お客様は、設定画面からいつでもサブスクリプションを解約できます。</li>
                <li>解約後も、契約期間の終了まで本サービスをご利用いただけます。</li>
                <li>デジタルサービスの性質上、購入後の返金は原則としてお受けしておりません。</li>
                <li>当社の責めに帰すべき事由によりサービスを提供できなかった場合は、個別に対応いたします。</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第6条（禁止事項）</h2>
              <p className="text-slate-600 mb-3">お客様は、以下の行為を行ってはなりません。</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>本サービスのサーバーやネットワークに過度な負荷をかける行為</li>
                <li>本サービスの運営を妨害する行為</li>
                <li>他のユーザーの情報を不正に収集する行為</li>
                <li>本サービスのリバースエンジニアリング</li>
                <li>第三者に成りすます行為</li>
                <li>アカウントの売買・譲渡</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第7条（知的財産権）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>本サービスに関する知的財産権は、当社または正当な権利者に帰属します。</li>
                <li>お客様のGA4/Search Consoleのデータに関する権利は、お客様に帰属します。</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第8条（免責事項）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>AI分析による提案は参考情報であり、その正確性・有効性を保証するものではありません。</li>
                <li>本サービスの利用により生じた損害について、当社は故意または重過失がある場合を除き、責任を負いません。</li>
                <li>当社は、本サービスの中断、停止、変更等により生じた損害について責任を負いません。</li>
                <li>Google Analytics、Search Console、Stripeなど外部サービスの障害については、当社は責任を負いません。</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第9条（サービスの変更・終了）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>当社は、事前の通知なく本サービスの内容を変更することがあります。</li>
                <li>本サービスを終了する場合は、30日前までにお知らせします。</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第10条（利用規約の変更）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>当社は、必要に応じて本規約を変更することがあります。</li>
                <li>変更後の規約は、本サービス上に掲載した時点で効力を生じます。</li>
                <li>重要な変更がある場合は、事前にお知らせします。</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">第11条（準拠法・管轄裁判所）</h2>
              <ol className="list-decimal list-inside text-slate-600 space-y-2 ml-4">
                <li>本規約は、日本法に準拠します。</li>
                <li>本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">第12条（お問い合わせ）</h2>
              <p className="text-slate-600">
                本規約に関するお問い合わせは、以下までご連絡ください。
              </p>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-700">TechTime</p>
                <p className="text-slate-600">メール: support@techtime.jp</p>
              </div>
            </section>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          最終更新日: 2025年1月
        </p>
      </motion.div>
    </div>
  );
}
