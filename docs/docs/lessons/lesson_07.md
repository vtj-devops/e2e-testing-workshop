---
sidebar_position: 7
---

# レッスン 7: CIでPlaywrightテストを自動実行する

このレッスンでは、GitHub Actionsを使ってPlaywrightテストをCI上で実行する手順を説明します。

自動テストを手元で実行するだけでなく、プルリクエストごとにテストが走るように設定することで、品質を保ちながら開発を進められます。

## 構成概要

追加したワークフロー: `.github/workflows/playwright.yml`

- リポジトリをチェックアウト
- Node.js をセットアップ（Node 22）
- ルートと `web/` の依存をインストール
- Playwright のブラウザをインストール
- `web/` を起動して `http://localhost:5173` を待機
- Playwright テストを実行
- `playwright-report` をアーティファクトとしてアップロード

## ローカルでの事前確認

CIで問題を減らすため、まずローカルで以下を実行しておきます。

```bash
# ルートで依存をインストール
npm ci

# web ディレクトリの依存をインストール
npm ci --prefix web

# Playwright のブラウザをインストール
npx playwright install

# web サーバを起動（別ターミナル）
cd web
npm start
```

別ターミナルでテストを実行:

```bash
npx playwright test
```

テストが通ること、`playwright-report` ディレクトリが生成されることを確認してください。

## GitHub Actions の実行結果の確認

1. PR を作成または main に push するとワークフローが走ります。
2. Actions タブでワークフローを選び、ログを確認してください。
3. 実行後、ワークフローの「Artifacts」から `playwright-report` をダウンロードして HTML レポートをブラウザで開けます。

## よくあるトラブルと対処

- web サーバが起動しない/ポートが違う:
  - `web/package.json` の start スクリプトが `5173` を使っていることを確認。CI で異なるポートを使うなら `wait-on` の URL を更新してください。
- Playwright のブラウザがインストールされない:
  - `npx playwright install --with-deps` を使うとライブラリ依存もインストールします（CI向け）。
- タイムアウトで待てない:
  - `wait-on` のタイムアウトを伸ばすか、サーバログを見て起動に失敗していないか確認してください。

## ワークフロー定義（抜粋）

以下は `.github/workflows/playwright.yml` の主要部分です。CIで何が動いているかを理解するために、そのまま掲載しています。

```yaml
name: Playwright tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install root dependencies
        run: npm ci

      - name: Install web dependencies
        run: npm ci --prefix web

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Start web server
        run: npm start --prefix web &

      - name: Wait for web server
        run: npx wait-on http://localhost:5173 --timeout 60000

      - name: Run Playwright tests
        run: npx playwright test --reporter=list

      - name: Upload Playwright HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
```

### ワークフローステップの解説

- Checkout repository: リポジトリのソースをチェックアウトします。CI はここからビルドやテストを実行します。
- Setup Node.js: 指定した Node バージョンを用意します。ここでは Node 22 を使うように設定しています。
- Install root/web dependencies: ルートと `web/` の依存をそれぞれ `npm ci` でインストールします。CI では `ci` を使うと determinisitic なインストールになります。
- Install Playwright browsers: Playwright が必要とするブラウザバイナリをインストールします（`--with-deps` は OS 依存のライブラリもインストールします）。
- Start web server: `web/` の start スクリプトでローカルサーバを起動します。末尾に `&` をつけることでバックグラウンド実行します。
- Wait for web server: `wait-on` で指定 URL が応答するまで待ちます。タイムアウトはこの例で 60 秒です。
- Run Playwright tests: Playwright のテストを実行します。`--reporter=list` はログを簡潔にします。
- Upload Playwright HTML report: 実行結果を `playwright-report` ディレクトリとしてアーティファクトに格納します。`if: always()` によりテスト失敗時でもレポートがアップロードされます。
