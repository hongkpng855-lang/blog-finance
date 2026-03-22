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

  // Convert Markdown to HTML
  let contentHtml = content
  
  // Split by double newlines to create paragraphs
  const paragraphs = contentHtml.split(/\n\n+/)
  contentHtml = paragraphs.map(p => {
    p = p.trim()
    if (!p) return ''
    
    // Headers
    if (p.startsWith('### ')) {
      return `<h3>${p.substring(4)}</h3>`
    }
    if (p.startsWith('## ')) {
      return `<h2>${p.substring(3)}</h2>`
    }
    if (p.startsWith('# ')) {
      return `<h1>${p.substring(2)}</h1>`
    }
    
    // Lists
    if (p.startsWith('- ') || p.startsWith('* ')) {
      const items = p.split(/\n/).map(item => {
        item = item.trim()
        if (item.startsWith('- ') || item.startsWith('* ')) {
          return `<li>${item.substring(2)}</li>`
        }
        return item
      }).join('')
      return `<ul>${items}</ul>`
    }
    
    // Regular paragraph - handle inline formatting
    // Bold and Italic
    p = p.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    p = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    p = p.replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Links
    p = p.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    
    // Handle single line breaks within paragraph
    p = p.replace(/\n/g, '<br/>')
    
    return `<p>${p}</p>`
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
