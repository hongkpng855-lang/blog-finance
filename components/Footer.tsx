import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">財經觀點</span>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-500">投資理財知識平台</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-900 transition-colors">關於我們</Link>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">隱私政策</Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">聯絡我們</Link>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-50 text-center text-xs text-gray-400">
          © 2026 財經觀點. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
