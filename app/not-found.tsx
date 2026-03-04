import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'

export default function NotFound() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="relative z-10 px-12 py-6 border-b border-white/[0.04]">
        <SearchBar />
      </div>
      <div className="flex flex-col items-center justify-center py-32 text-center px-12">
        <div className="text-[72px] mb-6 opacity-20">⊘</div>
        <h1 className="font-playfair text-[36px] font-bold text-[var(--text)] mb-3">
          Article not found
        </h1>
        <p className="text-[15px] text-[var(--text-muted)] max-w-[380px] leading-[1.7] mb-8">
          We couldn&apos;t find an article matching your search. Try a different spelling or explore a related topic.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[var(--accent)] text-[#0a0a0f] rounded-xl text-[14px] font-semibold no-underline transition-opacity hover:opacity-88"
        >
          ← Back to home
        </a>
      </div>
    </div>
  )
}
