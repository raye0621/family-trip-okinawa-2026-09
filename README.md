# 沖繩家族旅行

這個專案以 `data/trip.ts` 作為唯一正式的旅行資料來源，同時供手機 PWA 與 B5 小冊版面使用。

## 資料原則

- 未確認的地址、日文名稱、導航名稱、預約時間、營業時間、電話、停車、航班、飯店與餐廳資訊不得猜測。
- 資料不完整時保留空白或標記「待確認」。
- 行程異動只修改 `data/trip.ts`，不要直接在 PWA 或小冊頁面各寫一份。

## 目前頁面

- `/`：手機 PWA
- `/booklet`：B5 直式小冊預覽與列印版面

## 家人模式與我的模式

- 一般網址預設是家人模式，不顯示 `privateNotes`。
- 規劃者在網址後加上 `?owner=1` 開啟一次，該裝置會記住「我的模式」。
- 在我的模式頂端點「切回家人模式」，或用 `?family=1` 開啟，即可清除設定。
- 這是介面層級的區分，不是安全驗證。GitHub Pages 為靜態網站，請勿把密碼、證件號碼等機密放入備忘錄。

## GitHub Pages

專案使用 Next.js 靜態輸出，`main` 分支推送到 GitHub 後會由 `.github/workflows/deploy-pages.yml` 自動建置與發布。

1. 在 GitHub 建立 repository，將本專案推送到 `main`。
2. Repository 的 **Settings → Pages → Build and deployment** 選擇 **GitHub Actions**。
3. 等待 Actions 中的 `Deploy PWA to GitHub Pages` 完成。

建置流程會自動判斷使用者網站（`帳號.github.io`）或專案網站（`帳號.github.io/repository`）的路徑。

## 待匯入素材

可將行程表、PDF、訂房資訊、航班、租車資料、地圖連結、照片與備忘錄放入專案資料夾；整理後再轉入共用旅行資料。
