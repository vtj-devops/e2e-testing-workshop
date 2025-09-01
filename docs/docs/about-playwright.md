---
sidebar_position: 3
---

# Playwrightとは？

Playwrightは、Microsoftが開発しているエンドツーエンド（E2E）テスト用の自動化ライブラリです。モダンなブラウザ（Chromium、WebKit、Firefox）を直接操作して、実際のユーザー操作に近い形でWebアプリを検証できます。高速で信頼性が高く、ヘッドレス・ヘッドフルの両方で動作し、豊富なデバッグツールやCI向けの機能を備えています。

## 特長

- マルチブラウザ対応: Chromium, WebKit, Firefox をサポート
- 高信頼性: ネイティブなブラウザAPIに近い実装でフレークを減らす設計
- マルチ言語サポート: JavaScript/TypeScript、Python、C#、Java
- 組み込みのテストランナー: `@playwright/test`（テスト実行、並列実行、リトライ、フィクスチャ）
- 強力なデバッグ機能: トレース、ビデオ記録、スクリーンショット、インタラクティブなコードジェネレータ
- CIフレンドリー: 標準的なCI環境で容易に実行・レポート生成が可能

## サポートするブラウザと実行環境

- Chromium（Chrome / Edge系）
- WebKit（Safari互換）
- Firefox
- ヘッドレス／ヘッドフル両対応、モバイルエミュレーション、ネイティブのネットワーク制御やデバイス・位置情報・認証のモックも可能

## 利用可能な言語

- JavaScript / TypeScript（公式に最も充実）
- Python
- C#
- Java

（このリポジトリでは `playwright.config.ts` が存在するため、TypeScript / `@playwright/test` を想定したワークフローが既に用意されています。）

## いつ使うべきか

- ユーザー操作を伴う統合テストや回帰テスト
- ブラウザ間の表示差や機能差を検証したいとき
- UIの自動化をCIに組み込み、リリース前に自動検証したいとき
 
## 参考リンク（公式）

- Playwright 公式サイト: https://playwright.dev/
- Playwright GitHub リポジトリ: https://github.com/microsoft/playwright

## 次のステップ

このリポジトリに含まれる `playwright.config.ts` を確認し、`tests/` ディレクトリ内のサンプルテストを実行して Playwright の基本的な使い方を試してみてください。より詳しいチュートリアルや例は他のドキュメントや `tests/` フォルダ内のファイルを参照してください。
