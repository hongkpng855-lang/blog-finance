'use client'

import Image from 'next/image'
import { Calendar, Eye, ChevronRight } from 'lucide-react'
import type { Post } from '@/types'

interface ArticleCardProps {
  post: Post
  index?: number
}

export default function ArticleCard({ post, index }: ArticleCardProps) {
  return (
    <article className="group bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 overflow-hidden">
      <a href={`/post/${post.slug}`} className="block">
        {/* 圖片區域 */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage || '/images/default-cover.jpg'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {index === 0 && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
              精選
            </span>
          )}
        </div>
        
        {/* 內容區域 */}
        <div className="p-4">
          {/* 分類標籤 */}
          <div className="mb-2">
            {post.categories?.map((cat) => (
              <span 
                key={cat} 
                className="text-xs text-blue-600 font-medium hover:text-blue-700"
              >
                {cat}
              </span>
            ))}
          </div>
          
          {/* 標題 */}
          <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          
          {/* 摘要 */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {post.excerpt}
          </p>
          
          {/* 底部資訊 */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.createdAt).toLocaleDateString('zh-TW', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {post.views}
              </span>
            </div>
            <span className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
              閱讀更多
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}
