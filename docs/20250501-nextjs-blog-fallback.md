---
title: "Next.jsでMarkdownブログを実装｜動的ルーティングとfallbackの理解"
date: "2025-05-01"
---

# 🇯🇵 Next.jsでMarkdownブログを実装｜動的ルーティングとfallbackの理解

今日は、Next.jsとTypeScriptを使って、Markdownファイルをベースにしたブログページの実装を進めました。動的ルーティングと`getStaticProps`, `getStaticPaths`の連携、`fallback: false`の使い方を学びました。

## ✅ 実装したこと

- `/posts/[id].tsx`の動的ルーティングページを作成
- `posts/`フォルダ内の`.md`ファイルを読み込み、静的HTMLに変換
- `gray-matter`でフロントマターを解析、`remark`でMarkdownをHTMLに変換
- `getStaticPaths()`で全てのパスを取得
- `fallback: false`にすることで、指定されていないパスは404を返すよう設定

## 🤔 fallback: falseとは？

`fallback: false`にすることで、あらかじめ`getStaticPaths()`で指定されたページしか生成されません。それ以外のパスにアクセスすると404になります。これは、ブログ記事のように、数が決まっていてビルド時に全部生成できる場面で非常に便利です。

---

# 🇺🇸 Implementing a Markdown Blog with Next.js — Dynamic Routing & `fallback: false`

Today, I worked on building a Markdown-based blog system using Next.js and TypeScript. I implemented dynamic routing using `[id].tsx` and learned how to use `getStaticPaths`, `getStaticProps`, and the meaning of `fallback: false`.

## ✅ What I implemented

- Created a dynamic route page at `/posts/[id].tsx`
- Loaded `.md` files from the `/posts/` directory and converted them to HTML
- Used `gray-matter` to parse frontmatter and `remark` to convert Markdown to HTML
- Used `getStaticPaths()` to list all post paths at build time
- Set `fallback: false` so that only predefined paths are allowed, and all others return 404

## 🤔 What does `fallback: false` mean?

By setting `fallback: false`, only the pages returned by `getStaticPaths()` are generated. Any other path will return a 404 page. This approach is ideal for blog projects where all content is static and known at build time.

---

## ✍️ 学びのまとめ / Summary

Next.jsの静的生成機能は、Markdownベースのブログ構築に非常に適しています。今後は、投稿の一覧、タグ機能、英語記事の執筆にもチャレンジしていきたいと思います。

Next.js's static generation makes it perfect for blog projects. I'll continue improving the blog by adding post listings, tag support, and more English content.
