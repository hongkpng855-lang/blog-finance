import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  image?: string
}

export default function PostCard({
  slug,
  title,
  excerpt,
  date,
  category,
  tags,
  image
}: PostCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <Link href={`/posts/${slug}`}>
        <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
              <svg className="w-12 h-12 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 text-blue-700 text-xs font-medium rounded-md backdrop-blur">
              {category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>{date}</span>
          <span>·</span>
          <span>{tags.length > 0 && tags.slice(0, 2).join('，')}</span>
        </div>

        <Link href={`/posts/${slug}`}>
          <h2 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {excerpt}
        </p>

        <div className="flex items-center justify-between">
          <Link
            href={`/posts/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            閱讀全文
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">{Math.floor(Math.random() * 500 + 100)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
