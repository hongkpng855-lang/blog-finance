import Link from 'next/link'
import AdSlot from './AdSlot'

interface Post {
  slug: string
  title: string
  date?: string
}

interface SidebarProps {
  popularPosts: Post[]
}

export default function Sidebar({ popularPosts }: SidebarProps) {
  const tags = ['ETF', '0050', '定期定額', '退休規劃', '資產配置', '複利', '配息', '停損', '美股', '0056', '高股息']

  return (
    <aside className="space-y-4">
      {/* 熱門文章 */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          <h3 className="font-bold text-gray-900">熱門文章</h3>
        </div>
        <ul className="space-y-3">
          {popularPosts.map((post, index) => (
            <li key={post.slug} className="flex gap-3 group cursor-pointer">
              <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index < 3 ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400'
              }`}>
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
                {post.date && (
                  <span className="text-xs text-gray-400 mt-1 block">{post.date}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 側邊廣告 */}
      <AdSlot type="sidebar" className="h-64" />

      {/* 訂閱區塊 */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.1%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <h3 className="font-bold">訂閱電子報</h3>
          </div>
          <p className="text-sm text-blue-100 mb-4">
            每週收到最新的財經知識與投資觀點
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="輸入您的 Email"
              className="w-full px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="w-full bg-white text-blue-600 font-medium py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
              立即訂閱
            </button>
          </div>
        </div>
      </div>

      {/* 標籤雲 */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <h3 className="font-bold text-gray-900">熱門標籤</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 關於本站 */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 002 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <h3 className="font-bold text-gray-900">關於本站</h3>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          財經觀點致力於提供最實用的投資理財知識，幫助您做出更明智的財務決策。
        </p>
      </div>
    </aside>
  )
}
