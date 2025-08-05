import{_ as n,c as a,o as p,ae as l}from"./chunks/framework.DtB2lZXX.js";const u=JSON.parse('{"title":"just talking to myself","description":"エラーメッセージの日付ごとにマージして、重複処理","frontmatter":{"title":"just talking to myself","date":"2025-06-13","tags":["文字列処理","javacript","互換性"],"description":"エラーメッセージの日付ごとにマージして、重複処理"},"headers":[],"relativePath":"20250613-string handle.md","filePath":"20250613-string handle.md"}'),e={name:"20250613-string handle.md"};function i(t,s,c,r,o,m){return p(),a("div",null,s[0]||(s[0]=[l(`<p>最近、複数日付の多行エラーメッセージまとめる処理について、それほど難しくないですのが、今のローコードフレームワークに搭載されたJavascriptバージョン（ES3-5なのに、let constを使って宣言できるし、forEachとかも使えるが、arrow関数とかない上に、オブジェクトの(for in)の機能が挙動妙になっている）はあんまににも、おかしいすぎるから、互換性高い書き方をメモしとこうと思いました。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//エラーメッセージマージ</span></span>
<span class="line"><span></span></span>
<span class="line"><span> errorMessage = mergeAll(errorMessage, newErrorMessage);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> function mergeAll(str1, str2) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //文字列辞書化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let map1 = extractLines(str1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let map2 = extractLines(str2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //オブジェクトマージ</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let merged = mergeMap(map1, map2);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let result = &quot;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let keys = Object.keys(merged);　　//ソート想定</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (let i = 0; i &lt; keys.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   let key = keys[i];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   let title = key + &quot;行目：&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   let str = merged[key].join(lineSeparator);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   result += title + str + lineSeparator;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return result;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> //文字列辞書化　オブジェクトの形で行ごとに内容を格納するメソッド</span></span>
<span class="line"><span></span></span>
<span class="line"><span> function extractLines(str) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const lineMap = {};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let parts = str ? str.replace(/\\n+$/, &quot;&quot;).split(/(?=\\d+行目[：:])/) : &quot;&quot;;//行目ごとに配列化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for (let i = 0; i &lt; parts.length; i++) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   let match = parts[i].match(/^(\\d+)行目[：:]\\s*([\\s\\S]*)/);　//[?行目：]を外す</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (match) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​    test = i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​    let lineNum = match[1];                  //行番号取得</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​    let content = match[2].trim().split(lineSeparator);　　　　　　　　//各メッセージ配列化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​    testStr = content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​    if (!lineMap[lineNum]) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​     lineMap[lineNum] = content;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>​    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return lineMap;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span></code></pre></div><p>\`</p>`,3)]))}const g=n(e,[["render",i]]);export{u as __pageData,g as default};
