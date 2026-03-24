import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import CategoryNav from '@/components/CategoryNav'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            財經觀點
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            專業投資理財知識，助您掌握財富增值之道
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
        <CategoryNav />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <ArticleCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
