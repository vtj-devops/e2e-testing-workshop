---
sidebar_position: 6
---

# テスト用Webアプリの起動

このページでは、リポジトリ内の `web/` にあるテスト用のシンプルな静的 Web アプリをローカルで立ち上げる最短手順を示します。

## 前提
- Node.js 14 以上を推奨（実行環境の確認）:

```bash
node -v
```

## 起動手順（推奨）
1. `web/` ディレクトリに移動します。

```bash
cd web
```

2. 依存関係をインストールします（`package.json` は最小の設定ですが、慣例として実行します）。

```bash
npm install
```

3. サーバを起動します（デフォルトはポート 5173）。

```bash
npm start
# ログに "Server running at http://localhost:5173" が出力されます
```

4. ブラウザで http://localhost:5173 を開き、動作を確認してください。
