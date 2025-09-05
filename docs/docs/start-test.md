---
sidebar_position: 7
---

# Playwrightコマンドの基本操作

Playwrightコマンドを使って、様々な操作を行うことができます。このページでは、基本的なコマンドの使い方を説明します。

## よく使うコマンド一覧

### テストの実行

このコマンドで、`tests/` フォルダ内のすべてのテストが実行されます。

```bash
npx playwright test
```

### 特定ファイルのテスト実行

このコマンドで、特定のテストファイルのみを実行できます。

```bash
npx playwright test tests/example.spec.ts
```

### UIモードでの実行

Playwright Test の UI モードを起動します。テストの選択、実行、デバッグが可能です。後のレッスンでも使用します。

```bash
npx playwright test --ui
```

ここに記載しているコマンド以外にも、様々なオプションがあります。詳細は公式ドキュメントを参照してください。
