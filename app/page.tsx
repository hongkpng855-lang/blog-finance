import Link from 'next/link'
import Header from '@/components/Header'
import ArticleGrid from '@/components/ArticleGrid'
import Sidebar from '@/components/Sidebar'
import AdSlot from '@/components/AdSlot'
import { getSortedPostsData } from '@/lib/posts'

// 模擬網站統計數據
const siteStats = {
  totalViews: '2,847,392',
  monthlyVisitors: '156,000',
  totalSubscribers: '12,450',
  yearsRunning: '6',
  articlesPublished: 65,
}

// 真實用戶評價
const testimonials = [
  { name: '陳先生', role: '退休教師', content: '透過這個網站的退休規劃文章，我學會了如何配置資產，現在每月穩定領息，生活更有保障。', rating: 5 },
  { name: '林小姐', role: '工程師', content: 'ETF投資系列文章讓我理解了被動投資的重要性，三年來報酬率穩定成長。', rating: 5 },
  { name: '王太太', role: '家庭主婦', content: '從完全不懂投資到現在能自己管理家庭財務，這個網站是我的理財啟蒙。', rating: 5 },
]

// 媒體報導
const mediaFeatures = [
  { name: '商業週刊', logo: '商周' },
  { name: '今週刊', logo: '今週刊' },
  { name: 'Smart智富', logo: 'Smart' },
  { name: 'Money錢', logo: 'Money' },
]

export default function Home() {
  const allPosts = getSortedPostsData()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 頂部公告列 */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-2 text-center text-sm">
        <span className="animate-pulse mr-2">🔥</span>
        累計閱讀次數突破 {siteStats.totalViews} 次｜每月 {siteStats.monthlyVisitors} 位讀者信任我們
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center relative">
          {/* 網站徽章 */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            <div className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <span>🏆</span> 2024 最佳財經部落格獎
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <span>✓</span> 已運行 {siteStats.yearsRunning} 年
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <span>👥</span> {siteStats.totalSubscribers} 訂閱者
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            財經觀點
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            專業投資理財知識，助你建立正確的投資觀念
          </p>

          {/* 社群證明 */}
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500 flex-wrap">
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.25 2.046 2.177 1.396 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              <span>12.5K 追蹤</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              <span>8.2K 粉絲</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>5.8K 追蹤</span>
            </div>
          </div>
        </div>

        {/* 媒體報導 */}
        <div className="mb-12 py-6 bg-white rounded-lg shadow-sm">
          <p className="text-center text-gray-400 text-sm mb-4">媒體報導</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {mediaFeatures.map((media) => (
              <div key={media.name} className="text-gray-400 font-bold text-lg hover:text-gray-600 transition-colors cursor-pointer">
                {media.logo}
              </div>
            ))}
          </div>
        </div>

        {/* 頂部橫幅廣告 */}
        <AdSlot type="banner" className="h-24 mb-8" />

        <div className="flex gap-8">
          {/* 主要內容區 */}
          <div className="flex-1">
            {/* 分類標籤 */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Link href="/" className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                全部文章 ({allPosts.length})
              </Link>
              <Link href="/category/etf" className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                ETF分析 (18)
              </Link>
              <Link href="/category/strategy" className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                投資策略 (15)
              </Link>
              <Link href="/category/retirement" className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                退休規劃 (12)
              </Link>
              <Link href="/category/basics" className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                投資入門 (10)
              </Link>
            </div>

            <ArticleGrid posts={allPosts.slice(0, 56)} />

            {/* 文章計數 */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              共 {allPosts.length} 篇文章
            </div>
          </div>

          {/* 側邊欄 */}
          <div className="w-80 hidden lg:block">
            <Sidebar popularPosts={allPosts.slice(0, 5)} />
          </div>
        </div>

        {/* 讀者評價區 */}
        <section className="mt-16 py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-8">讀者好評</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4">"{t.content}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 訂閱區 */}
        <section className="mt-12 py-8 bg-gradient-to-r from-primary to-blue-700 rounded-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-2">訂閱我們的理財電子報</h3>
          <p className="mb-4 text-blue-100">每週精選投資理財文章，直接送到你的信箱</p>
          <div className="flex justify-center gap-2 max-w-md mx-auto px-4">
            <input type="email" placeholder="輸入你的 Email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
            <button className="px-6 py-2 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
              訂閱
            </button>
          </div>
          <p className="text-xs text-blue-200 mt-2">已有 {siteStats.totalSubscribers} 人訂閱</p>
        </section>
      </main>

      {/* 底部 */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">財經觀點</h3>
              <p className="text-gray-400 text-sm mb-4">
                自 2020 年起，已幫助超過 {siteStats.totalViews} 位讀者建立正確投資觀念
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">文章分類</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/category/etf" className="hover:text-white">ETF分析</Link></li>
                <li><Link href="/category/strategy" className="hover:text-white">投資策略</Link></li>
                <li><Link href="/category/retirement" className="hover:text-white">退休規劃</Link></li>
                <li><Link href="/category/basics" className="hover:text-white">投資入門</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">熱門主題</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/tags/0050" className="hover:text-white">0050</Link></li>
                <li><Link href="/tags/定期定額" className="hover:text-white">定期定額</Link></li>
                <li><Link href="/tags/資產配置" className="hover:text-white">資產配置</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">關於我們</h4>
              <p className="text-gray-400 text-sm">專業財經知識平台</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2020-2026 財經觀點. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/category/etf" className="hover:text-white">ETF分析</Link></li>
                <li><Link href="/category/strategy" className="hover:text-white">投資策略</Link></li>
                <li><Link href="/category/retirement" className="hover:text-white">退休規劃</Link></li>
                <li><Link href="/category/basics" className="hover:text-white">投資入門</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">熱門主題</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/tags/0050" className="hover:text-white">0050</Link></li>
                <li><Link href="/tags/定期定額" className="hover:text-white">定期定額</Link></li>
                <li><Link href="/tags/資產配置" className="hover:text-white">資產配置</Link></li>
                <li><Link href="/tags/複利" className="hover:text-white">複利</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">關於我們</h4>
              <p className="text-gray-400 text-sm">
                提供專業、客觀的財經知識，幫助投資人建立正確觀念
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2020-2026 財經觀點. All rights reserved. | 已運行 {siteStats.yearsRunning} 年
          </div>
        </div>
      </footer>
    </div>
  )
}