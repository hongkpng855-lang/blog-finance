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
  return (
    <aside className="space-y-8">
      {/* 熱門文章 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">熱門文章</h3>
        <ul className="space-y-4">
          {popularPosts.map((post, index) => (
            <li key={post.slug} className="flex gap-3">
              <span className="text-2xl font-bold text-gray-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <Link href={`/posts/${post.slug}`} className="text-sm font-medium hover:text-primary line-clamp-2">
                  {post.title}
                </Link>
                {post.date && (
                  <span className="text-xs text-gray-500">{post.date}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 側邊欄廣告 */}
      <AdSlot type="sidebar" className="h-[600px]" />

      {/* 訂閱區塊 */}
      <div className="bg-primary text-white rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2">訂閱電子報</h3>
        <p className="text-sm opacity-90 mb-4">
          每週收到最新的財經知識與投資觀點
        </p>
        <input
          type="email"
          placeholder="輸入您的 Email"
          className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
        />
        <button className="w-full bg-white text-primary font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
          立即訂閱
        </button>
      </div>

      {/* 標籤雲 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">熱門標籤</h3>
        <div className="flex flex-wrap gap-2">
          {['ETF', '0050', '定期定額', '退休規劃', '資產配置', '複利', '配息', '停損'].map(tag => (
            <Link key={tag} href={`/tags/${tag}`} className="tag hover:bg-blue-100 transition-colors">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
