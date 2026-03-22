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
    title: `${post.title} | 財經投資部落格`,
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
            財經投資部落格
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 文章 */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* 文章標題區 */}
          <header className="p-6 sm:p-8 border-b">
            {post.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>📅 {String(post.publishedAt || post.date || '2026-01-01')}</span>
              <span>⏱️ {post.readingTime || 5} 分鐘閱讀</span>
              <span>✍️ {post.author || '財經編輯'}</span>
            </div>
          </header>

          {/* 頂部廣告 */}
          <div className="px-6 sm:px-8 py-4 bg-gray-50">
            <AdSlot type="banner" className="h-24 w-full bg-gray-200 flex items-center justify-center text-gray-500" />
          </div>

          {/* 文章內容 */}
          <div className="p-6 sm:p-8">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6
                prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-5
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg prose-img:max-w-full
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
              "
              dangerouslySetInnerHTML={{ __html: (post.content || '').replace(/\n/g, '<br/>') }}
            />

            {/* 文章內廣告 */}
            <div className="my-8">
              <AdSlot type="in-article" className="h-32 w-full bg-gray-200 flex items-center justify-center text-gray-500" />
            </div>

            {/* 標籤 */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">標籤</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Link 
                      key={tag} 
                      href={`/tags/${tag}`}
                      className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* 上下篇導航 */}
        <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost && (
            <Link 
              href={`/posts/${prevPost.slug}`} 
              className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow border"
            >
              <span className="text-sm text-gray-500">← 上一篇</span>
              <p className="font-medium mt-1 text-gray-900 line-clamp-2">{prevPost.title}</p>
            </Link>
          )}
          {nextPost && (
            <Link 
              href={`/posts/${nextPost.slug}`} 
              className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow border text-left sm:text-right"
            >
              <span className="text-sm text-gray-500">下一篇 →</span>
              <p className="font-medium mt-1 text-gray-900 line-clamp-2">{nextPost.title}</p>
            </Link>
          )}
        </nav>

        {/* 底部廣告 */}
        <div className="mt-8">
          <AdSlot type="banner" className="h-24 w-full bg-gray-200 flex items-center justify-center text-gray-500" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            © 2026 財經投資部落格. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
