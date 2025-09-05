---
sidebar_position: 6
---

# レッスン 6: 複数アカウントを管理する

このレッスンでは、他のテストシナリオでも使えるように、認証状態を保存・再利用する方法を学びます。

## 準備: ディレクトリの作成

認証状態を保存するためにプロジェクトルートに `storage/` ディレクトリを作成します。

```bash
mkdir -p storage
```

## 認証状態を保存する（管理者アカウントの例）

管理者でログインして storageState を保存するテストを作成します。

新しく `tests/save-storage-state-admin.spec.ts` を作成し、以下のコードを追加します。

```typescript
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

作成が完了したらLesson5で追加したログインコードをコメントアウトしておきます。

```typescript
// await page.fill('[data-testid="username-input"]', 'admin');
// await page.fill('[data-testid="password-input"]', 'password');
// await page.click('[data-testid="login-button"]');
```

次のコマンドを実行して、ファイルを生成します。

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
