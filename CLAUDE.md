# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

トヨタホームLPのコーディングプロジェクト。デザインPNG（PC版・SP版）から静的HTML/CSSを生成する。

## コマンド

```bash
# ローカルサーバー起動
npx serve .

# Puppeteerでスクリーンショット確認（SP版 375px）
# screenshots/sp-current.png に保存

# Puppeteerでスクリーンショット確認（PC版 1280px）
# screenshots/pc-current.png に保存
```

## 開発フロー

1. `design/sp.png` を分析してセクション構成を把握
2. SP版（モバイル）のHTML/CSSを実装
3. `design/pc.png` を参照してPC版のレスポンシブ対応を追加
4. Puppeteerでスクリーンショット撮影・デザインと比較・修正

## コーディング規約

- **CSS設計**: BEM記法（Block__Element--Modifier）
- **アプローチ**: モバイルファースト
- **ブレークポイント**: 768px（これ以上でPC表示）
- **単位**: フォントサイズはrem、余白・幅はpxまたは%
- **フォント**: Noto Sans JP（Google Fonts）
- **HTML**: セマンティクス準拠、適切なlandmark要素を使用

## CSS変数

```css
:root {
  --color-primary: #______;
  --color-secondary: #______;
  --color-text: #______;
  --color-text-light: #______;
  --color-bg: #______;
  --color-bg-gray: #______;
  --color-border: #______;
}
```

## 禁止事項

- インラインスタイル
- !important の乱用
- IDセレクタでのスタイリング
- JavaScriptの実装（静的HTML/CSSのみ）

## ディレクトリ構造

```
assets/
├── css/
│   └── style.css
├── js/
│   └── (JavaScript files)
└── img/
    ├── pc/    # PC用画像
    └── sp/    # SP用画像
```

## 画像

- 実際の素材がない場合: `https://placehold.co/幅x高さ`
- 素材は `assets/img/pc/` および `assets/img/sp/` に配置済み
