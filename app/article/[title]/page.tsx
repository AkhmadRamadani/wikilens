import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSummary } from '@/lib/wiki'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import ArticleCard from '@/components/ArticleCard'
import Sidebar from '@/components/Sidebar'
import MediaGallery from '@/components/MediaGallery'

interface PageProps {
  params: { title: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const title = decodeURIComponent(params.title)
    const article = await getSummary(title)
    return {
      title: `${article.titles?.display || article.title} — WikiLens`,
      description: article.extract?.substring(0, 160),
      openGraph: {
        images: article.thumbnail?.source ? [article.thumbnail.source] : [],
      },
    }
  } catch {
    return { title: 'Article — WikiLens' }
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const title = decodeURIComponent(params.title)

  let article
  try {
    article = await getSummary(title)
  } catch {
    notFound()
  }

  const canonicalTitle = article.titles?.canonical || title

  return (
    <div className="min-h-screen relative">
      <Header />

      {/* Search bar in compact mode */}
      <div className="relative z-10 px-12 py-6 border-b border-white/[0.04]">
        <SearchBar initialValue={article.titles?.normalized || title} />
      </div>

      {/* Main content grid */}
      <div className="relative z-[1] px-12 py-10 grid grid-cols-[1fr_340px] gap-10 max-w-[1300px]">
        <main>
          <ArticleCard article={article} />
        </main>

        <Sidebar
          extra={<MediaGallery title={canonicalTitle} />}
        />
      </div>
    </div>
  )
}
