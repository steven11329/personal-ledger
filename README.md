# 個人記帳
這是一個能夠紀錄個人帳目的小型網頁 app，完全保障您個人隱私。
您紀錄的帳目都將記錄在您的 browser 上，Server不會知道任何帳目內容。

![帳目記錄](./git-img/record.jpg)

## 特色
1. 採用 IndexedDB API 紀錄帳目，所有的記錄都只在您的單一電腦/手機中。
不會洩漏個資。
2. app 不會傳輸任何資料到 server，您的資料不會被 server 監看。
3. 提供圖表來了解整年消費資訊。

![帳目記錄](./git-img/summary.jpg)

## 注意事項
* 請注意 chrome clear storage 若有勾選 IndexedDB 會造成紀錄被清空。
* 由於 server 沒有記錄您的資料。因此手機與電腦是無法同步資料的。(或許未來會有)
* 不支援 IE。