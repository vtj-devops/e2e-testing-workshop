# Simple React Login (E2E workshop)

このフォルダは、E2E テストワークショップ用の最小限の React ログインデモです。
ビルド手順は不要で、ブラウザで直接開いて動作確認できます（開発用CDNとBabelを使用）。

推奨の起動方法 (Node 統一):

1) Node が入っていることを確認してから `web` フォルダで開始します。

```bash
# web ディレクトリで実行
npm install --no-audit --no-fund
npm start
# ブラウザで http://localhost:5173 を開く
```

2) 他のオプション: `npx serve` などでも同様に配信できます。

ログイン情報（デモ）:
- ユーザー名: admin
- パスワード: password

目的:
- Playwright や他の E2E ツールのテスト対象として使える簡単なアプリです。

次のステップ案:
- Playwright 用のテストサンプルを `tests/` の下に追加します。
- 実際のバックエンドと連携する場合は API 認証フローに差し替えます。
