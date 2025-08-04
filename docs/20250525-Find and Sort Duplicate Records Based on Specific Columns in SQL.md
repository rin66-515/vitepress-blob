---
title: "指定カラム重複のSQL"
date: "2025-05-25"
tags: ["SQL", "in", "join", "having"]
description: "特定の列が同じレコードを抽出し、並び替えるSQL"
---


 あるテーブルにおいて、特定の列（例：name, emailなど）の値が**同じレコードを抽出**し、別の列（例：作成日時など）で**並び替える**。


 In a table, we want to **find rows that share the same values on specific columns**, and then **sort them** by another field (e.g., timestamp, count).

参考１：

`SELECT *`
`FROM users`
`WHERE (email, phone) IN (`
  `SELECT email, phone`
  `FROM users`
  `GROUP BY email, phone`
  `HAVING COUNT(*) > 1`
`)`
`ORDER BY created_at DESC;`

参考２：

`SELECT u.*`
`FROM users u`
`JOIN (`
  `SELECT email, phone`
  `FROM users`
  `GROUP BY email, phone`
  `HAVING COUNT(*) > 1`
`) dup`
`ON u.email = dup.email AND u.phone = dup.phone`
`ORDER BY u.created_at DESC;`

