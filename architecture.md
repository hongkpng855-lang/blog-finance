# Blog 財經/投資網站 - 技術架構文檔

## 1. 專案概述

### 1.1 目標
- 建立財經/投資主題 Blog 網站
- 透過 SEO + 流量 + 廣告變現
- 目標：日均收入 ≥ US$5

### 1.2 技術選型
| 層級 | 技術 | 原因 |
|------|------|------|
| **前台框架** | Next.js 15 (App Router) | SSR/SSG 原生支援，SEO 友好 |
| **部署平台** | Vercel Hobby | 免費，自動 CI/CD，與 Next.js 整合 |
| **CMS** | Strapi v5 (SQLite) | 免費，自託管，API 完整 |
| **資料庫** | Supabase PostgreSQL | 免費 500MB，支援 FTS |
| **站內搜尋** | PostgreSQL Full Text Search | 免費，內建 |
| **圖片儲存** | Cloudflare Images / Imgur | 免費額度 |
| **分析** | GA4 + GSC | 完全免費 |
| **廣告** | Google AdSense | 主流選擇 |

---

## 2. 系統架構圖

```
┌─────────────────────────────────────────────────────────────┐
│                        用戶瀏覽器                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel (Next.js)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   首頁      │  │  文章詳情   │  │   搜尋頁    │          │
│  │   (SSG)     │  │   (SSG)     │  │   (SSR)     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  分類頁     │  │  標籤頁     │  │  作者頁     │          │
│  │   (SSG)     │  │   (SSG)     │  │   (SSG)     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ API Calls
┌─────────────────────────────────────────────────────────────┐
│                    Strapi CMS (Admin)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  文章管理   │  │  媒體庫     │  │  分類/標籤  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │  用戶/RBAC  │  │  審計 Log   │                           │
│  └─────────────┘  └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Supabase PostgreSQL                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   posts     │  │  categories │  │    tags     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   authors   │  │   media     │  │  redirects  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│  ┌─────────────┐                                             │
│  │ FTS Index   │  ← 站內搜尋                                 │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 資料模型

### 3.1 Post（文章）
```typescript
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;           // Markdown 或 Rich Text
  excerpt: string;           // 摘要
  status: 'draft' | 'review' | 'published' | 'archived';
  authorId: string;
  categoryId: string;
  tags: Tag[];
  featuredImage: Media;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  publishedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}
```

### 3.2 Category（分類）
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string;         // 支援多層分類
}
```

### 3.3 Tag（標籤）
```typescript
interface Tag {
  id: string;
  name: string;
  slug: string;
}
```

### 3.4 Author（作者）
```typescript
interface Author {
  id: string;
  name: string;
  email: string;
  avatar: Media;
  bio: string;
  role: 'admin' | 'editor' | 'writer';
}
```

### 3.5 Media（媒體）
```typescript
interface Media {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  source?: string;           // 版權來源
  type: 'image' | 'video';
}
```

### 3.6 Redirect（重定向）
```typescript
interface Redirect {
  id: string;
  from: string;              // 舊 URL
  to: string;                // 新 URL
  statusCode: 301 | 302;
  isActive: boolean;
}
```

---

## 4. 頁面路由

### 4.1 前台頁面
| 路由 | 頁面 | 渲染方式 |
|------|------|----------|
| `/` | 首頁 | SSG |
| `/post/[slug]` | 文章詳情 | SSG |
| `/category/[slug]` | 分類頁 | SSG |
| `/tag/[slug]` | 標籤頁 | SSG |
| `/author/[id]` | 作者頁 | SSG |
| `/search` | 搜尋頁 | SSR |
| `/sitemap.xml` | Sitemap | SSG |
| `/robots.txt` | Robots | SSG |
| `/rss.xml` | RSS | SSG |

### 4.2 後台頁面（Strapi Admin）
| 路由 | 功能 |
|------|------|
| `/admin` | 後台首頁 |
| `/admin/content-manager` | 內容管理 |
| `/admin/media-library` | 媒體庫 |
| `/admin/settings` | 設定 |
| `/admin/users` | 用戶管理 |

---

## 5. SEO 設計

### 5.1 技術 SEO
- ✅ SSR/SSG 確保搜尋引擎可索引
- ✅ 自動生成 sitemap.xml
- ✅ robots.txt 設定
- ✅ Canonical URL
- ✅ 結構化資料（Article, Breadcrumb, Organization）
- ✅ OG/Twitter Card

### 5.2 On-page SEO
- 標題格式：`{文章標題} | {網站名稱}`
- 描述：每篇文章自訂 seoDescription
- H1: 文章標題
- H2: 章節標題
- 內鏈策略：相關文章推薦
- 圖片 alt text 必填

---

## 6. 廣告整合

### 6.1 AdSense 版位規劃
| 位置 | 類型 | 尺寸 |
|------|------|------|
| 文章頂部 | 橫幅 | 728x90 |
| 文章內文 | 原生 | 響應式 |
| 側邊欄 | 多媒體 | 300x250 |
| 文章底部 | 橫幅 | 728x90 |

### 6.2 載入策略
- Lazy loading（不影響 Core Web Vitals）
- 避免 CLS 偏移
- 僅在已發布文章顯示廣告

---

## 7. 部署架構

### 7.1 環境
| 環境 | 用途 | 平台 |
|------|------|------|
| dev | 開發測試 | 本地 Docker |
| staging | 預發布驗證 | Vercel Preview |
| prod | 正式環境 | Vercel Production |

### 7.2 CI/CD 流程
```
GitHub Push → Vercel Auto Build → Preview Deployment
                                    ↓
                              Manual Approval
                                    ↓
                            Production Deployment
```

### 7.3 監控
- Vercel Analytics（流量）
- Sentry（錯誤追蹤）
- Uptime monitoring（UptimeRobot 免費版）

---

## 8. 成本估算

| 項目 | 方案 | 月費用 |
|------|------|--------|
| 前台部署 | Vercel Hobby | US$0 |
| CMS 託管 | 自架或 Render Free | US$0 |
| 資料庫 | Supabase Free | US$0 |
| 圖片 | Cloudflare Images Free | US$0 |
| 域名 | .com | ~US$1/月 |
| **總計** | | **~US$1/月** |

---

## 9. 下一步行動

1. [ ] 建立 Next.js 專案結構
2. [ ] 設定 Strapi CMS
3. [ ] 建立 Supabase 資料庫
4. [ ] 實作前台頁面
5. [ ] 整合 SEO 功能
6. [ ] 部署至 Vercel
7. [ ] 申請 AdSense

---

*文檔建立日期：2026-03-18*
*負責 Agent：Agent-ARCH*
