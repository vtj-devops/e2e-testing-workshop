import { test, expect } from '@playwright/test';

test.describe('example test suite', () => {
  // レッスン6の内容 start
  // test.use({ storageState: 'storage/admin.json' });
  // レッスン6の内容 end

  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // レッスン4の内容 start
    // await page.goto('http://localhost:5173/');
    // レッスン4の内容 end

    // レッスン5の内容 start
    // await page.fill('[data-testid="username-input"]', 'admin');
    // await page.fill('[data-testid="password-input"]', 'password');
    // await page.click('[data-testid="login-button"]');
    // レッスン5の内容 end

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  // // 意図的に失敗させるテスト（ワークショップ用）
  // test('intentional failure', async () => {
  //   // 期待値をわざと間違えてテストを失敗させる
  //   expect(1 + 1).toBe(3);
  // });
});
