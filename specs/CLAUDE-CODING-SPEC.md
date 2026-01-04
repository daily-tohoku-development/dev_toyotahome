# Claude Code コーディング指示書

IllustratorデザインデータからHTML/CSSを生成するための仕様書

---

## プロジェクト概要

- **目的**: デザインPNG（PC版・SP版）から静的HTML/CSSをコーディング
- **使用ツール**: Claude Code + Serena MCP + Puppeteer MCP
- **デザインデータ**: `design/pc.png`, `design/sp.png`

---

## フォルダ構成

```
project-root/
├── CLAUDE.md              # このファイル（プロジェクトルートに配置）
├── index.html
├── css/
│   └── style.css
├── assets/
│   ├── images/           # 写真・背景画像
│   └── icons/            # SVGアイコン・ロゴ
├── design/
│   ├── pc.png            # PCデザイン（幅1280px想定）
│   └── sp.png            # SPデザイン（幅375px想定）
└── screenshots/          # Puppeteer確認用（自動生成）
    ├── pc-current.png
    └── sp-current.png
```

---

## コーディング仕様

### HTML

- HTML5セマンティクス準拠
- 適切なlandmark要素を使用（header, main, footer, nav, section, article）
- 使用フォント
  - KoburinaGoStdN-W6(こぶりなゴシック W6)
  - RodinPro-M(ロダン Pro M)
  - こぶゴW6+DIN Me
  - デザインデータでは、上記フォントを利用しているが利用できるWebフォントがないのでパーツ単位で画像化してコーディングをすすめてください
- 画像にはalt属性を必ず設定
- 日本語ページ: `<html lang="ja">`

### CSS

- **設計手法**: BEM記法（Block__Element--Modifier）
- **アプローチ**: モバイルファースト
- **ブレークポイント**: 768px（これ以上でPC表示）
- **単位**: 
  - フォントサイズ: rem
  - 余白・幅: px または %
- **レイアウト**: Flexbox / CSS Grid を適宜使用

### フォント

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap');

body {
  font-family: 'Noto Sans JP', sans-serif;
}
```

### CSS変数（カラーパレット）

デザインから抽出したカラーを以下の形式で定義：

```css
:root {
  /* メインカラー */
  --color-primary: #______;
  --color-secondary: #______;
  
  /* テキストカラー */
  --color-text: #______;
  --color-text-light: #______;
  
  /* 背景カラー */
  --color-bg: #______;
  --color-bg-gray: #______;
  
  /* ボーダー */
  --color-border: #______;
}
```

### レスポンシブ設計

```css
/* モバイルファースト: デフォルトはSP */
.element {
  /* SP用スタイル */
}

/* PC用（768px以上） */
@media (min-width: 768px) {
  .element {
    /* PC用スタイル */
  }
}
```

---

## 作業フロー

### Phase 1: 準備・分析

```
1. Serenaでプロジェクト構造を確認
2. design/pc.png と design/sp.png を読み込み
3. 以下を分析（コードはまだ書かない）:
   - セクション構成
   - PC/SPの差分
   - カラーパレット
   - フォントサイズ・余白の推定値
```

### Phase 2: SP版コーディング

```
1. design/sp.png を参照
2. セクションごとに順番に実装:
   a. ヘッダー
   b. メインビジュアル（ヒーロー）
   c. コンテンツセクション（上から順に）
   d. フッター
3. 画像は一旦プレースホルダーで実装
```

### Phase 3: PC版レスポンシブ対応

```
1. design/pc.png を参照
2. 768px以上のメディアクエリ内にPC用スタイルを追加
3. 差分のみ記述（共通部分は書かない）
```

### Phase 4: Puppeteerで確認・修正

```
1. ローカルサーバーを起動: npx serve .
2. SP確認:
   - ビューポート幅375pxでスクリーンショット
   - screenshots/sp-current.png に保存
   - design/sp.png と比較
3. PC確認:
   - ビューポート幅1280pxでスクリーンショット
   - screenshots/pc-current.png に保存
   - design/pc.png と比較
4. 差異があれば修正 → 再度スクリーンショット → 比較
5. 一致するまで繰り返す
```

### Phase 5: 最終チェック

```
□ HTMLバリデーション
□ 未使用CSSの確認
□ 複数幅での表示確認（375px, 768px, 1024px, 1280px）
□ プレースホルダー画像のリストアップ
□ フォント読み込み確認
```

---

## Puppeteer コマンド

### スクリーンショット取得

```
# SP版（375px幅）
Puppeteerで http://localhost:3000 を開いて、
ビューポート幅375px、高さは全ページでスクリーンショットを撮って、
screenshots/sp-current.png として保存して

# PC版（1280px幅）
Puppeteerでビューポート幅1280pxに変更して、
スクリーンショットを撮って screenshots/pc-current.png として保存して
```

### 比較・修正

```
design/sp.png と screenshots/sp-current.png を比較して、
以下の観点で差異を報告して：
- レイアウト（配置、サイズ）
- 余白・間隔
- フォントサイズ
- カラー

差異があれば修正して、再度スクリーンショットで確認して
```

---

## 一括実行コマンド

全工程を一度に指示する場合：

```
以下のワークフローを実行して：

1. design/sp.png を分析してセクション構成を把握
2. SP版（モバイル）のHTML/CSSを実装
3. design/pc.png を参照してPC版のレスポンシブ対応を追加
4. npx serve . でローカルサーバーを起動
5. Puppeteerで以下のスクリーンショットを撮影:
   - 375px幅 → screenshots/sp-current.png
   - 1280px幅 → screenshots/pc-current.png
6. デザインPNGと比較して差異を報告
7. 差異があれば修正して再度スクリーンショット
8. デザインと一致するまで繰り返す（最大5回）
9. 完了したら成果物と残課題を報告
```

---

## 注意事項

### やること

- セマンティックなHTML構造を優先
- BEM記法でクラス名を命名
- モバイルファーストでCSS記述
- CSS変数でカラー・フォント管理
- Puppeteerで視覚的に確認しながら修正

### やらないこと

- インラインスタイルの使用
- !important の乱用
- IDセレクタでのスタイリング
- ベンダープレフィックスの手動追加（必要なら後でAutoprefixer）
- JavaScriptの実装（静的HTML/CSSのみ）

### 画像について

- 実際の画像アセットがない場合はプレースホルダーを使用
- プレースホルダー例: `https://placehold.co/幅x高さ`
- 後で差し替えられるようファイル名・パスをコメントで記録

---

## トラブルシューティング

### Puppeteerでスクショが撮れない

```
Puppeteerのブラウザを再起動して、
http://localhost:3000 にアクセスできるか確認して
```

### デザインと大きく異なる

```
design/sp.png をもう一度詳細に分析して、
特に以下の点を確認:
- 各セクションの高さ・余白
- フォントサイズのバランス
- 要素間のスペーシング
```

### レスポンシブが崩れる

```
768px付近でPuppeteerでスクショを撮って、
ブレークポイント前後の表示を確認して
```

---

## 成果物

完了時に以下を報告：

1. **ファイル一覧**: 作成したHTML/CSSファイル
2. **実装セクション**: 実装完了したセクションのリスト
3. **プレースホルダー**: 差し替えが必要な画像のリスト
4. **残課題**: 未実装・要調整の項目
5. **確認用スクリーンショット**: 最終状態のPC/SP画像
