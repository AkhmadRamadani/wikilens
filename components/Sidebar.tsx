'use client'

import { useRouter } from 'next/navigation'

const POPULAR_TOPICS = [
  'Quantum mechanics', 'Renaissance', 'Black hole', 'DNA',
  'Ancient Rome', 'Jazz', 'Oceans', 'Philosophy',
  'Photosynthesis', 'The Internet',
]

const TRENDING = [
  { num: '01', title: 'Artificial intelligence' },
  { num: '02', title: 'Climate change' },
  { num: '03', title: 'Human evolution' },
  { num: '04', title: 'Milky Way' },
  { num: '05', title: 'Democracy' },
  { num: '06', title: 'Leonardo da Vinci' },
  { num: '07', title: 'The Roman Empire' },
  { num: '08', title: 'Genetics' },
]

interface SidebarProps {
  extra?: React.ReactNode
}

export default function Sidebar({ extra }: SidebarProps) {
  const router = useRouter()

  const goTo = (title: string) => {
    router.push(`/article/${encodeURIComponent(title)}`)
  }

  return (
    <aside className="flex flex-col gap-6">
      {/* Popular topics */}
      <div>
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-dim)] mb-3 pl-0.5">
          Popular Topics
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => goTo(topic)}
              className="px-3.5 py-2 bg-[var(--surface)] border border-white/[0.07] rounded-full text-[12px] text-[var(--text-muted)] cursor-pointer transition-all whitespace-nowrap hover:border-[rgba(232,201,122,0.4)] hover:text-[var(--accent)] hover:bg-[rgba(232,201,122,0.05)]"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/[0.07]" />

      {/* Trending */}
      <div>
        <div className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--text-dim)] mb-2 pl-0.5">
          Discover
        </div>
        <div className="flex flex-col gap-0.5">
          {TRENDING.map(item => (
            <button
              key={item.title}
              onClick={() => goTo(item.title)}
              className="flex items-center gap-3.5 px-3.5 py-3 rounded-[10px] cursor-pointer transition-colors bg-transparent border-none text-left hover:bg-[var(--surface)] group"
            >
              <span className="font-mono text-[11px] text-[var(--text-dim)] w-[18px] flex-shrink-0">
                {item.num}
              </span>
              <span className="text-[13px] text-[var(--text-muted)] transition-colors group-hover:text-[var(--text)]">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/[0.07]" />

      {/* Extra content (e.g. media gallery) */}
      {extra}

      {/* Wikipedia attribution */}
      <div className="mt-auto pt-4">
        <p className="text-[11px] text-[var(--text-dim)] leading-relaxed">
          Content from{' '}
          <a
            href="https://en.wikipedia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Wikipedia
          </a>
          {' '}under{' '}
          <a
            href="https://creativecommons.org/licenses/by-sa/3.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            CC BY-SA 3.0
          </a>
          . Powered by the{' '}
          <a
            href="https://www.mediawiki.org/wiki/Wikimedia_REST_API"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Wikimedia REST API
          </a>
          .
        </p>
      </div>
    </aside>
  )
}
