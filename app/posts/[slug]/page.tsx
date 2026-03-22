import { getPostData, getAllPostSlugs, getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostData(slug)
  return {
    title: `${post.title} | 財經投資部落格`,
    description: post.seoDescription || post.excerpt || '',
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostData(slug)
  const allPosts = getSortedPostsData()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  // Convert markdown to HTML if contentHtml is empty
  const contentHtml = post.contentHtml || post.content || ''

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">返回首頁</span>
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Category */}
        {post.category && (
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
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
            {post.readingTime || 5} 分鐘閱讀
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {post.author || '財經編輯'}
          </span>
        </div>

        {/* Content - Render HTML */}
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Link 
                  key={tag} 
                  href={`/tags/${tag}`}
                  className="inline-flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Navigation */}
      <nav className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost && (
            <Link 
              href={`/posts/${prevPost.slug}`} 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                上一篇
              </span>
              <p className="font-medium text-gray-900 mt-1 line-clamp-2">{prevPost.title}</p>
            </Link>
          )}
          {nextPost && (
            <Link 
              href={`/posts/${nextPost.slug}`} 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors text-right"
            >
              <span className="text-sm text-gray-500 flex items-center justify-end gap-1">
                下一篇
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <p className="font-medium text-gray-900 mt-1 line-clamp-2">{nextPost.title}</p>
            </Link>
          )}
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-400 text-sm">
            © 2026 財經投資部落格. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
