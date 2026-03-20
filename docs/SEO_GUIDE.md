# 網站 SEO 配置指南

## 已完成的 SEO 優化

### 1. Sitemap ✅
- 檔案：`public/sitemap.xml`
- 動態生成：`src/app/sitemap.ts`
- 包含所有文章頁面

### 2. Robots.txt ✅
- 檔案：`public/robots.txt`
- 動態生成：`src/app/robots.ts`
- 允許所有爬蟲，禁止 API 路徑

### 3. 結構化資料 ✅
- 網站結構化資料
- 組織結構化資料
- 文章結構化資料
- 麵包屑導航

### 4. Open Graph 標籤 ✅
- OG 標題、描述、圖片
- Twitter Card 支援

### 5. Meta 標籤 ✅
- 標題模板
- 關鍵字
- 作者資訊

---

## 待完成的 SEO 工作

### 需要使用者操作：
1. **Google Search Console 驗證**
   - 前往 https://search.google.com/search-console
   - 添加網站並驗證所有權
   - 提交 sitemap

2. **Google Analytics 設定**
   - 建立 GA4 資源
   - 取得追蹤 ID
   - 加入網站

3. **網域名稱設定**
   - 購買自訂網域（選填）
   - 設定 DNS

---

## SEO 檔案結構

```
blog-finance/
├── public/
│   ├── sitemap.xml      # 靜態 sitemap
│   └── robots.txt       # 靜態 robots
├── src/
│   ├── app/
│   │   ├── sitemap.ts   # 動態 sitemap
│   │   ├── robots.ts    # 動態 robots
│   │   └── layout.tsx   # Meta 標籤
│   └── lib/
│       └── seo.ts       # SEO 配置
```

---

## 使用方式

### 在文章頁面使用結構化資料

```tsx
import { generateArticleStructuredData } from '@/lib/seo'

export default function PostPage({ post }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleStructuredData(post))
        }}
      />
      {/* 文章內容 */}
    </>
  )
}
```

---

## SEO 檢查清單

- [x] Sitemap.xml
- [x] Robots.txt
- [x] Open Graph 標籤
- [x] Twitter Card
- [x] 結構化資料
- [x] Meta 描述
- [x] 關鍵字標籤
- [ ] Google Search Console 驗證
- [ ] Google Analytics 追蹤
- [ ] 圖片 ALT 標籤優化
- [ ] 頁面載入速度優化
- [ ] 行動裝置友善測試
