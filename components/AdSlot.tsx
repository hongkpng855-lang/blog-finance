interface AdSlotProps {
  type: 'banner' | 'sidebar' | 'in-article' | 'native'
  className?: string
}

export default function AdSlot({ type, className = '' }: AdSlotProps) {
  const adConfig = {
    banner: { 
      width: 'w-full', 
      height: 'h-24', 
      label: '橫幅廣告 728x90',
      description: '適合品牌曝光與產品推廣'
    },
    sidebar: { 
      width: 'w-full', 
      height: 'h-[600px]', 
      label: '側邊欄廣告 300x600',
      description: '高可視度，適合長期曝光'
    },
    'in-article': { 
      width: 'w-full', 
      height: 'h-32', 
      label: '文章內原生廣告',
      description: '融入內容，提高點擊率'
    },
    native: { 
      width: 'w-full', 
      height: 'h-48', 
      label: '原生廣告',
      description: '與內容結合，提升轉換'
    },
  }

  const config = adConfig[type]

  return (
    <div className={`ad-slot ${config.width} ${config.height} ${className} relative overflow-hidden`}>
      {/* 廣告標籤 */}
      <div className="absolute top-2 left-2 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
        廣告
      </div>
      
      {/* 廣告內容 */}
      <div className="text-center p-4">
        <div className="text-gray-400 font-medium mb-1">{config.label}</div>
        <p className="text-xs text-gray-300">{config.description}</p>
        
        {/* 模擬廣告內容 */}
        <div className="mt-4 flex justify-center gap-2">
          <div className="w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex-1 text-left">
            <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
