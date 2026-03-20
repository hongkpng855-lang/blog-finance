import { getPostData, getAllPostSlugs, getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import AdSlot from '@/components/AdSlot'

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostData(slug)
  return {
    title: `${post.title} | 財經觀點`,
    description: post.seoDescription || post.excerpt || '',
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostData(slug)
  const allPosts = getSortedPostsData()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">財經觀點</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 文章標題 */}
        <article className="bg-white rounded-lg shadow-md p-8">
          <header className="mb-8">
            {post.category && (
              <span className="tag mb-4 inline-block">{post.category}</span>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>發布日期：{String(post.publishedAt || post.date || '2026-01-01')}</span>
              <span>閱讀時間：{post.readingTime || 5} 分鐘</span>
              <span>作者：{post.author || 'Agent-Writer'}</span>
            </div>
          </header>

          {/* 頂部廣告 */}
          <AdSlot type="banner" className="h-24 mb-8" />

          {/* 文章內容 */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: (post.content || '').replace(/\n/g, '<br/>') }}
          />

          {/* 文章內廣告 */}
          <div className="my-8">
            <AdSlot type="in-article" className="h-32" />
          </div>

          {/* 標籤 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link key={tag} href={`/tags/${tag}`} className="tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* 上下篇導航 */}
        <nav className="mt-8 grid grid-cols-2 gap-4">
          {prevPost && (
            <Link href={`/posts/${prevPost.slug}`} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
              <span className="text-sm text-gray-500">← 上一篇</span>
              <p className="font-medium mt-1 line-clamp-1">{prevPost.title}</p>
            </Link>
          )}
          {nextPost && (
            <Link href={`/posts/${nextPost.slug}`} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow text-right">
              <span className="text-sm text-gray-500">下一篇 →</span>
              <p className="font-medium mt-1 line-clamp-1">{nextPost.title}</p>
            </Link>
          )}
        </nav>

        {/* 底部廣告 */}
        <div className="mt-8">
          <AdSlot type="banner" className="h-24" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          © 2026 財經觀點. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
