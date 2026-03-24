import Link from 'next/link'
import { Post } from '@/types'

interface ArticleCardProps {
  post: Post
  index: number
}

export default function ArticleCard({ post, index }: ArticleCardProps) {
  const isFeatured = index === 0
  
  return (
    <Link 
      href={`/posts/${post.slug}`}
      className={`group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-300 ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`flex ${isFeatured ? 'flex-col md:flex-row' : 'flex-col'} h-full`}>
        {/* 縮圖區塊 */}
        {post.coverImage && (
          <div className={`bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center ${
            isFeatured 
              ? 'w-full md:w-48 h-48 md:h-auto shrink-0' 
              : 'w-full h-40'
          }`}>
            <span className="text-4xl opacity-50">
              {index % 3 === 0 ? '📈' : index % 3 === 1 ? '💰' : '📊'}
            </span>
          </div>
        )}
        
        {/* 內容區塊 */}
        <div className="p-5 flex flex-col flex-1">
          {/* 分類標籤 */}
          <div className="flex items-center gap-2 mb-3">
            {post.category && (
              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md">
                {post.category}
              </span>
            )}
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.date}
            </span>
          </div>
          
          {/* 標題 */}
          <h2 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2 ${
            isFeatured ? 'text-xl md:text-2xl' : 'text-base'
          }`}>
            {post.title}
          </h2>
          
          {/* 摘要 */}
          <p className="text-gray-500 text-sm line-clamp-2 mb-3 flex-1">
            {post.excerpt}
          </p>
          
          {/* 底部信息 */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {Math.floor(Math.random() * 1000) + 100} 閱讀
            </span>
            <span className="text-xs text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              閱讀全文
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
