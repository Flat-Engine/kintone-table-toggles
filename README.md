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

### pc

![pc](https://user-images.githubusercontent.com/8078345/100567233-5a71db00-330b-11eb-91cc-03962267a644.gif)

### sp

![sp](https://user-images.githubusercontent.com/8078345/100567254-678eca00-330b-11eb-9a4b-c476b2d5f37f.gif)
