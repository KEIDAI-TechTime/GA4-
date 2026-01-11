# Notion データベース セットアップガイド

## 1. Notion Integration を作成

1. [Notion Integrations](https://www.notion.so/my-integrations) にアクセス
2. 「新しいインテグレーション」をクリック
3. 以下を設定:
   - 名前: `GA4 Dashboard`
   - ロゴ: 任意
   - 関連ワークスペース: 使用するワークスペースを選択
4. 「送信」をクリック
5. **Internal Integration Token** をコピー（`secret_xxx...`）→ `NOTION_API_KEY`

## 2. Users データベースを作成

Notion で新しいデータベースを作成し、以下のプロパティを追加:

| プロパティ名 | タイプ | 説明 |
|-------------|--------|------|
| Name | Title | ユーザー表示名 |
| Email | Email | メールアドレス（検索に使用） |
| PhotoURL | URL | プロフィール画像URL |
| SelectedPropertyId | Text | 選択したGA4プロパティID |
| SelectedIndustry | Select | 選択した業界 |
| CreatedAt | Date | 作成日時 |
| LastLoginAt | Date | 最終ログイン日時 |

### Select オプション（SelectedIndustry）

以下のオプションを追加:
- EC・小売
- メディア・ブログ
- BtoB・SaaS
- 飲食・店舗
- 不動産
- 医療・ヘルスケア
- 教育
- その他

### データベースIDの取得

1. データベースページを開く
2. URLから ID を取得:
   ```
   https://www.notion.so/your-workspace/YOUR_DATABASE_ID?v=xxx
                                        ^^^^^^^^^^^^^^^^
   ```
3. この ID を `NOTION_USERS_DATABASE_ID` に設定

## 3. Settings データベースを作成

同様に新しいデータベースを作成し、以下のプロパティを追加:

| プロパティ名 | タイプ | 説明 |
|-------------|--------|------|
| Name | Title | 設定名（自動生成） |
| UserId | Text | Firebase UID |
| EmailNotifications | Checkbox | メール通知 |
| WeeklyReport | Checkbox | 週次レポート |
| AlertThreshold | Number | アラートしきい値（%） |
| Language | Select | 言語設定 |

### Select オプション（Language）

- ja（日本語）
- en（English）

データベースIDを取得し `NOTION_SETTINGS_DATABASE_ID` に設定

## 4. Integration をデータベースに接続

**重要**: 各データベースで Integration を有効にする必要があります

1. Users データベースを開く
2. 右上の「...」→「コネクト」→「GA4 Dashboard」を追加
3. Settings データベースでも同様に設定

## 5. 環境変数を設定

### ローカル開発

`.env` ファイルを作成:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_USERS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_SETTINGS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Vercel デプロイ

Vercel ダッシュボードで環境変数を設定:

1. プロジェクト → Settings → Environment Variables
2. 上記3つの変数を追加

## 6. 動作確認

デプロイ後、以下を確認:
1. ログインするとUsersデータベースにレコードが追加される
2. プロパティを選択するとSelectedPropertyIdが更新される
3. 業界を選択するとSelectedIndustryが更新される

## トラブルシューティング

### 「Notion configuration missing」エラー
→ 環境変数が正しく設定されていません

### 「User not found」エラー
→ Integration がデータベースに接続されていません

### API レート制限
→ Notion API は 3リクエスト/秒 の制限があります。大量のユーザーがいる場合は注意
