import Image from 'next/image'
import { TrendingUp, Tag, Folder, ChevronRight } from 'lucide-react'
import type { Post, Category, Tag as TagType } from '@/types'

interface SidebarProps {
  categories: Category[]
  tags: TagType[]
  posts: Post[]
}

export default function Sidebar({ categories, tags, posts }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* 熱門文章 */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          熱門文章
        </h3>
        <div className="space-y-3">
          {posts.slice(0, 5).map((post, index) => (
            <a 
              key={post.slug} 
              href={`/post/${post.slug}`}
              className="group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-bold rounded group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-gray-700 group-hover:text-blue-600 line-clamp-2 transition-colors">
                  {post.title}
                </h4>
                <span className="text-xs text-gray-400 mt-1">
                  {new Date(post.createdAt).toLocaleDateString('zh-TW', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 文章分類 */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Folder className="w-4 h-4 text-blue-600" />
          文章分類
        </h3>
        <div className="space-y-2">
          {categories.slice(0, 8).map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
                <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 熱門標籤 */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          熱門標籤
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map((tag) => (
            <a
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent transition-all"
            >
              {tag.name}
            </a>
          ))}
        </div>
      </div>

      {/* 訂閱區域 */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-5 text-white">
        <h3 className="text-base font-bold mb-2">訂閱財經快訊</h3>
        <p className="text-sm text-blue-100 mb-4">
          獲取最新投資策略與市場分析
        </p>
        <input
          type="email"
          placeholder="輸入您的 Email"
          className="w-full px-3 py-2 text-sm text-gray-900 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button className="w-full py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors">
          立即訂閱
        </button>
      </div>
    </div>
  )
}
