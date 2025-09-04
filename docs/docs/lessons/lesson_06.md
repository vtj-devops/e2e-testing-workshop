---
sidebar_position: 6
---

# レッスン 6: 複数アカウントを管理する

このレッスンでは、複数アカウント（例: 管理者と一般ユーザー）を扱う方法をまとめます。主に Playwright の storageState を使って認証状態を保存・再利用する手順を示します。

## 概要

認証状態の保存、保存した状態を用いたテスト、describe レベルでの認証注入、複数コンテキストの並列実行、CI 運用上の注意点を扱います。

## 準備: 保存ディレクトリの作成

認証状態を保存するためにプロジェクトルートに `storage/` ディレクトリを作成します。

```bash
mkdir -p storage
```

## 認証状態を保存する（管理者アカウントの例）

管理者でログインして storageState を保存するテストを作成します。以下はサンプルです。

```typescript
// tests/save-storage-state-admin.spec.ts
import { test } from '@playwright/test';

test('save admin storage state', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('http://localhost:5173');
	await page.fill('[data-testid="username-input"]', 'admin');
	await page.fill('[data-testid="password-input"]', 'password');
	await page.click('[data-testid="login-button"]');
	await context.storageState({ path: 'storage/admin.json' });
	await context.close();
});
```

テストを実行して `storage/admin.json` が生成されていることを確認してください。同様に一般ユーザー用に `storage/user.json` を作成します。

```bash
npx playwright test tests/save-storage-state-admin.spec.ts
```

## 保存した storageState をテストで利用する

保存した `storage/admin.json` を読み込んでテストを実行するサンプルです。

```typescript
import { test, expect } from '@playwright/test';

test('admin can see admin panel', async ({ browser }) => {
	const adminContext = await browser.newContext({ storageState: 'storage/admin.json' });
	const page = await adminContext.newPage();
	await page.goto('http://localhost:5173/admin');
	await expect(page.locator('text=管理者用ダッシュボード')).toBeVisible();
	await adminContext.close();
});
```

## describe 単位で認証状態を注入する

同じ認証状態を複数テストで使いたい場合は、`test.use` を describe ブロック内で設定します。これにより各テストで再ログインする必要がなくなります。

```typescript
import { test } from '@playwright/test';

test.describe('as admin', () => {
	test.use({ storageState: 'storage/admin.json' });

	test('admin dashboard works', async ({ page }) => {
		await page.goto('http://localhost:5173/admin');
		// 検証コード
	});

	test('admin settings works', async ({ page }) => {
		await page.goto('http://localhost:5173/admin/settings');
		// 検証コード
	});
});
```

## CI と運用上の注意

- `storage/*.json` は認証情報を含む可能性があるため、公開リポジトリにコミットしないでください。
- CI では、`storage` ファイルをシークレットやアーティファクトで渡すか、ワークフロー内でテスト開始前に再生成する方法を検討してください。
- 有効期限のあるセッションを使う場合は、テストの前に有効性を検証し、必要なら再ログインするフローを用意してください。
