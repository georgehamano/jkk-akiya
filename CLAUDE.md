@AGENTS.md

# JKK空き家速報 Webサイト

`jkk-akiya.com` のフロントエンド。Next.js (App Router) + TypeScript + Tailwind CSS v4。
Vercel にホストし、GitHub の main ブランチへの push で自動デプロイされる。

## 主要ディレクトリ

```
src/
  app/                  ページ・レイアウト・API Routes
    guide/[slug]/       ガイド記事（MDXから自動生成）
    simulator/          費用シミュレーターページ
    api/line-webhook/   LINE Messaging API webhook
  components/
    layout/             Header など共通レイアウト
    vacancy/            VacancyDashboard・PropertyCard
    cta/                LineCTABanner（inline / footer の2variant）
  content/guide/        ガイド記事のMDXファイル置き場
  lib/
    mdx.ts              MDXファイルの読み込み・一覧取得
    fetchVacancies.ts   空き家データ取得（GitHub Raw URL）
    userPrefs.ts        user_prefs.json の読み書き
    areas.ts            通知対象エリア（23区 + 多摩26市）
```

## ガイド記事の追加方法

`src/content/guide/` に MDX ファイルを置くだけで自動的にページが生成される。

```
---
title: "記事タイトル"
description: "説明文（SEOのmeta descriptionに使われる）"
date: "YYYY-MM-DD"
---

本文...
```

- スラッグ = ファイル名（拡張子なし）
- 記事ページの上下には `LineCTABanner` が自動挿入される

### テーブル（重要）

比較表などは**必ず GFM のテーブル記法**で書く。1行に潰さず、ヘッダー行・区切り行（`|---|`）・各データ行を**それぞれ改行**して記述し、**テーブルの前後に空行**を入れること。

```
| 項目  | JKK | 民間賃貸 |
|------|-----|---------|
| 更新料 | 0円  | 家賃1ヶ月分 |
```

- 列幅はスペースで揃えて書く（ソース可読性のため。レンダリングには影響しない）
- GFMテーブルの描画は `src/app/guide/[slug]/page.tsx` の `MDXRemote` に渡す `remarkPlugins: [remarkGfm]` で有効化している。**この設定を外すとテーブルがパイプ区切りの生テキストとして潰れて表示される**ため削除しないこと
- セルを `|` 区切りで1行に並べただけの記述や、区切り行を省いた記述はテーブルにならない

## デザインシステム

| 用途         | 値              |
|------------|----------------|
| メインカラー     | `#1A1A1A`      |
| 背景         | `#F8F9FA`      |
| セカンダリ      | `#6C757D`      |
| CTA（LINE）  | `#06C755`      |
| 見出しフォント    | Manrope        |
| 本文フォント     | Inter          |

セクション境界は border ではなく背景色の変化で表現する。

## データフロー

```
jkk_line_notify.py（JKKリポジトリ）
  └── vacancies.json を生成 → jkk-akiya-data リポジトリに push
        └── fetchVacancies.ts がfetchして表示（5分ごとにポーリング）
```

## LINE webhook

エンドポイント: `POST /api/line-webhook`

- follow/unfollow → `user_prefs.json`（jkk-akiya-monitor リポジトリ）を GitHub API 経由で更新
- 認識可能なエリアは `src/lib/areas.ts` で定義（23区 + 多摩26市）

### 認識するメッセージ

| 入力                          | 動作                                                  |
|-----------------------------|------------------------------------------------------|
| `地域指定` / `エリア設定` / `メニュー`  | 使い方 + 全エリア一覧を返信（リッチメニューから呼び出す想定） |
| `確認`                        | 現在の設定を表示                                          |
| `全エリア` / `リセット`            | 地域フィルター解除                                         |
| `港区` `世田谷区 江東区` など        | 区切り文字（`、` `,` スペース・全角スペース）で複数指定可。同じ区を再送で解除 |

### リッチメニュー設定

LINE Official Account Manager で「リッチメニュー」を作成し、ボタンのアクションを **「テキスト送信: 地域指定」** に設定する。
ユーザーがメニューをタップすると webhook が `地域指定` を受け取り、使い方ガイドを自動返信する。

## 環境変数（Vercel）

| 変数名                        | 用途                          |
|----------------------------|------------------------------|
| `LINE_CHANNEL_SECRET`      | webhook 署名検証                 |
| `LINE_CHANNEL_ACCESS_TOKEN`| LINE 返信用トークン                 |
| `GITHUB_PREFS_PAT`         | jkk-akiya-monitor への書き込み権限   |
| `NEXT_PUBLIC_VACANCIES_URL`| データJSON URL（未設定時はデフォルト使用）  |
| `ADMIN_PASSWORD`           | `/admin/*` の Basic Auth パスワード（ユーザー名は任意） |
