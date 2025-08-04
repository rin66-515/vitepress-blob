---
title: "PostgreSQL JDBC バインドで発生する「2バイト整数の範囲超え」エラーとは？"
date: "2025-04-30"
tags: ["JDBC", "バインド", "PostgreSQL", "範囲超え"]
description: "Fixing “Tried to send an out-of-range integer as a 2-byte value” in PostgreSQL JDBC"
---

# 🚨 PostgreSQL JDBC バインドで発生する「2バイト整数の範囲超え」エラーとは？  

## 🚨 Fixing “Tried to send an out-of-range integer as a 2-byte value” in PostgreSQL JDBC

---

## 📝 はじめに / Introduction

**日本語：**  
先日、PostgreSQL で大量の ID を使って `IN` クエリを実行したところ、JDBC 経由で次のような例外が発生しました：

```
java.io.IOException: Tried to send an out-of-range integer as a 2-byte value: 66112
```

一見 PostgreSQL の問題に見えますが、実際には **JDBC ドライバの制約**に起因するものでした。この記事ではその原因と対処法を紹介します。

**English:**  
Recently, while running a large `IN` query using PostgreSQL, I encountered the following exception through JDBC:

```
java.io.IOException: Tried to send an out-of-range integer as a 2-byte value: 66112
```

At first glance, it appeared to be a PostgreSQL issue, but it turned out to be a **limitation in the JDBC driver**. In this article, I’ll explain the cause and how to solve it.

---

## 🧩 エラーの概要 / Error Overview

**日本語：**  
Java の JDBC を使って PostgreSQL に大量のデータを送信する際、次のようなエラーが発生することがあります：

```
java.io.IOException: Tried to send an out-of-range integer as a 2-byte value: 66112
```

**English:**  
When using Java JDBC with PostgreSQL to insert or batch large volumes of data, the following error may occur:

```
java.io.IOException: Tried to send an out-of-range integer as a 2-byte value: 66112
```

---

## 🎯 原因 / Root Cause

**PostgreSQL のフロントエンド通信プロトコルでは、**  
- 一部のデータ（バインド変数の数、カラム数、バッチ数など）を **2 バイト整数（最大 32,767 または 65,535）** として扱います。

**JDBC ドライバもこの制限に従うため、**  
- バインド数や `addBatch()` の回数が制限を超えると、この例外が発生します。

In PostgreSQL's wire protocol, certain fields like the number of parameters or batch statements are represented using **2-byte integers (max 32,767 or 65,535)**.  
When you exceed that using JDBC, this error is triggered.

---

## 🧨 発生しやすいケース / Common Scenarios

| ケース | 詳細 |
|--------|------|
| 大量のバッチ挿入 | 例：66,112 件を一括で `addBatch()` |
| 長大な IN クエリ | 例：`WHERE id IN (?, ?, ..., ?)` に 66,000 件のID |
| 1件あたりのカラム数が多い | 100列以上 × 数千件 ＝ 数万バインド |

---

## 🛠 解決策 / Solutions

### ✅ 1. バッチサイズを減らす / Reduce Batch Size

```java
final int BATCH_SIZE = 1000;
int count = 0;

for (Item item : items) {
    ps.setInt(1, item.getId());
    ps.setString(2, item.getName());
    ps.addBatch();

    if (++count % BATCH_SIZE == 0) {
        ps.executeBatch(); // Execute every 1000 items
    }
}
ps.executeBatch(); // Final batch
```

- JDBC のバッチは安全のため、**1バッチあたり最大1万～2万件以内**に制限するのがベストです。

---

### ✅ 2. IN 句の分割 / Split Large IN Clauses

```java
List<Integer> ids = ... // 60000+
for (List<Integer> sublist : split(ids, 1000)) {
    String placeholders = sublist.stream().map(id -> "?").collect(Collectors.joining(","));
    String sql = "SELECT * FROM users WHERE id IN (" + placeholders + ")";
    PreparedStatement ps = conn.prepareStatement(sql);
    for (int i = 0; i < sublist.size(); i++) {
        ps.setInt(i + 1, sublist.get(i));
    }
    ps.executeQuery();
}
```

---

### ✅ 3. 配列型や JSON 型の活用 / Use PostgreSQL Arrays or JSON

```sql
-- PostgreSQL 側のクエリ
SELECT * FROM users WHERE id = ANY(?)
```

```java
ps.setArray(1, conn.createArrayOf("INTEGER", new Integer[]{1,2,3,4,5}));
```

これにより、1つのバインド変数で複数の値を送れる。

---

## ✅ まとめ / Summary

| 項目 | 限界 | 対応策 |
|------|------|--------|
| `addBatch()` の回数 | ~32,767 | バッチ分割 |
| プレースホルダの総数 | ~65,535 | IN句の分割、JSON活用 |
| バインドできる整数 | short（2バイト）まで | 分割処理で回避 |

---

## 💬 技術英語フレーズ / Technical English Phrases

- "We encountered a JDBC limit when batching over 65,000 parameters."
- "PostgreSQL protocol uses 2-byte integers for some metadata fields."
- "Avoid sending large `IN` clauses in a single query; split them instead."
