---
sidebar_position: 6
---

# テスト用Webアプリの起動

このページでは、リポジトリ内の `web/` にあるテスト用のシンプルな静的 Web アプリをローカルで立ち上げる最短手順を示します。

## 起動手順

`web/` ディレクトリに移動して、初回のみ依存関係をインストールします。

```bash
cd web
npm install
```

サーバを起動して、ブラウザで`http://localhost:5173`を開きます。

```bash
npm start
```
