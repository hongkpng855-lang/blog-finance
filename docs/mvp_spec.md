# MVP 規格文檔 — Blog 財經/投資網站

## 1. MVP 範圍定義

### 1.1 MVP 目標
- 快速上線，驗證市場
- SEO 基礎建設完成
- 可發佈文章、可被搜尋引擎索引
- 預留 AdSense 整合接口

### 1.2 MVP 功能清單

| 功能 | 優先級 | 狀態 |
|------|--------|------|
| 文章列表頁（首頁） | P0 | 待開發 |
| 文章詳情頁 | P0 | 待開發 |
| 分類頁 | P0 | 待開發 |
| 標籤頁 | P1 | 待開發 |
| 站內搜尋 | P1 | 待開發 |
| 作者頁 | P2 | MVP 後 |
| RSS 訂閱 | P2 | MVP 後 |
| 相關文章推薦 | P1 | 待開發 |
| Sitemap 自動生成 | P0 | 待開發 |
| SEO Meta 設定 | P0 | 待開發 |
| AdSense 版位 | P1 | 待開發 |

---

## 2. 資料模型詳細規格

### 2.1 Post（文章）

```typescript
interface Post {
  id: string;                    // UUID
  title: string;                 // 標題（必填，最長 200 字）
  slug: string;                  // URL slug（唯一，自動生成）
  content: string;               // 內容（Markdown 或 Rich Text）
  excerpt: string;               // 摘要（最長 300 字，自動截取）
  status: PostStatus;            // 狀態
  authorId: string;              // 作者 ID
  categoryId: string;            // 主分類 ID
  tags: Tag[];                   // 標籤（多對多）
  featuredImage?: Media;         // 特色圖片
  seoTitle?: string;             // SEO 標題（預設用 title）
  seoDescription?: string;       // SEO 描述（預設用 excerpt）
  canonicalUrl?: string;         // 正規 URL
  publishedAt?: Date;            // 發布時間
  updatedAt: Date;               // 更新時間
  createdAt: Date;               // 建立時間
  
  // 統計（後期加入）
  viewCount?: number;            // 瀏覽次數
  readingTime?: number;          // 閱讀時間（分鐘）
}

type PostStatus = 'draft' | 'review' | 'published' | 'archived' | 'scheduled';
```

### 2.2 Category（分類）

```typescript
interface Category {
  id: string;
  name: string;                  // 分類名稱
  slug: string;                  // URL slug
  description?: string;          // 分類描述
  parentId?: string;             // 父分類 ID（支援多層）
  order: number;                 // 排序
  seoTitle?: string;
  seoDescription?: string;
}
```

**財經/投資預設分類：**
- 投資入門
- 股票分析
- 基金/ETF
- 加密貨幣
- 理財規劃
- 經濟趨勢
- 保險知識

### 2.3 Tag（標籤）

```typescript
interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
```

### 2.4 Author（作者）

```typescript
interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: Media;
  bio?: string;
  role: 'admin' | 'editor' | 'writer';
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}
```

### 2.5 Media（媒體）

```typescript
interface Media {
  id: string;
  url: string;                   // CDN URL
  alt: string;                   // 替代文字（必填）
  caption?: string;              // 圖片說明
  source?: string;               // 版權來源
  type: 'image' | 'video';
  width?: number;
  height?: number;
  size?: number;                 // 檔案大小（bytes）
}
```

### 2.6 Redirect（重定向）

```typescript
interface Redirect {
  id: string;
  from: string;                  // 舊 URL 路徑
  to: string;                    // 新 URL 路徑
  statusCode: 301 | 302;
  isActive: boolean;
  createdAt: Date;
}
```

---

## 3. API 規格

### 3.1 公開 API（前台）

#### 取得文章列表
```
GET /api/posts
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10, max: 50)
  - category: string (slug)
  - tag: string (slug)
  - author: string (id)
  - search: string
  - sort: 'latest' | 'popular' (default: 'latest')

Response:
{
  "data": Post[],
  "meta": {
    "page": number,
    "limit": number,
    "total": number,
    "totalPages": number
  }
}
```

#### 取得單篇文章
```
GET /api/posts/:slug
Response: Post
```

#### 取得分類列表
```
GET /api/categories
Response: Category[]
```

#### 取得標籤列表
```
GET /api/tags
Response: Tag[]
```

#### 搜尋文章
```
GET /api/search?q=:query
Query Parameters:
  - q: string (必填)
  - page: number
  - limit: number

Response:
{
  "data": Post[],
  "meta": {
    "query": string,
    "page": number,
    "total": number
  }
}
```

### 3.2 後台 API（Strapi Admin）

使用 Strapi 內建的 Content Management API，配合 RBAC 權限控制。

---

## 4. 頁面組件規格

### 4.1 共用組件

| 組件 | 用途 | Props |
|------|------|-------|
| `<Header />` | 網站導航 | - |
| `<Footer />` | 頁尾 | - |
| `<PostCard />` | 文章卡片 | post: Post |
| `<PostGrid />` | 文章列表 | posts: Post[] |
| `<Pagination />` | 分頁 | page, totalPages, baseUrl |
| `<SearchBox />` | 搜尋框 | onSearch: function |
| `<Sidebar />` | 側邊欄 | categories, popularPosts |
| `<AdSlot />` | 廣告版位 | slot: string, format: string |
| `<SEOHead />` | SEO Meta | title, description, canonical, ogImage |
| `<Breadcrumb />` | 麵包屑 | items: {label, href}[] |

### 4.2 頁面組件

| 頁面 | 路由 | 組件 | 資料來源 |
|------|------|------|----------|
| 首頁 | `/` | `<HomePage />` | GET /api/posts?limit=10 |
| 文章詳情 | `/post/:slug` | `<PostPage />` | GET /api/posts/:slug |
| 分類頁 | `/category/:slug` | `<CategoryPage />` | GET /api/posts?category=:slug |
| 標籤頁 | `/tag/:slug` | `<TagPage />` | GET /api/posts?tag=:slug |
| 搜尋頁 | `/search` | `<SearchPage />` | GET /api/search?q=:query |

---

## 5. SEO 規格

### 5.1 Meta 結構

```html
<!-- 基礎 Meta -->
<title>{seoTitle} | 財經觀點</title>
<meta name="description" content="{seoDescription}">
<link rel="canonical" href="{canonicalUrl}">

<!-- Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="{seoTitle}">
<meta property="og:description" content="{seoDescription}">
<meta property="og:image" content="{ogImage}">
<meta property="og:url" content="{canonicalUrl}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{seoTitle}">
<meta name="twitter:description" content="{seoDescription}">
<meta name="twitter:image" content="{ogImage}">
```

### 5.2 結構化資料

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{excerpt}",
  "image": "{featuredImage}",
  "author": {
    "@type": "Person",
    "name": "{authorName}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "財經觀點",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "{publishedAt}",
  "dateModified": "{updatedAt}"
}
```

### 5.3 Sitemap 格式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/post/{slug}</loc>
    <lastmod>{updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 6. 廣告整合規格

### 6.1 AdSense 設定

```typescript
interface AdSenseConfig {
  publisherId: string;           // ca-pub-XXXX
  slots: {
    header: string;              // 頂部橫幅
    inArticle: string;           // 文內原生
    sidebar: string;             // 側邊欄
    footer: string;              // 底部橫幅
  };
  autoAds: boolean;              // 自動廣告
}
```

### 6.2 版位規格

| 版位 | 位置 | 尺寸 | 載入方式 |
|------|------|------|----------|
| header | 文章頂部 | 728x90 | 同步 |
| inArticle | 文章第 3 段後 | 響應式 | Lazy |
| sidebar | 側邊欄 | 300x250 | Lazy |
| footer | 頁面底部 | 728x90 | Lazy |

---

## 7. 驗收標準

### 7.1 功能驗收

| 功能 | 驗收條件 |
|------|----------|
| 文章列表 | 正確顯示 10 篇，分頁運作 |
| 文章詳情 | 完整顯示內容、圖片、相關文章 |
| 分類頁 | 正確篩選該分類文章 |
| 搜尋 | 支援標題+內容搜尋，結果 < 500ms |
| SEO | Lighthouse SEO > 90 |
| 效能 | Lighthouse Performance > 80 |
| Mobile | 響應式設計，手機可用 |

### 7.2 技術驗收

- [ ] TypeScript 無 any
- [ ] ESLint 無 error
- [ ] 測試覆蓋率 > 70%
- [ ] Core Web Vitals 全綠
- [ ] 無 console error

---

## 8. 時程規劃

| 階段 | 任務 | 時間 |
|------|------|------|
| Week 1 | 專案搭建、資料模型 | 7 天 |
| Week 2 | 前台頁面開發 | 7 天 |
| Week 3 | CMS 整合、SEO | 7 天 |
| Week 4 | 測試、部署、AdSense | 7 天 |

---

*文檔建立日期：2026-03-18*
*負責 Agent：Agent-BE*
*版本：v1.0*
