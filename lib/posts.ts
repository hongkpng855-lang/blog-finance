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
  
  // Simple Markdown to HTML conversion
  // Headers
  contentHtml = contentHtml.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  contentHtml = contentHtml.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  contentHtml = contentHtml.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // Bold and Italic
  contentHtml = contentHtml.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
  contentHtml = contentHtml.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  contentHtml = contentHtml.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Links
  contentHtml = contentHtml.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // Lists
  contentHtml = contentHtml.replace(/^\- (.*$)/gim, '<li>$1</li>')
  contentHtml = contentHtml.replace(/^\* (.*$)/gim, '<li>$1</li>')
  contentHtml = contentHtml.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
  
  // Paragraphs
  contentHtml = contentHtml.replace(/\n\n/g, '</p><p>')
  contentHtml = '<p>' + contentHtml + '</p>'
  
  // Clean up empty paragraphs
  contentHtml = contentHtml.replace(/<p><\/p>/g, '')
  contentHtml = contentHtml.replace(/<p>(<h[1-6]>)/g, '$1')
  contentHtml = contentHtml.replace(/(<\/h[1-6]>)<\/p>/g, '$1')
  contentHtml = contentHtml.replace(/<p>(<ul>)/g, '$1')
  contentHtml = contentHtml.replace(/(<\/ul>)<\/p>/g, '$1')
  contentHtml = contentHtml.replace(/<p>(<li>)/g, '$1')
  contentHtml = contentHtml.replace(/(<\/li>)<\/p>/g, '$1')

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
