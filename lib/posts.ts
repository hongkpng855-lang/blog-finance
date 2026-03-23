import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      category: data.category || '',
      date: data.date || data.publishedAt || '2026-01-01',
      author: data.author || '財經編輯',
      tags: data.tags || [],
      readingTime: data.readingTime || 5,
      ...data,
      content
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => ({
    slug: fileName.replace(/\.md$/, '')
  }))
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Convert Markdown to HTML - improved version
  let contentHtml = content
  
  // Escape HTML entities first
  contentHtml = contentHtml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Headers (must be at start of line)
  contentHtml = contentHtml.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  contentHtml = contentHtml.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  contentHtml = contentHtml.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  
  // Bold and Italic
  contentHtml = contentHtml.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  contentHtml = contentHtml.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  contentHtml = contentHtml.replace(/\*(.+?)\*/g, '<em>$1</em>')
  
  // Links
  contentHtml = contentHtml.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // Unordered lists
  contentHtml = contentHtml.replace(/^- (.+)$/gm, '<li>$1</li>')
  contentHtml = contentHtml.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
  
  // Ordered lists
  contentHtml = contentHtml.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
  
  // Paragraphs - split by double newlines
  const blocks = contentHtml.split(/\n\n+/)
  contentHtml = blocks.map(block => {
    block = block.trim()
    if (!block) return ''
    
    // Skip if already wrapped in a block element
    if (/^<(h[1-6]|ul|ol|li|p)/.test(block)) {
      return block
    }
    
    // Wrap in <p> and handle single line breaks
    block = block.replace(/\n/g, '<br/>')
    return `<p>${block}</p>`
  }).join('\n')

  return {
    slug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    category: data.category || '',
    date: data.date || data.publishedAt || '2026-01-01',
    author: data.author || '財經編輯',
    tags: data.tags || [],
    readingTime: data.readingTime || 5,
    seoDescription: data.seoDescription || data.excerpt || '',
    publishedAt: data.publishedAt || data.date || '2026-01-01',
    ...data,
    content,
    contentHtml
  }
}
