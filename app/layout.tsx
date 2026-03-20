import type { Metadata } from 'next'
import { Inter, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSansTC = Noto_Sans_TC({ 
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://finance-blog.vercel.app'),
  title: {
    default: '財經觀點 | 投資理財知識平台',
    template: '%s | 財經觀點',
  },
  description: '專業財經知識平台，提供ETF分析、投資策略、理財規劃、退休規劃等內容，助你建立正確的投資觀念。',
  keywords: ['ETF', '投資', '理財', '0050', '退休規劃', '資產配置', '定期定額', '股票'],
  authors: [{ name: '財經觀點團隊' }],
  creator: '財經觀點',
  publisher: '財經觀點',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://finance-blog.vercel.app',
    siteName: '財經觀點',
    title: '財經觀點 | 投資理財知識平台',
    description: '專業財經知識平台，提供ETF分析、投資策略、理財規劃等內容',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '財經觀點',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '財經觀點 | 投資理財知識平台',
    description: '專業財經知識平台',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className={`${inter.variable} ${notoSansTC.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} ${notoSansTC.className}`}>{children}</body>
    </html>
  )
}
