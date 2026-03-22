import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

export default function Home() {
  const posts = getSortedPostsData()
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600">
              財經投資部落格
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm font-medium">首頁</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm font-medium">關於</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm font-medium">聯繫</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Featured Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">最新文章</h2>
        </section>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 12).map((post: any) => (
            <article key={post.slug} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <Link href={`/posts/${post.slug}`}>
                <div className="p-4">
                  {/* Category */}
                  {post.category && (
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded mb-3">
                      {post.category}
                    </span>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date || '2026-01-01'}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime || 5} 分鐘
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Load More */}
        {posts.length > 12 && (
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              載入更多文章
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2026 財經投資部落格. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
