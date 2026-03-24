# 実装タスク

## 現状メモ
- `src/libs/microcms.ts`: Albums 型・getAlbums 関数は実装済み。News / Submissions 型・API 関数は未実装
- `src/layouts/Layout.astro`: ナビゲーションバー・スロットなし（要リファクタリング）
- `src/pages/index.astro`: アルバム一覧を仮実装（ナビなし、ページ構成が不完全）
- `src/pages/music/`, `submissions.astro`, `contact.astro` は未作成

---

## タスク一覧

### 1. microCMS 型・API 関数の追加 (`src/libs/microcms.ts`)
- [x] `News` 型を定義する（title, date, etc.）
- [x] `Submissions` 型を定義する（title, body のリッチテキスト）
- [x] `getNewsList()` 関数を実装する（新しい順）
- [x] `getMusicList()` 関数を実装する（= getAlbums をリネーム）
- [x] `getMusicByTitle(title: string)` 関数を実装する（タイトルで絞り込み）
- [x] `getSubmissionsList()` 関数を実装する

### 2. レイアウト・ナビゲーションバーの整備 (`src/layouts/Layout.astro`)
- [x] `<slot />` を `<main>` でラップしてナビの下に表示
- [x] ナビゲーションバーを `NavBar` コンポーネント (`src/components/NavBar.astro`) として実装
  - 左側: Home / Music / Submissions / Contact のリンク
  - 中央: `src/assets/icon.jpg` のアイコン画像
- [x] モバイル向けハンバーガーメニューを実装する（`md:` 以下で切り替え）
- [x] `<title>` を props で動的にする

### 3. Home ページ (`src/pages/index.astro`)
- [x] ヘッダー: `src/assets/bandcamp_header.png` を全幅ヒーロー画像として表示
- [x] ニュースセクション: `getNewsList()` で取得し `YYYY.MM.DD: イベント名` 形式で表示

### 4. Music 一覧ページ (`src/pages/music/index.astro`)
- [x] ページファイルを新規作成
- [x] `getMusicList()` でアルバム一覧を取得
- [x] グリッドレイアウトで表示（PC: 4列, タブレット: 2列, スマホ: 1列）
- [x] 各カード: サムネイル画像・タイトルのみ表示
- [x] カードクリックで `/music/:title` へ遷移

### 5. Music 詳細ページ (`src/pages/music/[title].astro`)
- [ ] ページファイルを新規作成
- [ ] `getStaticPaths` + `getMusicByTitle()` で静的生成
- [ ] サムネイル画像・タイトルを表示
- [ ] トラックリストをテーブルまたはリスト形式で表示
  - トラック番号・アーティスト名（リンク付き）・曲名

### 6. Submissions ページ (`src/pages/submissions.astro`)
- [ ] ページファイルを新規作成
- [ ] `getSubmissionsList()` で取得し、リッチテキストを縦に並べて表示

### 7. Contact ページ (`src/pages/contact.astro`)
- [ ] ページファイルを新規作成
- [ ] レーベルアイコン (`src/assets/icon.jpg`) を表示
- [ ] SNS リンクをアイコン付きで表示（`target="_blank" rel="noopener noreferrer"` 付与）
- [ ] メールアドレスを表示

### 8. 仕上げ・チェック
- [ ] 全ページで `npm run check` がエラーなし
- [ ] `npm run build` がエラーなし
- [ ] グラデーション・シャドウが使用されていないことを確認
- [ ] スペーシングが 8px の倍数に統一されていることを確認
- [ ] 全画像に `alt` 属性が設定されていることを確認
- [ ] 外部リンクに `target="_blank" rel="noopener noreferrer"` が付与されていることを確認
- [ ] モバイル・タブレット・PC での表示確認
