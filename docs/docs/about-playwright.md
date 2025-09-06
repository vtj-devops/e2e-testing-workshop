---
sidebar_position: 3
---

# Playwrightとは？

Playwrightは、Microsoftが開発しているエンドツーエンド（E2E）テスト用の自動化ライブラリです。モダンなブラウザ（Chromium、WebKit、Firefox）を直接操作して、実際のユーザー操作に近い形でWebアプリを検証できます。高速で信頼性が高く、ヘッドレス・ヘッドフルの両方で動作し、豊富なデバッグツールやCI向けの機能を備えています。

:::note[生成AIでの活用について]
最近では、MCP(Model Context Protocol)の登場により、GitHub Copilotなどの生成AIツールからPlaywrightを利用して、画面操作や情報取得を行う手法にも関心が集まっています。
:::

## 特長

- マルチブラウザ対応: Chromium, WebKit, Firefox をサポート
- 高信頼性: ネイティブなブラウザAPIに近い実装でフレークを減らす設計
- マルチ言語サポート: JavaScript/TypeScript、Python、C#、Java
- 組み込みのテストランナー: `@playwright/test`（テスト実行、並列実行、リトライ、フィクスチャ）
- 強力なデバッグ機能: トレース、ビデオ記録、スクリーンショット、インタラクティブなコードジェネレータ
- CIフレンドリー: 標準的なCI環境で容易に実行・レポート生成が可能
 
## 参考

- Playwright 公式サイト: https://playwright.dev/
- Playwright GitHub リポジトリ: https://github.com/microsoft/playwright
