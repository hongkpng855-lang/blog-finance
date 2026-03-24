import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import Sidebar from '@/components/Sidebar'
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()
  const mainPosts = posts.slice(0, 8)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主內容區 - 佔2/3寬度 */}
          <div className="flex-1 lg:w-2/3">
            {/* 分類導航 */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 overflow-x-auto">
              <div className="flex items-center gap-2 flex-nowrap">
                <a href="/" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium whitespace-nowrap">
                  全部文章
                </a>
                {categories.slice(0, 6).map((cat) => (
                  <a
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 文章網格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mainPosts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} index={index} />
              ))}
            </div>

            {/* 載入更多按鈕 */}
            <div className="mt-8 text-center">
              <a 
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium"
              >
                查看更多文章
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* 側邊欄 - 佔1/3寬度 */}
          <aside className="lg:w-80">
            <Sidebar categories={categories} tags={tags} posts={posts.slice(0, 5)} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
