---
sidebar_position: 4
---

# レッスン 4: テスト対象にアクセスする

前のレッスンで起動したローカルアプリ（`http://localhost:5173`）に Playwrightからアクセスして見ましょう。

## 手順

`tests/example.spec.ts` を開き、次の行を探します。

```typescript
await page.goto('https://playwright.dev/');
```

これをローカルアプリの URL に変更します。

```typescript
await page.goto('http://localhost:5173');
```

サーバーが起動している状態でテストを実行し、期待どおりにページにアクセスできるか確認してください。

:::note[ページ読み込みの待機について]
ページが重かったり、クライアント側で初期化が走る場合、早く次のステップに進んでしまい失敗することがあります。`page.goto` に `waitUntil` を渡して待機挙動を調整できます。

```typescript
await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
```

注意点: 多くの場合は特定の要素が表示されることをアサーションで待つ（例: `await page.waitForSelector('text=ログイン')`）方が、単にネットワークが静かになるのを待つより堅牢です。
:::
