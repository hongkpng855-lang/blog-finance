'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">財經觀點</span>
          </Link>

          {/* 桌面導航 */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              首頁
            </Link>
            <Link href="/category/etf" className="text-gray-700 hover:text-primary transition-colors">
              ETF分析
            </Link>
            <Link href="/category/strategy" className="text-gray-700 hover:text-primary transition-colors">
              投資策略
            </Link>
            <Link href="/category/retirement" className="text-gray-700 hover:text-primary transition-colors">
              退休規劃
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
              關於我們
            </Link>
          </nav>

          {/* 搜尋框 */}
          <div className="hidden md:flex items-center gap-4">
            <input
              type="search"
              placeholder="搜尋文章..."
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary w-48"
            />
          </div>

          {/* 手機選單按鈕 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* 手機選單 */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-primary">首頁</Link>
              <Link href="/category/etf" className="text-gray-700 hover:text-primary">ETF分析</Link>
              <Link href="/category/strategy" className="text-gray-700 hover:text-primary">投資策略</Link>
              <Link href="/category/retirement" className="text-gray-700 hover:text-primary">退休規劃</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary">關於我們</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
