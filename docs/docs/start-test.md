---
sidebar_position: 7
---

# Playwrightコマンドの基本操作

このページでは、Playwright の基本的なコマンド操作をまとめます。

## よく使うコマンド一覧

### テストの実行（デフォルト）

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

Playwright Test の UI モードを起動します。テストの選択、実行、デバッグが可能です。

```bash
npx playwright test --ui
```
