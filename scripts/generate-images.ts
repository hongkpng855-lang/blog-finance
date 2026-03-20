/**
 * 圖片生成腳本
 * 使用 Pollinations.ai 免費 API 為每篇文章生成配圖
 */

import * as fs from 'fs'
import * as path from 'path'

interface Article {
  slug: string
  title: string
  category: string
}

// 財經相關圖片提示詞模板
const imagePrompts: Record<string, string[]> = {
  'ETF分析': [
    'stock market charts with ETF symbols, professional financial analysis, modern infographic style',
    'investment portfolio pie chart with ETF allocation, clean business design',
    'financial growth graph with ETF trend lines, professional blue and green colors',
  ],
  '投資策略': [
    'strategic investment planning, financial roadmap illustration, professional business style',
    'investment strategy concept, chess pieces on financial board, modern design',
    'financial planning pathway, investment journey visualization, clean infographic',
  ],
  '投資觀念': [
    'financial mindset concept, brain with money symbols, modern illustration',
    'investment philosophy, light bulb with financial growth, professional design',
    'wealth building mindset, growing money tree, clean visual style',
  ],
  '投資入門': [
    'investment basics for beginners, stepping stones to financial growth, friendly illustration',
    'first steps in investing, financial education concept, welcoming design',
    'investment 101 guide, open book with financial symbols, educational style',
  ],
  '退休規劃': [
    'retirement planning concept, peaceful sunset with financial security, warm illustration',
    'golden years financial planning, comfortable retirement lifestyle, aspirational design',
    'retirement savings journey, piggy bank growing over time, clean infographic',
  ],
  '投資心法': [
    'investment wisdom, ancient scroll with modern financial symbols, elegant design',
    'master investor mindset, mountain peak achievement, inspirational style',
    'financial discipline concept, steady growth path, minimalist design',
  ],
}

function generatePollinationsUrl(prompt: string, seed?: number): string {
  const encodedPrompt = encodeURIComponent(prompt)
  const seedParam = seed ? `&seed=${seed}` : ''
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true${seedParam}`
}

async function processArticles(): Promise<void> {
  const postsDir = path.join(process.cwd(), 'content', 'posts')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  
  console.log(`Found ${files.length} articles to process`)
  
  for (const file of files) {
    const filePath = path.join(postsDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch) continue
    
    const frontmatter = frontmatterMatch[1]
    const titleMatch = frontmatter.match(/title:\s*["']?(.+?)["']?\n/)
    const categoryMatch = frontmatter.match(/category:\s*["']?(.+?)["']?\n/)
    const slugMatch = frontmatter.match(/slug:\s*["']?(.+?)["']?\n/)
    
    if (!titleMatch || !categoryMatch || !slugMatch) continue
    
    const title = titleMatch[1].replace(/['"]/g, '')
    const category = categoryMatch[1].replace(/['"]/g, '')
    const slug = slugMatch[1].replace(/['"]/g, '')
    
    // Generate image URL based on category
    const prompts = imagePrompts[category] || imagePrompts['投資入門']
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    const seed = Math.floor(Math.random() * 1000000)
    const imageUrl = generatePollinationsUrl(randomPrompt, seed)
    
    console.log(`\nArticle: ${title}`)
    console.log(`Category: ${category}`)
    console.log(`Image URL: ${imageUrl}`)
    
    // Update frontmatter with image
    let updatedContent = content
    if (frontmatter.includes('image:')) {
      updatedContent = content.replace(
        /image:\s*.+\n/,
        `image: "${imageUrl}"\n`
      )
    } else {
      updatedContent = content.replace(
        /---\n([\s\S]*?)\n---/,
        `---\n$1\nimage: "${imageUrl}"\n---`
      )
    }
    
    fs.writeFileSync(filePath, updatedContent)
    console.log(`Updated: ${file}`)
  }
}

// Run
processArticles().catch(console.error)
