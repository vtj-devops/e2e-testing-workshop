---
sidebar_position: 5
---

# レッスン 5: フォームに値を入力してログインする

テストで実際にログイン操作を行い、アプリケーションが期待通りに動作するかを確認します。

## 手順

1. `tests/example.spec.ts` で先に設定した `page.goto('http://localhost:5173')` の下に、フォーム操作を追加します。

```typescript
// username と password を入力してログインボタンを押す
await page.fill('[data-testid="username-input"]', 'username');
await page.fill('[data-testid="password-input"]', 'password');
await page.click('[data-testid="login-button"]');
```

2. アプリの挙動に合わせてログイン後のページ遷移や表示要素を検証するアサーションを追加するとより確実です。例:

```typescript
await expect(page.locator('text=ようこそ')).toBeVisible();
```

3. サーバーを起動した状態でテストを実行します。

```bash
npx playwright test
```

![](img/009.png)

## 補足
- `data-testid` はテスト向けの識別子です。実装上の変更で壊れにくくするために便利です。
- 入力やクリックの前に `await page.waitForSelector('[data-testid="username"]')` のように要素の存在を待つと安定します。

## テスト用セレクタ一覧

ワークショップで使用する安定したセレクタをまとめます。テスト側ではこれらの `data-testid` を使って操作してください。

- `data-testid="username-input"` — ログインフォームのユーザー名入力
- `data-testid="password-input"` — ログインフォームのパスワード入力
- `data-testid="login-button"` — ログイン送信ボタン
- `data-testid="toggle-secret"` — ダッシュボードの秘密表示トグル
- `data-testid="logout-button"` — ログアウトボタン
- `data-testid="toggle-user-list"` — 管理者のユーザー一覧トグル（管理者のみ表示されます）

フォーム要素やボタンの待ち合わせには、次のように `waitForSelector` を使うと安定します:

```typescript
await page.waitForSelector('[data-testid="username-input"]');
```
