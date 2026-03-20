import Link from 'next/link'
import AdSlot from './AdSlot'

interface Post {
  slug: string
  title: string
  date: string
  category?: string
  tags?: string[]
  excerpt?: string
  readingTime?: number
}

interface ArticleGridProps {
  posts: Post[]
}

export default function ArticleGrid({ posts }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <>
          {/* 文章卡片 */}
          <article key={post.slug} className="article-card bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {/* 分類標籤 */}
              {post.category && (
                <span className="tag mb-3 inline-block">{post.category}</span>
              )}

              {/* 標題 */}
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </h2>
              </Link>

              {/* 摘要 */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* 底部資訊 */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.date}</span>
                <span>閱讀時間 {post.readingTime || 5} 分鐘</span>
              </div>
            </div>
          </article>

          {/* 每6篇文章插入廣告 */}
          {(index + 1) % 6 === 0 && (
            <div key={`ad-${index}`} className="col-span-full">
              <AdSlot type="banner" className="h-24" />
            </div>
          )}
        </>
      ))}
    </div>
  )
}
