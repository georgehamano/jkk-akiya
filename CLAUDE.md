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
- テーブルは列幅をスペースで揃えて書く（ソース可読性のため）

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
- メッセージ → 地域フィルター設定のトグル

## 環境変数（Vercel）

| 変数名                        | 用途                          |
|----------------------------|------------------------------|
| `LINE_CHANNEL_SECRET`      | webhook 署名検証                 |
| `LINE_CHANNEL_ACCESS_TOKEN`| LINE 返信用トークン                 |
| `GITHUB_PREFS_PAT`         | jkk-akiya-monitor への書き込み権限   |
| `NEXT_PUBLIC_VACANCIES_URL`| データJSON URL（未設定時はデフォルト使用）  |
