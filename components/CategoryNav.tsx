'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
  { id: 'all', label: '全部', href: '/' },
  { id: 'invest', label: '投資', href: '/category/invest' },
  { id: 'stock', label: '股市', href: '/category/stock' },
  { id: 'finance', label: '理財', href: '/category/finance' },
  { id: 'economy', label: '經濟', href: '/category/economy' },
  { id: 'crypto', label: '加密貨幣', href: '/category/crypto' },
]

export default function CategoryNav() {
  const pathname = usePathname()

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = pathname === cat.href || 
            (cat.id !== 'all' && pathname.startsWith(cat.href))
          
          return (
            <Link
              key={cat.id}
              href={cat.href}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              {cat.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
