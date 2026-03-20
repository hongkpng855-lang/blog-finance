import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostData {
  slug: string
  title: string
  date: string
  category?: string
  tags?: string[]
  excerpt?: string
  readingTime?: number
  content?: string
  publishedAt?: string
  author?: string
  seoDescription?: string
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '無標題',
        date: data.publishedAt || data.date || '2026-01-01',
        category: data.category || '未分類',
        tags: data.tags || [],
        excerpt: content.substring(0, 150) + '...',
        readingTime: data.readingTime || 5,
        content,
        ...data
      }
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

export function getAllPostSlugs(): { slug: string }[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => ({
      slug: fileName.replace(/\.md$/, '')
    }))
}

export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '無標題',
    date: data.publishedAt || data.date || '2026-01-01',
    category: data.category || '未分類',
    tags: data.tags || [],
    excerpt: content.substring(0, 150) + '...',
    readingTime: data.readingTime || 5,
    content,
    publishedAt: data.publishedAt,
    author: data.author,
    seoDescription: data.seoDescription,
    ...data
  }
}
