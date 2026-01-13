import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Privacy() {
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
          <h1 className="text-2xl font-bold text-slate-900 mb-8">プライバシーポリシー</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-6">
              TechTime（以下「当社」）は、アクセス分析ダッシュボード（以下「本サービス」）における
              お客様の個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">1. 収集する情報</h2>
              <p className="text-slate-600 mb-3">当社は、本サービスの提供にあたり、以下の情報を収集します。</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>Googleアカウント情報（メールアドレス、表示名、プロフィール画像）</li>
                <li>Google Analytics 4のプロパティ情報およびアクセスデータ</li>
                <li>Google Search Consoleのサイト情報および検索パフォーマンスデータ</li>
                <li>お支払い情報（クレジットカード情報はStripe社が安全に管理し、当社は保持しません）</li>
                <li>本サービスの利用履歴</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">2. 情報の利用目的</h2>
              <p className="text-slate-600 mb-3">収集した情報は、以下の目的で利用します。</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>本サービスの提供・運営</li>
                <li>AI分析機能による改善提案の生成</li>
                <li>サブスクリプションの管理・課金処理</li>
                <li>お問い合わせへの対応</li>
                <li>サービス改善のための分析</li>
                <li>重要なお知らせの送信</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">3. 第三者への情報提供</h2>
              <p className="text-slate-600 mb-3">
                当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>サービス提供に必要な業務委託先（以下参照）</li>
              </ul>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-slate-700 mb-2">利用している外部サービス:</p>
                <ul className="text-sm text-slate-600 space-y-1 ml-4">
                  <li>・Google（OAuth認証、Analytics API、Search Console API）</li>
                  <li>・Stripe（決済処理）</li>
                  <li>・AI分析サービス（分析データは匿名化して送信）</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">4. データの保管</h2>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>お客様のGA4/Search Consoleのデータは、お客様のGoogleアカウントに保存されています</li>
                <li>当社は分析のためにデータを一時的に処理しますが、長期保存は行いません</li>
                <li>サブスクリプション情報はStripe社のセキュアなサーバーで管理されます</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">5. セキュリティ</h2>
              <p className="text-slate-600">
                当社は、お客様の情報を保護するため、SSL/TLS暗号化通信、
                アクセス制御、定期的なセキュリティ監査など、
                適切なセキュリティ対策を講じています。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">6. Cookieの使用</h2>
              <p className="text-slate-600">
                本サービスでは、ログイン状態の維持やサービス改善のためにCookieを使用しています。
                ブラウザの設定でCookieを無効にすることも可能ですが、
                一部の機能が利用できなくなる場合があります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">7. お客様の権利</h2>
              <p className="text-slate-600 mb-3">お客様は、以下の権利を有します。</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>個人情報の開示・訂正・削除の請求</li>
                <li>Googleアカウントとの連携解除</li>
                <li>サービスの利用停止</li>
              </ul>
              <p className="text-slate-600 mt-3">
                これらのご請求は、下記お問い合わせ先までご連絡ください。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">8. プライバシーポリシーの変更</h2>
              <p className="text-slate-600">
                当社は、必要に応じて本プライバシーポリシーを変更することがあります。
                重要な変更がある場合は、本サービス上でお知らせします。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">9. お問い合わせ</h2>
              <p className="text-slate-600">
                本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。
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
