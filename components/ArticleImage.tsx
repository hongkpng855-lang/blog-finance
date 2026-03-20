'use client'

interface ArticleImageProps {
  src: string
  alt: string
  category?: string
}

// 預設財經圖片（如果文章沒有圖片）
const defaultImages: Record<string, string> = {
  'ETF分析': 'https://image.pollinations.ai/prompt/stock%20market%20ETF%20chart%20professional%20infographic%20blue?width=1200&height=630&nologo=true',
  '投資策略': 'https://image.pollinations.ai/prompt/financial%20strategy%20planning%20business%20professional?width=1200&height=630&nologo=true',
  '投資觀念': 'https://image.pollinations.ai/prompt/financial%20mindset%20investment%20philosophy%20illustration?width=1200&height=630&nologo=true',
  '投資入門': 'https://image.pollinations.ai/prompt/investment%20basics%20beginners%20guide%20friendly?width=1200&height=630&nologo=true',
  '退休規劃': 'https://image.pollinations.ai/prompt/retirement%20planning%20peaceful%20financial%20security?width=1200&height=630&nologo=true',
  '投資心法': 'https://image.pollinations.ai/prompt/investment%20wisdom%20financial%20discipline%20elegant?width=1200&height=630&nologo=true',
}

export default function ArticleImage({ src, alt, category }: ArticleImageProps) {
  const imageSrc = src || defaultImages[category || '投資入門']
  
  return (
    <div className="relative w-full aspect-[1200/630] overflow-hidden rounded-lg bg-gray-100">
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = defaultImages[category || '投資入門']
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}
