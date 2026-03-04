import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Header />

      {/* Hero */}
      <section className="relative z-[1] px-12 pt-20 pb-14 max-w-[900px]">
        <div className="animate-fade-up-delay-1 font-mono text-[11px] tracking-[3px] uppercase text-[var(--accent)] mb-5">
          ✦ The Free Encyclopedia
        </div>
        <h1 className="animate-fade-up-delay-2 font-playfair text-[clamp(42px,6vw,76px)] font-black leading-[1.0] tracking-[-2px] mb-6">
          Explore every<br />
          idea <em className="italic text-[var(--accent)]">ever</em> written.
        </h1>
        <p className="animate-fade-up-delay-3 text-[16px] text-[var(--text-muted)] leading-[1.7] max-w-[500px]">
          Search across millions of articles from Wikipedia&apos;s open knowledge base, beautifully presented.
        </p>
      </section>

      {/* Search */}
      <div className="animate-fade-up-delay-4 relative z-10 px-12 pb-14">
        <SearchBar autoFocus />
      </div>

      {/* Main grid */}
      <div className="relative z-[1] px-12 pb-20 grid grid-cols-[1fr_340px] gap-10 max-w-[1300px]">
        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-16 text-center text-[var(--text-muted)]">
          <div className="text-[64px] mb-4 opacity-20">◎</div>
          <h2 className="font-playfair text-[24px] font-bold text-[var(--text)] mb-2">Begin your search</h2>
          <p className="text-[14px] max-w-[320px] leading-[1.7]">
            Type anything into the search bar to explore Wikipedia&apos;s vast collection of knowledge.
          </p>

          {/* Featured quick links */}
          <div className="mt-10 grid grid-cols-2 gap-3 w-full max-w-[500px]">
            {[
              { icon: '🔭', title: 'Black hole', desc: 'Stellar remnants' },
              { icon: '🏛️', title: 'Ancient Rome', desc: 'Classical civilization' },
              { icon: '🧬', title: 'DNA', desc: 'Molecule of life' },
              { icon: '🎵', title: 'Jazz', desc: 'American music genre' },
            ].map(item => (
              <a
                key={item.title}
                href={`/article/${encodeURIComponent(item.title)}`}
                className="p-4 bg-[var(--surface)] border border-white/[0.07] rounded-2xl text-left no-underline transition-all hover:border-white/[0.15] hover:bg-[var(--surface2)] group"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-[13px] font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  )
}
