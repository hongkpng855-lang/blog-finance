import Link from 'next/link'
import AdSlot from '@/components/AdSlot'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              財經部落格
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="hover:text-gray-300">首頁</Link>
              <Link href="/category/etf" className="hover:text-gray-300">ETF分析</Link>
              <Link href="/category/strategy" className="hover:text-gray-300">投資策略</Link>
              <Link href="/category/market" className="hover:text-gray-300">市場觀點</Link>
              <Link href="/about" className="hover:text-gray-300">關於</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">財經知識平台</h1>
          <p className="text-xl text-gray-300 mb-8">
            專業的投資理財知識，助您做出明智的財務決策
          </p>
          <Link href="/posts" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-medium">
            瀏覽文章
          </Link>
        </div>
      </section>

      {/* Ad Banner */}
      <section className="container mx-auto px-4 py-4">
        <AdSlot type="banner" />
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">精選文章</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800"></div>
            <div className="p-6">
              <span className="text-blue-400 text-sm">ETF分析</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                <Link href="/post/etf-2024-guide" className="hover:text-blue-400">
                  2024年ETF投資完整指南
                </Link>
              </h3>
              <p className="text-gray-400 text-sm">
                深入解析ETF投資策略，從入門到進階的完整教學...
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-green-600 to-green-800"></div>
            <div className="p-6">
              <span className="text-green-400 text-sm">投資策略</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                <Link href="/post/investment-strategy-beginners" className="hover:text-green-400">
                  新手投資策略入門
                </Link>
              </h3>
              <p className="text-gray-400 text-sm">
                為投資新手量身打造的策略指南，穩健起步...
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-purple-600 to-purple-800"></div>
            <div className="p-6">
              <span className="text-purple-400 text-sm">市場觀點</span>
              <h3 className="text-xl font-bold mt-2 mb-3">
                <Link href="/post/market-outlook-2024" className="hover:text-purple-400">
                  2024年市場展望
                </Link>
              </h3>
              <p className="text-gray-400 text-sm">
                專業分析2024年全球市場趨勢與投資機會...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In-Content Ad */}
      <section className="container mx-auto px-4 py-4">
        <AdSlot type="in-article" />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12 bg-gray-800 rounded-lg">
        <h2 className="text-3xl font-bold mb-8">文章分類</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Link href="/category/etf" className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-bold mb-2">ETF分析</h3>
            <p className="text-gray-400 text-sm">ETF投資策略與分析</p>
            <p className="text-blue-400 mt-4">50篇文章 →</p>
          </Link>

          <Link href="/category/strategy" className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-bold mb-2">投資策略</h3>
            <p className="text-gray-400 text-sm">各種投資策略解析</p>
            <p className="text-green-400 mt-4">40篇文章 →</p>
          </Link>

          <Link href="/category/market" className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-bold mb-2">市場觀點</h3>
            <p className="text-gray-400 text-sm">市場趨勢與分析</p>
            <p className="text-purple-400 mt-4">35篇文章 →</p>
          </Link>

          <Link href="/category/fundamental" className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-bold mb-2">基本面分析</h3>
            <p className="text-gray-400 text-sm">財報分析與選股</p>
            <p className="text-yellow-400 mt-4">45篇文章 →</p>
          </Link>

          <Link href="/category/technical" className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-bold mb-2">技術面分析</h3>
            <p className="text-gray-400 text-sm">技術指標與圖表分析</p>
            <p className="text-red-400 mt-4">30篇文章 →</p>
          </Link>
        </div>
      </section>

      {/* Sidebar Ad */}
      <section className="container mx-auto px-4 py-4">
        <AdSlot type="sidebar" />
      </section>

      {/* Recent Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">最新文章</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <article className="bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
            <span className="text-blue-400 text-sm">ETF分析</span>
            <h3 className="text-xl font-bold mt-2 mb-3">
              <Link href="/post/sp500-etf-analysis" className="hover:text-blue-400">
                S&P 500 ETF深度分析
              </Link>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              美股市場最具代表性的指數ETF，深入了解其投資價值...
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>2024-03-15</span>
              <span>閱讀時間：8分鐘</span>
            </div>
          </article>

          <article className="bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
            <span className="text-green-400 text-sm">投資策略</span>
            <h3 className="text-xl font-bold mt-2 mb-3">
              <Link href="/post/value-investing-guide" className="hover:text-green-400">
                價值投資入門指南
              </Link>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              學習巴菲特的價值投資哲學，建立長期投資思維...
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>2024-03-14</span>
              <span>閱讀時間：10分鐘</span>
            </div>
          </article>

          <article className="bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
            <span className="text-purple-400 text-sm">市場觀點</span>
            <h3 className="text-xl font-bold mt-2 mb-3">
              <Link href="/post/global-market-trends" className="hover:text-purple-400">
                全球市場趨勢分析
              </Link>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              2024年全球經濟展望與主要市場投資機會...
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>2024-03-13</span>
              <span>閱讀時間：12分鐘</span>
            </div>
          </article>

          <article className="bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
            <span className="text-yellow-400 text-sm">基本面分析</span>
            <h3 className="text-xl font-bold mt-2 mb-3">
              <Link href="/post/financial-statement-analysis" className="hover:text-yellow-400">
                財務報表分析入門
              </Link>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              學會解讀財務報表，做出明智的投資決策...
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>2024-03-12</span>
              <span>閱讀時間：15分鐘</span>
            </div>
          </article>
        </div>
      </section>

      {/* Footer Ad */}
      <section className="container mx-auto px-4 py-4">
        <AdSlot type="banner" />
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">訂閱電子報</h2>
          <p className="text-gray-300 mb-8">每週接收最新的財經資訊與投資建議</p>
          <div className="flex justify-center gap-4">
            <input 
              type="email" 
              placeholder="輸入您的Email" 
              className="px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium">
              訂閱
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">財經部落格</h3>
              <p className="text-gray-400 text-sm">
                專業的財經知識平台，提供投資理財的專業內容。
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">文章分類</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/category/etf" className="hover:text-white">ETF分析</Link></li>
                <li><Link href="/category/strategy" className="hover:text-white">投資策略</Link></li>
                <li><Link href="/category/market" className="hover:text-white">市場觀點</Link></li>
                <li><Link href="/category/fundamental" className="hover:text-white">基本面分析</Link></li>
                <li><Link href="/category/technical" className="hover:text-white">技術面分析</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">熱門文章</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/post/etf-2024-guide" className="hover:text-white">2024年ETF投資指南</Link></li>
                <li><Link href="/post/investment-strategy-beginners" className="hover:text-white">新手投資策略</Link></li>
                <li><Link href="/post/market-outlook-2024" className="hover:text-white">2024年市場展望</Link></li>
                <li><Link href="/post/value-investing-guide" className="hover:text-white">價值投資入門</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">關於我們</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">關於</Link></li>
                <li><Link href="/contact" className="hover:text-white">聯絡我們</Link></li>
                <li><Link href="/privacy" className="hover:text-white">隱私政策</Link></li>
                <li><Link href="/terms" className="hover:text-white">服務條款</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 財經部落格. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
