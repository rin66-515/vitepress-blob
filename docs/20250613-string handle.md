---
title: "just talking to myself"
date: "2025-06-13"
tags: ["文字列処理","javacript","互換性"]
description: "エラーメッセージの日付ごとにマージして、重複処理"
---





最近、複数日付の多行エラーメッセージまとめる処理について、それほど難しくないですのが、今のローコードフレームワークに搭載されたJavascriptバージョン（ES3-5なのに、let constを使って宣言できるし、forEachとかも使えるが、arrow関数とかない上に、オブジェクトの(for in)の機能が挙動妙になっている）はあんまににも、おかしいすぎるから、互換性高い書き方をメモしとこうと思いました。



```
//エラーメッセージマージ

 errorMessage = mergeAll(errorMessage, newErrorMessage);

 function mergeAll(str1, str2) {

  //文字列辞書化

  let map1 = extractLines(str1);

  let map2 = extractLines(str2);

  //オブジェクトマージ

  let merged = mergeMap(map1, map2);

  let result = "";

  let keys = Object.keys(merged);　　//ソート想定

  for (let i = 0; i < keys.length; i++) {

   let key = keys[i];

   let title = key + "行目：";

   let str = merged[key].join(lineSeparator);

   result += title + str + lineSeparator;

  }

  return result;

 }

 //文字列辞書化　オブジェクトの形で行ごとに内容を格納するメソッド

 function extractLines(str) {

  const lineMap = {};

  let parts = str ? str.replace(/\n+$/, "").split(/(?=\d+行目[：:])/) : "";//行目ごとに配列化

  

  for (let i = 0; i < parts.length; i++) {

   let match = parts[i].match(/^(\d+)行目[：:]\s*([\s\S]*)/);　//[?行目：]を外す

   if (match) {

​    test = i;

​    let lineNum = match[1];                  //行番号取得

​    let content = match[2].trim().split(lineSeparator);　　　　　　　　//各メッセージ配列化

​    testStr = content;

​    if (!lineMap[lineNum]) {

​     lineMap[lineNum] = content;

​    }

   }

  }

  return lineMap;

 }
```

`
