# 財經觀點 Blog

投資理財專業知識平台

## 技術棧

- **框架**: Next.js 15 (App Router)
- **樣式**: Tailwind CSS
- **資料庫**: Supabase (PostgreSQL)
- **CMS**: Strapi
- **部署**: Vercel

## 開發

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置
npm run build

# 生產模式
npm start
```

## 環境變數

複製 `.env.example` 為 `.env.local` 並填入實際值：

```bash
cp .env.example .env.local
```

## 專案結構

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API 路由
│   ├── category/       # 分類頁面
│   ├── post/           # 文章頁面
│   ├── search/         # 搜尋頁面
│   └── tag/            # 標籤頁面
├── components/         # React 組件
├── lib/               # 工具函式
└── types/             # TypeScript 類型定義
```

## 授權

MIT
