# subtable view toggle

for [kintone \- サイボウズの業務改善プラットフォーム](https://kintone.cybozu.co.jp/)


jQuery利用のため、利用するアプリでは CDN経由で jQueryの読み込みが必須。

下記をグローバル,もしくはアプリ個別に追加。

PC用のJavaScriptファイル

スマートフォン用のJavaScriptファイル

のどちらにも記入する必要がある。

また、優先的に読み込ませるため、jQueryの方が上になるように並び替える。

```
https://js.cybozu.com/jquery/3.5.1/jquery.min.js
```


有効にしたアプリはサブテーブルがすべて閉じた状態になる。

スマートフォン版では、デフォルトのスタイルではサブテーブルのタイトルがわかりにくくなるため、underlineを付与。
