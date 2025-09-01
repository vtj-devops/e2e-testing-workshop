---
sidebar_position: 5
---

# インストール

## Node.js のインストール

このワークショップでは Node.js が必要です。詳細なインストール手順やプラットフォーム別の注意点は公式ドキュメントを参照してください。以下は参照先の例です。


- Node.js 公式（Windows/macOS/Linux のインストーラとドキュメント）: https://nodejs.org/
- Homebrew（macOS 向けパッケージ管理）: https://brew.sh/

補足: プロジェクトでバージョン指定がある場合はそのバージョンに合わせてください。複数バージョンを扱う場合は、適切なバージョン管理ツールを利用してください。

## インストール確認

インストール後にバージョンと動作確認を行います。

```bash
node -v
npm -v
npx --version
```

期待される結果: `node -v` が vXX.X.X 形式で、`npm` と `npx` もバージョンを返すこと。

:::tip
既にNode.jsがインストールされているか分からない場合は、以下のコマンドで確認できます。

■ Windows (PowerShell):
```powershell
Get-Command node
```

■ macOS/Linux (ターミナル):
```bash
which node
```

もしインストールされていない場合は、上記の手順に従ってインストールしてください。
:::
