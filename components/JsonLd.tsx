export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '財經觀點',
    url: 'https://finance-blog.vercel.app',
    description: '專業財經知識平台，提供ETF分析、投資策略、理財規劃等內容',
    publisher: {
      '@type': 'Organization',
      name: '財經觀點',
      logo: {
        '@type': 'ImageObject',
        url: 'https://finance-blog.vercel.app/logo.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://finance-blog.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
