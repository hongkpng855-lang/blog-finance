'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import AdSlot from './AdSlot'

export default function Sidebar() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <aside className="w-64 bg-gray-900 p-4">
      <div className="mb-8">
        <h4 className="text-white font-bold mb-4">分類</h4>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><Link href="/category/etf" className="hover:text-white">ETF分析</Link></li>
          <li><Link href="/category/strategy" className="hover:text-white">投資策略</Link></li>
          <li><Link href="/category/market" className="hover:text-white">市場觀點</Link></li>
          <li><Link href="/category/fundamental" className="hover:text-white">基本面分析</Link></li>
          <li><Link href="/category/technical" className="hover:text-white">技術面分析</Link></li>
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="text-white font-bold mb-4">熱門文章</h4>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><Link href="/post/top-etf-2024" className="hover:text-white">2024年必買ETF清單</Link></li>
          <li><Link href="/post/investment-strategy-beginners" className="hover:text-white">新手投資策略指南</Link></li>
          <li><Link href="/post/market-outlook-q1-2024" className="hover:text-white">2024 Q1市場展望</Link></li>
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="text-white font-bold mb-4">標籤雲</h4>
        <div className="flex flex-wrap gap-2">
          <Link href="/tag/etf" className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700">ETF</Link>
          <Link href="/tag/stocks" className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700">股票</Link>
          <Link href="/tag/funds" className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700">基金</Link>
          <Link href="/tag/strategy" className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700">策略</Link>
          <Link href="/tag/analysis" className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700">分析</Link>
        </div>
      </div>

      <div className="sticky top-4">
        <AdSlot slot="sidebar" />
      </div>
    </aside>
  )
}
