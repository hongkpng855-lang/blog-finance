import Link from 'next/link'

const categories = [
  { name: '全部文章', slug: '', active: true },
  { name: 'ETF 投資', slug: 'etf', active: false },
  { name: '股票分析', slug: 'stock', active: false },
  { name: '理財規劃', slug: 'finance', active: false },
  { name: '退休規劃', slug: 'retirement', active: false },
  { name: '投資策略', slug: 'strategy', active: false },
]

export default function CategoryNav() {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-2 pb-2">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.slug ? `/category/${cat.slug}` : '/'}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              cat.active 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
