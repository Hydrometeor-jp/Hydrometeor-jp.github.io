# 音楽レーベル LP 開発 AI 指示書

## プロジェクト概要

音楽レーベルのランディングページ（LP）を開発するプロジェクト。
Astro + microCMS + TypeScript + Tailwind CSS を用いたシンプルかつ洗練されたデザインのウェブサイトを構築する。

---

## 技術スタック

| 種別           | ライブラリ / ツール |
| -------------- | ------------------- |
| フレームワーク | Astro               |
| CMS            | microCMS            |
| 言語           | TypeScript          |
| スタイリング   | Tailwind CSS        |

---

## コマンド

```bash
npm run build   # プロダクションビルド
npm run check   # リント & フォーマット（実行後にエラーがないことを確認）
```

> **注意**: コードを変更したら必ず `npm run check` を実行し、型エラー・リントエラーがないことを確認すること。

---

## ディレクトリ構成

```
src/
├── components/       # 共通コンポーネント
├── layouts/          # レイアウトコンポーネント
├── pages/            # ページコンポーネント（ルーティング）
│   ├── index.astro          # Home
│   ├── music/
│   │   ├── index.astro      # Music 一覧
│   │   └── [title].astro    # Music 詳細
│   ├── submissions.astro    # Submissions
│   └── contact.astro        # Contact
├── libs/
│   └── microcms.ts   # microCMS 関連の実装をすべてここにまとめる
└── styles/           # グローバルスタイル（必要な場合）
```

---

## デザイン原則

### 全体方針

- **シンプル・クリーン**: 余白を大切にした洗練されたデザイン
- **グラデーション禁止**: `gradient` クラスは使用しない
- **シャドウ禁止**: `shadow` クラスは使用しない
- **レスポンシブ対応**: モバイルファーストで設計する

### スペーシング

Tailwind のデザイントークンを使用し、**8の倍数px** を基準とする。

| Tailwind クラス | px 値 |
| --------------- | ----- |
| `p-2`, `m-2`    | 8px   |
| `p-4`, `m-4`    | 16px  |
| `p-6`, `m-6`    | 24px  |
| `p-8`, `m-8`    | 32px  |
| `p-12`, `m-12`  | 48px  |
| `p-16`, `m-16`  | 64px  |

> `p-3`（12px）や `p-5`（20px）など 8 の倍数でない値は使用しない。

### ナビゲーションバー

- **左側**: 各ページへのナビゲーションリンク（Home / Music / Submissions / Contact）
- **中央**: レーベルのアイコン画像
- 全ページ共通のレイアウトコンポーネントに含める
- モバイルではハンバーガーメニューなど適切なレスポンシブ対応を行う

---

## ページ仕様

### Home `/`

- **ヘッダー画像**: 全幅のヒーローイメージ
- **ニュースセクション**:
  - microCMS から取得
  - 表示形式: `YYYY.MM.DD: イベント名`
  - 新しい順に表示

### Music `/music`

- アルバム・EP の一覧をグリッド表示
- グリッド列数:
  - PC（lg以上）: 4列
  - タブレット（md）: 2列
  - スマホ（sm以下）: 1列
- 各カード表示内容: サムネイル画像・タイトル
- カードクリックで詳細ページ `/music/:title` へ遷移

### Music 詳細 `/music/:title`

- サムネイル画像
- タイトル
- トラックリスト（テーブルまたはリスト形式）:
  - トラック番号
  - アーティスト名
  - 曲名

### Submissions `/submissions`

- コンピレーション楽曲の募集ページ
- microCMS のリッチテキストフィールドで本文を管理
- 複数件ある場合は、縦に並べて表示

### Contact `/contact`

- レーベルアイコンを表示
- 各 SNS のリンクをアイコン付きで表示
- メールアドレスを表示
- リンクは `target="_blank" rel="noopener noreferrer"` を付与

---

## microCMS 実装仕様

### ファイル: `src/libs/microcms.ts`

microCMS に関わるすべての処理（クライアント初期化・型定義・API 呼び出し関数）をこのファイルに集約する。

### 型定義 (例)

```typescript
// カスタムフィールド: アーティストリンク
// https://hydrometeor.microcms.io/apis/albums/custom-fields/artistLink
export type ArtistLink = {
  name: string
  url?: string
}

// カスタムフィールド: トラック
// https://hydrometeor.microcms.io/apis/albums/custom-fields/track
export type Track = {
  title: string
  artistLinks: ArtistLink[]
}

// API: アルバム情報
// https://hydrometeor.microcms.io/apis/albums
export type Albums = {
  title: string
  releaseDate: MicroCMSDate
  thumbnail: MicroCMSImage
  trackList?: Track[]
} & MicroCMSListContent
```

### API 関数例

```typescript
// ニュース一覧取得
export const getNewsList = async (): Promise<News[]>

// 音楽一覧取得
export const getMusicList = async (): Promise<Music[]>

// 音楽詳細取得（タイトルで検索）
export const getMusicByTitle = async (title: string): Promise<Music | null>
```

## コーディング規約

### 全般

- TypeScript の型安全を保つ。`any` の使用は禁止。
- コンポーネントは単一責任の原則に従い、適切に分割する。
- マジックナンバー・マジック文字列は定数化する。

### Astro

- データフェッチは `.astro` ファイルのフロントマター（`---` 内）で行う。
- クライアントサイド JS が不要なコンポーネントには `client:*` ディレクティブを付与しない。
- `getStaticPaths` を使用した静的生成を優先する。

### Tailwind CSS

- インラインスタイル（`style` 属性）は使用しない。Tailwind クラスで完結させる。
- レスポンシブプレフィックス: `sm:` / `md:` / `lg:` / `xl:`
- ダークモードが必要な場合は `dark:` プレフィックスを使用。

### 画像

- microCMS の画像 URL には `?w=800&fm=webp` などのパラメータを付与して最適化する。
- `<img>` タグには必ず `alt` 属性を設定する。
- Astro の `<Image>` コンポーネントを優先的に使用する。

---

## 禁止事項

- `gradient`・`shadow` 系の Tailwind クラスを使用しない
- 8 の倍数でないスペーシング値を使用しない（例: `p-3`, `p-5`, `mt-7` など）
- microCMS 関連のコードを `src/libs/microcms.ts` 以外に記述しない
- `any` 型の使用
- インラインスタイルの使用

---

## 実装チェックリスト

実装完了時に以下を確認すること。

- [ ] `npm run check` がエラーなしで完了する
- [ ] `npm run build` がエラーなしで完了する
- [ ] 全ページがモバイル・タブレット・PC で正しく表示される
- [ ] microCMS の型がすべて `src/libs/microcms.ts` に定義されている
- [ ] ナビゲーションバーが全ページに表示されている
- [ ] グラデーション・シャドウが使用されていない
- [ ] スペーシングが 8px の倍数に統一されている
- [ ] 画像に `alt` 属性が設定されている
- [ ] 外部リンクに `target="_blank" rel="noopener noreferrer"` が付与されている
