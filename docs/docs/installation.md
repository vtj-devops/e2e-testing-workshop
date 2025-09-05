---
sidebar_position: 5
---

# インストール

## Node.js のインストール

このワークショップでは Node.js が必要ですが、このワークショップでは詳しい手順を説明しません。以下の公式サイトを参考にしてインストールしてください。当日、担当者がサポートしますので、分からない場合は遠慮なく質問してください。

- Node.js 公式（Windows/macOS/Linux のインストーラとドキュメント）: https://nodejs.org/
- Homebrew（macOS 向けパッケージ管理）: https://brew.sh/

:::note
Node.jsのバージョンは、LTS（Long Term Support）版を推奨しています。
:::

## インストール確認

次のコマンドを実行して、Node.js、npm、npxが正しくインストールされているか確認します。

```bash
node -v
npm -v
npx --version
```

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
